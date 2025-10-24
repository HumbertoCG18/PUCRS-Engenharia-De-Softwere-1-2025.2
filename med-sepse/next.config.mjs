/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

// ajuste o nome do seu repo aqui (ou via env REPO_NAME)
const REPO_NAME = process.env.REPO_NAME || "PUCRS-Engenharia-De-Softwere-1-2025.2";

// este repo NÃO é do tipo user/organization site (é projeto em subpasta)
const repoIsUserSite = false;

const nextConfig = {
  output: "export",
  // só basePath. NÃO defina assetPrefix aqui.
  basePath: isProd && !repoIsUserSite ? `/${REPO_NAME}` : "",
  images: { unoptimized: true },
  trailingSlash: true, // ajuda no Pages com export estático
};

export default nextConfig;
