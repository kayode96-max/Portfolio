import { GitHubRepo, GitHubUser, Project, Skill, PortfolioData } from '@/types';

const GITHUB_API_BASE = 'https://api.github.com';

// Default GitHub username - customize this for your portfolio
export const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'kayode96-max';

interface LanguageStats {
  [language: string]: number;
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser | null> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('Failed to fetch user:', response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    return null;
  }
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch repos:', response.statusText);
      return [];
    }

    const repos: GitHubRepo[] = await response.json();
    // Filter out forks and archived repos
    return repos.filter(repo => !repo.fork && !repo.archived);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

export async function fetchGitHubReadme(username: string): Promise<string | null> {
  try {
    // Try to fetch the special profile README
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${username}/${username}/readme`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3.raw',
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch readme:', response.statusText);
      return null;
    }

    return await response.text();
  } catch (error) {
    console.error('Error fetching GitHub README:', error);
    return null;
  }
}

// Generate Open Graph image URL for a repository (used as thumbnail)
export function getRepoThumbnail(username: string, repoName: string): string {
  return `https://opengraph.githubassets.com/1/${username}/${repoName}`;
}

export function extractSkillsFromRepos(repos: GitHubRepo[]): Skill[] {
  const languageCount: LanguageStats = {};
  const topicsSet = new Set<string>();

  repos.forEach(repo => {
    // Count languages
    if (repo.language) {
      languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
    }

    // Collect topics
    repo.topics?.forEach(topic => topicsSet.add(topic));
  });

  const skills: Skill[] = [];

  // Add programming languages as skills
  Object.entries(languageCount)
    .sort((a, b) => b[1] - a[1])
    .forEach(([language, count]) => {
      skills.push({
        name: language,
        category: 'Programming Languages',
        level: Math.min(100, count * 20), // Scale based on usage
      });
    });

  // Add topics as skills (frameworks, tools, etc.)
  const commonFrameworks = ['react', 'nextjs', 'vue', 'angular', 'django', 'flask', 'express', 'nodejs', 'tailwindcss', 'bootstrap'];
  const commonTools = ['docker', 'kubernetes', 'aws', 'azure', 'gcp', 'git', 'ci-cd', 'github-actions'];
  const commonDatabases = ['mongodb', 'postgresql', 'mysql', 'redis', 'firebase', 'supabase'];

  topicsSet.forEach(topic => {
    const lowerTopic = topic.toLowerCase();
    let category = 'Other';

    if (commonFrameworks.some(f => lowerTopic.includes(f))) {
      category = 'Frameworks & Libraries';
    } else if (commonTools.some(t => lowerTopic.includes(t))) {
      category = 'Tools & DevOps';
    } else if (commonDatabases.some(d => lowerTopic.includes(d))) {
      category = 'Databases';
    }

    skills.push({
      name: formatSkillName(topic),
      category,
      level: 70,
    });
  });

  return skills;
}

function formatSkillName(name: string): string {
  // Convert kebab-case or snake_case to Title Case
  return name
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function transformReposToProjects(repos: GitHubRepo[], username: string): Project[] {
  return repos
    .filter(repo => repo.description || repo.topics?.length > 0)
    .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
    .slice(0, 12) // Limit to 12 featured projects
    .map(repo => ({
      id: repo.id,
      name: formatProjectName(repo.name),
      description: repo.description || `A ${repo.language || 'code'} project`,
      url: repo.html_url,
      homepage: repo.homepage || undefined,
      language: repo.language || 'Unknown',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      topics: repo.topics || [],
      updatedAt: repo.updated_at,
      thumbnail: getRepoThumbnail(username, repo.name),
    }));
}

function formatProjectName(name: string): string {
  // Convert kebab-case or snake_case to Title Case
  return name
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function fetchPortfolioData(username: string = GITHUB_USERNAME): Promise<PortfolioData> {
  const [user, repos, readme] = await Promise.all([
    fetchGitHubUser(username),
    fetchGitHubRepos(username),
    fetchGitHubReadme(username),
  ]);

  const skills = extractSkillsFromRepos(repos);
  const projects = transformReposToProjects(repos, username);

  return {
    user,
    projects,
    skills,
    readme,
  };
}
