'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Project } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Github, ExternalLink, Star, GitFork } from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
}

const languageColors: Record<string, string> = {
  JavaScript: 'bg-yellow-400',
  TypeScript: 'bg-blue-500',
  Python: 'bg-green-500',
  Java: 'bg-orange-500',
  'C#': 'bg-purple-500',
  'C++': 'bg-pink-500',
  Go: 'bg-cyan-500',
  Rust: 'bg-orange-600',
  Ruby: 'bg-red-500',
  PHP: 'bg-indigo-500',
  Swift: 'bg-orange-400',
  Kotlin: 'bg-purple-400',
  HTML: 'bg-red-400',
  CSS: 'bg-blue-400',
  Vue: 'bg-emerald-500',
  Dart: 'bg-blue-300',
  Shell: 'bg-green-600',
};

export function Projects({ projects }: ProjectsProps) {
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const languages = useMemo(() => {
    const langs = new Set(projects.map(p => p.language));
    return ['all', ...Array.from(langs).filter(Boolean)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesLanguage = filter === 'all' || project.language === filter;
      const matchesSearch = searchQuery === '' ||
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesLanguage && matchesSearch;
    });
  }, [projects, filter, searchQuery]);

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my work, automatically synced from my GitHub repositories.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-muted bg-secondary text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Language Filter */}
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setFilter(lang)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === lang
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {lang === 'all' ? 'All' : lang}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const formattedDate = new Date(project.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className="group bg-secondary rounded-xl overflow-hidden border border-muted hover:border-primary transition-all duration-300"
    >
      {/* Project Thumbnail */}
      {project.thumbnail && (
        <div className="relative h-48 overflow-hidden bg-muted">
          <Image
            src={project.thumbnail}
            alt={`${project.name} thumbnail`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary text-primary-foreground rounded-full hover:scale-110 transition-transform"
                aria-label="Live Demo"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white text-black rounded-full hover:scale-110 transition-transform"
              aria-label="View on GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Project Name */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {project.name}
          </h3>
          {!project.thumbnail && (
            <div className="flex items-center gap-2">
              {project.homepage && (
                <a
                  href={project.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Live Demo"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Topics/Tags */}
        {project.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="px-2 py-1 text-xs bg-muted text-primary rounded-md"
              >
                {topic}
              </span>
            ))}
            {project.topics.length > 4 && (
              <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md">
                +{project.topics.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-muted">
          {/* Language */}
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${languageColors[project.language] || 'bg-gray-400'}`}></span>
            <span className="text-sm text-muted-foreground">{project.language}</span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              {project.stars}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="w-4 h-4" />
              {project.forks}
            </span>
            <span className="text-xs">{formattedDate}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
