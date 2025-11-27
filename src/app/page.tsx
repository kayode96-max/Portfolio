import { PortfolioClient } from '@/components';
import { fetchPortfolioData, GITHUB_USERNAME } from '@/lib/github';

// Use dynamic rendering to avoid build-time GitHub API calls
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const portfolioData = await fetchPortfolioData(GITHUB_USERNAME);
  
  return <PortfolioClient data={portfolioData} />;
}
