// med-sepse/src/app/compendio/[filename]/page.js
import fs from "fs/promises";
import path from "path";

// Procura o diretório onde estão os arquivos do compêndio
async function findCompendioDir() {
  const candidates = [
    path.join(process.cwd(), "src", "content", "compendio"),
    path.join(process.cwd(), "content", "compendio"),
    path.join(process.cwd(), "compendio"),
    path.join(process.cwd(), "public", "compendio")
  ];
  for (const c of candidates) {
    try {
      const st = await fs.stat(c);
      if (st.isDirectory()) return c;
    } catch {}
  }
  return null;
}

export async function generateStaticParams() {
  const dir = await findCompendioDir();
  if (!dir) {
    console.warn("[compendio] diretório não encontrado; gerando 0 rotas");
    return [];
  }
  const files = await fs.readdir(dir);
  return files
    .filter(f => !f.startsWith("."))
    .map(f => ({ filename: f.replace(/\.(md|mdx|txt|html|json)$/, "") }));
}

// (Opcional: evita fallback dinâmico)
export const dynamicParams = false;

export default async function Page({ params }) {
  const { filename } = params || {};
  const dir = await findCompendioDir();
  if (!dir) {
    return (
      <main style={{ padding: 16 }}>
        <h1>Compêndio não encontrado</h1>
        <p>Crie <code>src/content/compendio</code> (ou <code>content/compendio</code>, <code>compendio</code>, <code>public/compendio</code>) e adicione seus arquivos.</p>
      </main>
    );
  }

  // Tenta várias extensões em ordem
  const tryExts = [".md", ".mdx", ".txt", ".html", ".json"];
  let content = null;
  for (const ext of tryExts) {
    try {
      content = await fs.readFile(path.join(dir, `${filename}${ext}`), "utf8");
      break;
    } catch {}
  }

  if (content === null) {
    return (
      <main style={{ padding: 16 }}>
        <h1>Arquivo não encontrado</h1>
        <p>{filename}</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 16 }}>
      <h1>{filename}</h1>
      <pre style={{ whiteSpace: "pre-wrap" }}>{content}</pre>
    </main>
  );
}
