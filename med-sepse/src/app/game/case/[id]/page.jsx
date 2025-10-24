// med-sepse/src/app/game/case/[id]/page.js
import fs from "fs/promises";
import path from "path";
import CaseClient from "../CaseClient"; // componente cliente (um nível acima)

// ---------- Descoberta da fonte de dados ----------
async function findCasesSource() {
  // 1) JSON único com array de casos
  const jsonCandidates = [
    path.join(process.cwd(), "src", "data", "cases.json"),
    path.join(process.cwd(), "data", "cases.json"),
  ];
  for (const f of jsonCandidates) {
    try {
      const st = await fs.stat(f);
      if (st.isFile()) return { type: "json", path: f };
    } catch {}
  }

  // 2) Diretórios com arquivos por caso (id.json/md/txt)
  const dirCandidates = [
    path.join(process.cwd(), "src", "data", "games", "cases"),
    path.join(process.cwd(), "data", "games", "cases"),
    path.join(process.cwd(), "src", "data", "cases"),
    path.join(process.cwd(), "data", "cases"),
  ];
  for (const d of dirCandidates) {
    try {
      const st = await fs.stat(d);
      if (st.isDirectory()) return { type: "dir", path: d };
    } catch {}
  }
  return null;
}

// ---------- Pré-geração de rotas dinâmicas ----------
export async function generateStaticParams() {
  const src = await findCasesSource();
  if (!src) {
    console.warn("[case] fonte não encontrada; gerando 0 rotas");
    return [];
  }

  if (src.type === "json") {
    try {
      const txt = await fs.readFile(src.path, "utf8");
      const arr = JSON.parse(txt);
      if (!Array.isArray(arr)) return [];
      return arr
        .map((c) => c?.id ?? c?.slug ?? c?.name)
        .filter(Boolean)
        .map((id) => ({ id: String(id) }));
    } catch (e) {
      console.warn("[case] erro lendo JSON:", e.message);
      return [];
    }
  }

  // src.type === "dir"
  try {
    const files = await fs.readdir(src.path);
    return files
      .filter((f) => !f.startsWith("."))
      .map((f) => f.replace(/\.(json|md|txt)$/i, ""))
      .map((id) => ({ id: String(id) }));
  } catch {
    return [];
  }
}

// evita fallback dinâmico (recomendado para export estático)
export const dynamicParams = false;

// ---------- Carregar dados do caso específico ----------
async function loadCaseData(id) {
  const src = await findCasesSource();
  if (!src) return null;

  if (src.type === "json") {
    try {
      const txt = await fs.readFile(src.path, "utf8");
      const arr = JSON.parse(txt);
      if (!Array.isArray(arr)) return null;
      const item = arr.find(
        (c) => String(c?.id ?? c?.slug ?? c?.name) === String(id)
      );
      return item ?? null;
    } catch {
      return null;
    }
  }

  // src.type === "dir"
  const tryExts = [".json", ".md", ".txt"];
  for (const ext of tryExts) {
    const p = path.join(src.path, `${id}${ext}`);
    try {
      const st = await fs.stat(p);
      if (st.isFile()) {
        const content = await fs.readFile(p, "utf8");
        if (ext === ".json") {
          try {
            return JSON.parse(content);
          } catch {
            return { id, content };
          }
        }
        return { id, content };
      }
    } catch {}
  }
  return null;
}

// ---------- Página (Server Component) ----------
export default async function Page({ params }) {
  const id = params?.id;
  const data = await loadCaseData(id);

  if (!data) {
    return (
      <main style={{ padding: 16 }}>
        <h1>Case não encontrado</h1>
        <p>ID: {String(id)}</p>
      </main>
    );
  }

  // Renderiza componente cliente para UI interativa
  return (
    <main style={{ padding: 16 }}>
      <h1>Case: {String(id)}</h1>
      <CaseClient caseData={data} />
    </main>
  );
}
