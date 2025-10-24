// med-sepse/next.config.mjs
const isProd = process.env.NODE_ENV === 'production';

// Preencha via ambiente (Actions/PowerShell). Valores padrão seguros:
const USERNAME = process.env.GITHUB_USER ?? process.env.GITHUB_ACTOR ?? 'HumbertoCG18';
const REPO_NAME = process.env.REPO_NAME ?? 'PUCRS-Engenharia-De-Softwere-1-2025.2';

// Se o repositório fosse user site (username.github.io), basePath não é necessário.
const repoIsUserSite = REPO_NAME.toLowerCase() === `${USERNAME.toLowerCase()}.github.io`;

const basePath = isProd && !repoIsUserSite ? `/${REPO_NAME}` : '';
const assetPrefix = isProd && !repoIsUserSite ? `/${REPO_NAME}/` : '';

console.log('next.config.mjs -> isProd      :', isProd);
console.log('next.config.mjs -> USERNAME    :', USERNAME);
console.log('next.config.mjs -> REPO_NAME   :', REPO_NAME);
console.log('next.config.mjs -> basePath    :', basePath);
console.log('next.config.mjs -> assetPrefix :', assetPrefix);

export default {
  reactStrictMode: true,
  output: 'export',        // Gera somente estático (out/)
  basePath,                // Necessário para GitHub Pages (repo site)
  assetPrefix,             // Garante que CSS/JS usem caminhos corretos
  trailingSlash: true,     // Evita 404 de diretório em Pages (recomendado)
  images: { unoptimized: true } // Evita uso do next/image optimize
};
