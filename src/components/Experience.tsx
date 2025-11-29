'use client';

import { Experience } from '@/types';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

interface ExperienceProps {
  experience: Experience[];
}

export function ExperienceSection({ experience }: ExperienceProps) {
  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Work Experience
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-muted"></div>

          <div className="space-y-12">
            {experience.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center md:items-start`}
              >
                
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary z-10 flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 md:text-right">
                  <div className={`bg-secondary p-6 rounded-xl border border-muted hover:border-primary transition-colors duration-300 ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                    <div className="flex flex-col gap-1 mb-4">
                      <h3 className="text-xl font-bold text-foreground flex items-center gap-2 md:justify-end">
                        {exp.role}
                      </h3>
                      <h4 className="text-lg font-semibold text-primary flex items-center gap-2 md:justify-end">
                        <Briefcase className="w-4 h-4" />
                        {exp.company}
                      </h4>
                      <span className="text-sm text-muted-foreground font-mono flex items-center gap-2 md:justify-end">
                        <Calendar className="w-3 h-3" />
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                      {exp.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-1 text-xs bg-muted text-foreground rounded-md border border-transparent hover:border-primary transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Spacer for the other side */}
                <div className="hidden md:block w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
