'use client';

import { GitHubUser } from '@/types';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Briefcase, Code } from 'lucide-react';

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
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
              {(aboutContent || user?.bio || `Welcome to my portfolio! I'm a passionate developer who loves creating innovative solutions and contributing to the open-source community.`).split('\n').map((paragraph, index) => (
                paragraph.trim() && <p key={index}>{paragraph}</p>
              ))}
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              I believe in writing clean, maintainable code and continuously learning new technologies to stay at the forefront of software development.
            </p>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {user?.location && (
                <div className="bg-secondary rounded-lg p-4 border border-muted hover:border-primary transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium text-foreground">{user.location}</p>
                    </div>
                  </div>
                </div>
              )}

              {memberSince && (
                <div className="bg-secondary rounded-lg p-4 border border-muted hover:border-primary transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Member Since</p>
                      <p className="font-medium text-foreground">{memberSince}</p>
                    </div>
                  </div>
                </div>
              )}

              {user?.company && (
                <div className="bg-secondary rounded-lg p-4 border border-muted hover:border-primary transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Company</p>
                      <p className="font-medium text-foreground">{user.company}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-secondary rounded-lg p-4 border border-muted hover:border-primary transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Code className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Public Repos</p>
                    <p className="font-medium text-foreground">{user?.public_repos || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Decorative Element / Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-linear-to-br from-muted to-secondary p-1 border border-muted">
              <div className="w-full h-full rounded-xl bg-background p-8 flex items-center justify-center relative overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-size-[2rem_2rem] opacity-20"></div>
                
                <div className="space-y-4 w-full relative z-10">
                  {/* Code-like decoration */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-muted-foreground ml-2">developer.ts</span>
                  </div>

                  <div className="font-mono text-sm space-y-2">
                    <p className="text-purple-400">
                      <span className="text-blue-400">const</span> developer = {'{'}
                    </p>
                    <p className="pl-4">
                      <span className="text-primary">name</span>:{' '}
                      <span className="text-orange-400">&quot;{user?.name || user?.login || 'Developer'}&quot;</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-primary">passion</span>:{' '}
                      <span className="text-orange-400">&quot;Building cool stuff&quot;</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-primary">coffee</span>:{' '}
                      <span className="text-blue-400">true</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-primary">openToWork</span>:{' '}
                      <span className="text-blue-400">true</span>,
                    </p>
                    <p className="text-purple-400">{'};'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-secondary border border-muted rounded-lg shadow-lg px-4 py-2"
            >
              <span className="text-2xl">🚀</span>
            </motion.div>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 bg-secondary border border-muted rounded-lg shadow-lg px-4 py-2"
            >
              <span className="text-2xl">💻</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
