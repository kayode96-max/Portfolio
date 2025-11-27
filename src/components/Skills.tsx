'use client';

import { useState, useMemo } from 'react';
import { Skill } from '@/types';

interface SkillsProps {
  skills: Skill[];
}

const categoryColors: Record<string, string> = {
  'Programming Languages': 'from-blue-500 to-cyan-500',
  'Frameworks & Libraries': 'from-purple-500 to-pink-500',
  'Tools & DevOps': 'from-orange-500 to-amber-500',
  'Databases': 'from-green-500 to-emerald-500',
  'Other': 'from-gray-500 to-slate-500',
};

const categoryIcons: Record<string, string> = {
  'Programming Languages': '💻',
  'Frameworks & Libraries': '🛠️',
  'Tools & DevOps': '⚙️',
  'Databases': '🗄️',
  'Other': '📦',
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

  if (skills.length === 0) {
    return (
      <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Skills & Technologies
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          <p className="text-center text-gray-600 dark:text-gray-300">
            Skills will be automatically populated from GitHub repositories.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Technologies
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Technologies and tools I work with, automatically synced from my GitHub repositories.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              {category === 'all' ? 'All Skills' : category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        {selectedCategory === 'all' ? (
          <div className="space-y-12">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{categoryIcons[category] || '📦'}</span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {category}
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {categorySkills.map((skill, index) => (
                    <SkillCard
                      key={`${skill.name}-${index}`}
                      skill={skill}
                      gradient={categoryColors[category] || categoryColors['Other']}
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
                gradient={categoryColors[skill.category] || categoryColors['Other']}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function SkillCard({ skill, gradient }: { skill: Skill; gradient: string }) {
  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      {/* Skill Level Indicator */}
      {skill.level && (
        <div className="absolute top-2 right-2">
          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              {skill.level}%
            </span>
          </div>
        </div>
      )}

      <div className="text-center">
        {/* Skill Icon/Badge */}
        <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-lg`}>
          {skill.name.charAt(0).toUpperCase()}
        </div>

        {/* Skill Name */}
        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
          {skill.name}
        </h4>

        {/* Level Bar */}
        {skill.level && (
          <div className="mt-2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${gradient} transition-all duration-500`}
              style={{ width: `${skill.level}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
