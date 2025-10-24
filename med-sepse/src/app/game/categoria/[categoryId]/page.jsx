// med-sepse/src/app/game/categoria/[categoryId]/page.js
import fs from "fs/promises";
import path from "path";

// Encontra fonte de categorias: um JSON ou um diretório
async function findCategoriesSource() {
  const fileCandidates = [
    path.join(process.cwd(), "src", "data", "categories.json"),
    path.join(process.cwd(), "data", "categories.json")
  ];
  for (const f of fileCandidates) {
    try {
      const st = await fs.stat(f);
      if (st.isFile()) return { type: "file", path: f };
    } catch {}
  }
  const dirCandidates = [
    path.join(process.cwd(), "src", "data", "games", "categories"),
    path.join(process.cwd(), "data", "games", "categories")
  ];
  for (const d of dirCandidates) {
    try {
      const st = await fs.stat(d);
      if (st.isDirectory()) return { type: "dir", path: d };
    } catch {}
  }
  return null;
}

export async function generateStaticParams() {
  const src = await findCategoriesSource();
  if (!src) {
    console.warn("[categoria] fonte não encontrada; gerando 0 rotas");
    return [];
  }
  if (src.type === "file") {
    try {
      const txt = await fs.readFile(src.path, "utf8");
      const arr = JSON.parse(txt);
      if (!Array.isArray(arr)) return [];
      return arr.map((c) => ({ categoryId: String(c.id ?? c.slug ?? c.name) }));
    } catch (e) {
      console.warn("[categoria] erro lendo JSON:", e.message);
      return [];
    }
  } else {
    try {
      const files = await fs.readdir(src.path);
      return files
        .filter((f) => !f.startsWith("."))
        .map((f) => ({ categoryId: f.replace(/\.(json|md|txt)$/, "") }));
    } catch {
      return [];
    }
  }
}

// (Opcional: evita fallback dinâmico)
export const dynamicParams = false;

export default function Page({ params }) {
  const id = params?.categoryId;
  return (
    <main style={{ padding: 16 }}>
      <h1>Categoria: {id}</h1>
      <p>Substitua este componente pela sua UI de categoria.</p>
    </main>
  );
}
