'use client';

import { GitHubUser } from '@/types';

interface AboutProps {
  user: GitHubUser | null;
  readme: string | null;
}

export function About({ user, readme }: AboutProps) {
  // Extract about section from README if available
  const extractAboutFromReadme = (readme: string): string | null => {
    // Try to find an "About" or similar section in the README
    const aboutPatterns = [
      /## About Me\n([\s\S]*?)(?=##|$)/i,
      /## About\n([\s\S]*?)(?=##|$)/i,
      /### About Me\n([\s\S]*?)(?=###|##|$)/i,
      /### About\n([\s\S]*?)(?=###|##|$)/i,
    ];

    for (const pattern of aboutPatterns) {
      const match = readme.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    // If no About section found, try to get the first paragraph
    const lines = readme.split('\n').filter(line => !line.startsWith('#') && line.trim());
    if (lines.length > 0) {
      return lines.slice(0, 3).join(' ').trim();
    }

    return null;
  };

  const aboutContent = readme ? extractAboutFromReadme(readme) : null;

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <div className="space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {aboutContent || user?.bio || `Welcome to my portfolio! I'm a passionate developer who loves creating innovative solutions and contributing to the open-source community.`}
            </p>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I believe in writing clean, maintainable code and continuously learning new technologies to stay at the forefront of software development.
            </p>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {user?.location && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                      <p className="font-medium text-gray-900 dark:text-white">{user.location}</p>
                    </div>
                  </div>
                </div>
              )}

              {memberSince && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                      <p className="font-medium text-gray-900 dark:text-white">{memberSince}</p>
                    </div>
                  </div>
                </div>
              )}

              {user?.company && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Company</p>
                      <p className="font-medium text-gray-900 dark:text-white">{user.company}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Public Repos</p>
                    <p className="font-medium text-gray-900 dark:text-white">{user?.public_repos || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Element / Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-xl bg-white dark:bg-gray-900 p-8 flex items-center justify-center">
                <div className="space-y-4 w-full">
                  {/* Code-like decoration */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">developer.ts</span>
                  </div>

                  <div className="font-mono text-sm space-y-2">
                    <p className="text-purple-600 dark:text-purple-400">
                      <span className="text-blue-600 dark:text-blue-400">const</span> developer = {'{'}
                    </p>
                    <p className="pl-4">
                      <span className="text-green-600 dark:text-green-400">name</span>:{' '}
                      <span className="text-orange-600 dark:text-orange-400">&quot;{user?.name || user?.login || 'Developer'}&quot;</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-green-600 dark:text-green-400">passion</span>:{' '}
                      <span className="text-orange-600 dark:text-orange-400">&quot;Building cool stuff&quot;</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-green-600 dark:text-green-400">coffee</span>:{' '}
                      <span className="text-blue-600 dark:text-blue-400">true</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-green-600 dark:text-green-400">openToWork</span>:{' '}
                      <span className="text-blue-600 dark:text-blue-400">true</span>,
                    </p>
                    <p className="text-purple-600 dark:text-purple-400">{'};'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg px-4 py-2">
              <span className="text-2xl">🚀</span>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg px-4 py-2">
              <span className="text-2xl">💻</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
