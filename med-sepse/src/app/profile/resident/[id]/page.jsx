import usersData from '@/data/users.json';
import ResidentDashboardClient from './ResidentDashboardClient';

// Esta função roda no servidor durante o build para gerar as páginas estáticas
export async function generateStaticParams() {
  return usersData.map((user) => ({
    id: user.id,
  }));
}

// Este é o Server Component que recebe os parâmetros e chama o Cliente
export default async function ResidentPage({ params }) {
  // No Next.js 15, params é uma Promise que precisa ser aguardada
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return <ResidentDashboardClient id={id} />;
}