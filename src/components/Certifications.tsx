'use client';

import { Certification } from '@/types';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar } from 'lucide-react';

interface CertificationsProps {
  certifications: Certification[];
}

export function Certifications({ certifications }: CertificationsProps) {
  if (!certifications || certifications.length === 0) return null;

  return (
    <section id="certifications" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Certifications
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-secondary rounded-xl p-6 border border-muted hover:border-primary transition-all duration-300 flex flex-col items-center text-center group"
            >
              {/* Certification Icon/Image Placeholder */}
              <div className="w-16 h-16 mb-4 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Award className="w-8 h-8 text-primary" />
              </div>

              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {cert.name}
              </h3>
              
              <p className="text-muted-foreground font-medium mb-1">
                {cert.issuer}
              </p>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Calendar className="w-4 h-4" />
                <span>Issued: {cert.date}</span>
              </div>

              {cert.url && (
                <a 
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto px-4 py-2 bg-muted text-foreground text-sm font-medium rounded-lg hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-2"
                >
                  View Certificate
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
