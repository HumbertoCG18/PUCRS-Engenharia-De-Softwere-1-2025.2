#!/usr/bin/env node
/**
 * scripts/add-static-params.js
 *
 * Uso:
 *   node scripts/add-static-params.js [path-to-subproject]
 *
 * Exemplos:
 *   node scripts/add-static-params.js med-sepse
 *   node scripts/add-static-params.js .
 *
 * O script procura por rotas dinâmicas no App Router (app/...) e Pages Router (pages/...)
 * dentro do caminho fornecido (padrão: tenta localizar med-sepse, senão usa '.'), e:
 *  - para App Router: injeta `generateStaticParams()` em page.* se ausente, ou cria page.js com stub
 *  - para Pages Router: injeta `getStaticPaths()` + `getStaticProps()` em [param].js ou index.* se ausente, ou cria index.js com stub
 *
 * Antes de alterar qualquer arquivo, cria um backup: <arquivo>.bak.staticparams (somente se não existir).
 *
 * Observação: os stubs retornam arrays vazios caso não encontrem dados locais — isso evita que `next export` quebre.
 * Substitua os stubs por lógicas reais que leiam suas fontes de dados depois.
 */

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const ARGV = process.argv.slice(2);
const input = ARGV[0] || '.';

function log(...args) { console.log('[add-static-params]', ...args); }
function warn(...args) { console.warn('[add-static-params]', ...args); }

function isDynamicName(name) {
  return /\[.+\]/.test(name);
}

function extractParamName(segment) {
  const m = segment.match(/\[(.+?)\]/);
  return m ? m[1] : 'id';
}

async function ensureDir(dir) {
  try {
    await fsPromises.mkdir(dir, { recursive: true });
  } catch (e) {}
}

async function safeBackup(filePath) {
  if (!fs.existsSync(filePath)) return;
  const bak = filePath + '.bak.staticparams';
  if (!fs.existsSync(bak)) {
    await fsPromises.copyFile(filePath, bak);
    log('Backup criado:', path.relative(process.cwd(), bak));
  }
}

async function writeFileWithBackup(filePath, content) {
  await ensureDir(path.dirname(filePath));
  if (fs.existsSync(filePath)) {
    await safeBackup(filePath);
  }
  await fsPromises.writeFile(filePath, content, 'utf8');
  log('Escreveu:', path.relative(process.cwd(), filePath));
}

async function readIfExists(filePath) {
  try {
    return await fsPromises.readFile(filePath, 'utf8');
  } catch (e) {
    return null;
  }
}

function appRouterGenerateStaticParamsStub(paramName, routeHint) {
  return `\nexport async function generateStaticParams() {
  /**
   * Stub automático gerado.
   * Tenta coletar possíveis parâmetros de fontes locais comuns:
   *  - data/, content/, compendio/, public/, posts/, games/, src/data
   * Substitua por sua lógica real (ler JSON, CMS, etc).
   */
  const fs = await import('fs/promises');
  const path = await import('path');
  const possibleSources = ['data','content','compendio','public','posts','games','src/data'];
  const params = new Set();
  for (const src of possibleSources) {
    try {
      const dir = path.join(process.cwd(), src);
      const files = await fs.readdir(dir);
      for (const f of files) {
        if (f.startsWith('.')) continue;
        const name = f.replace(/\\.(md|mdx|json|js|jsx|ts|tsx|txt|html|csv)$/, '');
        params.add(name);
      }
    } catch (e) {
      // ignora se não existir
    }
  }
  const out = Array.from(params).map(v => ({ ${paramName}: v }));
  if (out.length === 0) {
    console.warn('generateStaticParams stub: nenhum parâmetro encontrado automaticamente para rota "${routeHint}". Retornando [] (substitua por lógica real).');
  }
  return out;
}\n`;
}

function pagesRouterStubs(paramName, routeHint) {
  return `\nexport async function getStaticPaths() {
  /**
   * Stub automático gerado.
   * Tenta coletar parâmetros de fontes locais (data/content/compendio/public/posts/games/src/data).
   * Substitua por lógica real.
   */
  const fs = await import('fs/promises');
  const path = await import('path');
  const possibleSources = ['data','content','compendio','public','posts','games','src/data'];
  const params = new Set();
  for (const src of possibleSources) {
    try {
      const dir = path.join(process.cwd(), src);
      const files = await fs.readdir(dir);
      for (const f of files) {
        if (f.startsWith('.')) continue;
        const name = f.replace(/\\.(md|mdx|json|js|jsx|ts|tsx|txt|html|csv)$/, '');
        params.add(name);
      }
    } catch (e) {}
  }
  const outParams = Array.from(params).map(v => ({ ${paramName}: v }));
  const paths = outParams.map(p => ({ params: p }));
  if (paths.length === 0) {
    console.warn('getStaticPaths stub: nenhum parâmetro encontrado automaticamente para rota "${routeHint}". Retornando paths vazios.');
  }
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Stub genérico: apenas passa params como props. Substitua com leitura do arquivo/DB.
  return { props: { params } };
}\n`;
}

function createPageComponentStubApp(paramName) {
  return `import React from 'react';

export default function Page({ params }) {
  return (
    <main style={{ padding: 16 }}>
      <h1>Rota dinâmica (app): {params && params.${paramName}}</h1>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(params, null, 2)}</pre>
    </main>
  );
}\n`;
}

function createIndexComponentStubPages(paramName) {
  return `import React from 'react';

export default function Page({ params }) {
  return (
    <main style={{ padding: 16 }}>
      <h1>Rota dinâmica (pages): {params && params.${paramName}}</h1>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(params, null, 2)}</pre>
    </main>
  );
}\n`;
}

async function walkDir(dir, cb) {
  let entries;
  try {
    entries = await fsPromises.readdir(dir, { withFileTypes: true });
  } catch (e) {
    return;
  }
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    await cb(full, ent);
    if (ent.isDirectory()) {
      await walkDir(full, cb);
    }
  }
}

async function processAppRouter(root) {
  const appDir = path.join(root, 'app');
  if (!fs.existsSync(appDir)) {
    log('app/ não encontrado em', path.relative(process.cwd(), root));
    return;
  }
  log('Escaneando app/ ...');
  await walkDir(appDir, async (full, ent) => {
    if (!ent.isDirectory()) return;
    if (!isDynamicName(ent.name)) return;
    const paramName = extractParamName(ent.name);
    // procurar page.* dentro dessa pasta
    const candidates = ['page.js','page.jsx','page.tsx','page.ts','page.mjs','page.cjs'];
    let found = false;
    for (const cand of candidates) {
      const target = path.join(full, cand);
      if (fs.existsSync(target)) {
        found = true;
        const content = await readIfExists(target) ?? '';
        if (/generateStaticParams\s*\(/.test(content)) {
          log('Já contém generateStaticParams em', path.relative(process.cwd(), target));
        } else {
          const stub = appRouterGenerateStaticParamsStub(paramName, full);
          const newContent = content + '\n' + stub;
          await writeFileWithBackup(target, newContent);
          log('Inserido generateStaticParams em', path.relative(process.cwd(), target));
        }
        break;
      }
    }
    if (!found) {
      // cria page.js com componente simples + stub
      const target = path.join(full, 'page.js');
      if (!fs.existsSync(target)) {
        const comp = createPageComponentStubApp(paramName) + '\n' + appRouterGenerateStaticParamsStub(paramName, full);
        await writeFileWithBackup(target, comp);
        log('Criado', path.relative(process.cwd(), target), 'com generateStaticParams (app router).');
      }
    }
  });
}

async function processPagesRouter(root) {
  const pagesDir = path.join(root, 'pages');
  if (!fs.existsSync(pagesDir)) {
    log('pages/ não encontrado em', path.relative(process.cwd(), root));
    return;
  }
  log('Escaneando pages/ ...');
  await walkDir(pagesDir, async (full, ent) => {
    // 1) arquivo com nome dinâmico [param].js, [param].tsx, etc
    if (ent.isFile() && isDynamicName(ent.name)) {
      const paramName = extractParamName(ent.name);
      const content = await readIfExists(full) ?? '';
      if (/getStaticPaths\s*\(/.test(content) && /getStaticProps\s*\(/.test(content)) {
        log('Já contém getStaticPaths/getStaticProps em', path.relative(process.cwd(), full));
      } else {
        const stub = pagesRouterStubs(paramName, full);
        const newContent = content + '\n' + stub;
        await writeFileWithBackup(full, newContent);
        log('Inserido getStaticPaths/getStaticProps em', path.relative(process.cwd(), full));
      }
      return;
    }
    // 2) diretório dinâmico [param] com index.js/index.tsx
    if (ent.isDirectory() && isDynamicName(ent.name)) {
      const paramName = extractParamName(ent.name);
      const indexCandidates = ['index.js','index.jsx','index.tsx','index.ts'];
      let idxFound = false;
      for (const idx of indexCandidates) {
        const p = path.join(full, idx);
        if (fs.existsSync(p)) {
          idxFound = true;
          const content = await readIfExists(p) ?? '';
          if (/getStaticPaths\s*\(/.test(content) && /getStaticProps\s*\(/.test(content)) {
            log('Já contém getStaticPaths/getStaticProps em', path.relative(process.cwd(), p));
          } else {
            const stub = pagesRouterStubs(paramName, full);
            const newContent = content + '\n' + stub;
            await writeFileWithBackup(p, newContent);
            log('Inserido getStaticPaths/getStaticProps em', path.relative(process.cwd(), p));
          }
          break;
        }
      }
      if (!idxFound) {
        // criar index.js com componente e stub
        const pNew = path.join(full, 'index.js');
        if (!fs.existsSync(pNew)) {
          const comp = createIndexComponentStubPages(paramName) + '\n' + pagesRouterStubs(paramName, full);
          await writeFileWithBackup(pNew, comp);
          log('Criado', path.relative(process.cwd(), pNew), 'com getStaticPaths/getStaticProps (pages router).');
        }
      }
    }
  });
}

async function main() {
  try {
    const absoluteInput = path.resolve(input);
    // se existir um subdir med-sepse dentro do input, prioriza ele
    let root = absoluteInput;
    const candidate = path.join(absoluteInput, 'med-sepse');
    if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
      root = candidate;
      log('Usando subprojeto detectado:', path.relative(process.cwd(), root));
    } else {
      // se o input itself parece ser o subprojeto, use-o
      if (path.basename(root).toLowerCase() === 'med-sepse') {
        log('Usando caminho fornecido (med-sepse):', path.relative(process.cwd(), root));
      } else {
        log('Usando caminho fornecido:', path.relative(process.cwd(), root));
      }
    }

    await processAppRouter(root);
    await processPagesRouter(root);

    log('Processamento finalizado. Revise os arquivos criados/atualizados e substitua os stubs por lógica real quando necessário.');
  } catch (err) {
    console.error('Erro fatal:', err);
    process.exit(1);
  }
}

main();
