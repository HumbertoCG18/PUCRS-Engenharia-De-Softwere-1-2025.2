// med-sepse/src/app/compendio/[filename]/page.jsx
import fs from "fs/promises";
import path from "path";

// Localiza a pasta onde ficam os arquivos do compêndio
async function findCompendioDir() {
  const candidates = [
    path.join(process.cwd(), "src", "content", "compendio"),
    path.join(process.cwd(), "content", "compendio"),
    path.join(process.cwd(), "compendio"),
    path.join(process.cwd(), "public", "compendio"),
  ];
  for (const c of candidates) {
    try {
      const st = await fs.stat(c);
      if (st.isDirectory()) return c;
    } catch {}
  }
  return null;
}

// OBRIGATÓRIO para export estático em rota dinâmica
export async function generateStaticParams() {
  const dir = await findCompendioDir();
  if (!dir) {
    // fallback para não quebrar o build: gera pelo menos 1 rota
    console.warn("[/compendio/[filename]] diretório não encontrado; usando fallback 'exemplo'");
    return [{ filename: "exemplo" }];
  }
  const files = await fs.readdir(dir);
  const params = files
    .filter((f) => !f.startsWith("."))
    .map((f) => ({ filename: f.replace(/\.(md|mdx|txt|html|json)$/i, "") }));
  // se a pasta estiver vazia, gera rota de fallback
  return params.length > 0 ? params : [{ filename: "exemplo" }];
}

// Evita fallback dinâmico (recomendado no export estático)
export const dynamicParams = false;

// Página (Server Component) — NÃO colocar "use client" aqui
export default async function Page({ params }) {
  const dir = await findCompendioDir();

  // tenta abrir o arquivo do compêndio; se não existir, mostra mensagem
  const tryExts = [".md", ".mdx", ".txt", ".html", ".json"];
  let content = null;

  if (dir) {
    for (const ext of tryExts) {
      try {
        content = await fs.readFile(path.join(dir, `${params.filename}${ext}`), "utf8");
        break;
      } catch {}
    }
  }

  if (content == null) {
    return (
      <main style={{ padding: 16 }}>
        <h1>{params.filename}</h1>
        <p>Conteúdo não encontrado. Crie um arquivo em:</p>
        <pre>src/content/compendio/{params.filename}.md</pre>
      </main>
    );
  }

  return (
    <main style={{ padding: 16 }}>
      <h1>{params.filename}</h1>
      <pre style={{ whiteSpace: "pre-wrap" }}>{content}</pre>
    </main>
  );
}
