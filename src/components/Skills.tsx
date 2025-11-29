'use client';

import { useState, useMemo } from 'react';
import { Skill } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Database, Layout, Server, Settings, Box } from 'lucide-react';

interface SkillsProps {
  skills: Skill[];
}

const categoryIcons: Record<string, any> = {
  'Programming Languages': Code,
  'Frameworks & Libraries': Layout,
  'Tools & DevOps': Settings,
  'Databases': Database,
  'Other': Box,
};

export function Skills({ skills }: SkillsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const cats = new Set(skills.map(skill => skill.category));
    return ['all', ...Array.from(cats)];
  }, [skills]);

  const filteredSkills = useMemo(() => {
    if (selectedCategory === 'all') return skills;
    return skills.filter(skill => skill.category === selectedCategory);
  }, [skills, selectedCategory]);

  const groupedSkills = useMemo(() => {
    const groups: Record<string, Skill[]> = {};
    filteredSkills.forEach(skill => {
      if (!groups[skill.category]) {
        groups[skill.category] = [];
      }
      groups[skill.category].push(skill);
    });
    return groups;
  }, [filteredSkills]);

  if (skills.length === 0) return null;

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Skills & Technologies
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with, automatically synced from my GitHub repositories.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {category === 'all' ? 'All Skills' : category}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {selectedCategory === 'all' ? (
              <div className="space-y-12">
                {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                  <div key={category}>
                    <div className="flex items-center gap-3 mb-6">
                      {(() => {
                        const Icon = categoryIcons[category] || Box;
                        return <Icon className="w-6 h-6 text-primary" />;
                      })()}
                      <h3 className="text-xl font-semibold text-foreground">
                        {category}
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {categorySkills.map((skill, index) => (
                        <SkillCard
                          key={`${skill.name}-${index}`}
                          skill={skill}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredSkills.map((skill, index) => (
                  <SkillCard
                    key={`${skill.name}-${index}`}
                    skill={skill}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group relative bg-secondary rounded-xl p-4 border border-muted hover:border-primary transition-all duration-300"
    >
      {/* Skill Level Indicator */}
      {skill.level && (
        <div className="absolute top-2 right-2">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <span className="text-xs font-medium text-muted-foreground">
              {skill.level}%
            </span>
          </div>
        </div>
      )}

      <div className="text-center pt-2">
        {/* Skill Icon/Badge */}
        <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-muted flex items-center justify-center text-foreground font-bold text-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
          {skill.name.charAt(0).toUpperCase()}
        </div>

        {/* Skill Name */}
        <h4 className="font-medium text-foreground text-sm mb-2">
          {skill.name}
        </h4>

        {/* Level Bar */}
        {skill.level && (
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${skill.level}%` }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
