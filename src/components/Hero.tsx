'use client';

import Image from 'next/image';
import { GitHubUser } from '@/types';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Twitter, Globe, Mail } from 'lucide-react';

interface HeroProps {
  user: GitHubUser | null;
}

export function Hero({ user }: HeroProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Avatar - Profile Picture */}
          {user?.avatar_url && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex justify-center"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <Image
                  src={user.avatar_url}
                  alt={user.name || user.login}
                  width={180}
                  height={180}
                  className="relative rounded-full border-2 border-muted hover:border-primary transition-colors duration-300"
                  priority
                />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-primary rounded-full border-4 border-background flex items-center justify-center">
                  <span className="sr-only">Online</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Name */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            <span className="text-foreground">Hi, I&apos;m </span>
            <span className="text-primary">
              {user?.name || user?.login || 'Developer'}
            </span>
          </motion.h1>

          {/* Bio / Role */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl sm:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {user?.bio || 'Full Stack Developer | Open Source Enthusiast | Building Amazing Web Experiences'}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="group px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all flex items-center gap-2"
            >
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-full border border-muted hover:border-primary transition-colors"
            >
              Get In Touch
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-center gap-6"
          >
            {user?.html_url && (
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
            )}
            {user?.twitter_username && (
              <a
                href={`https://twitter.com/${user.twitter_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
            )}
            {user?.blog && (
              <a
                href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110"
                aria-label="Website"
              >
                <Globe className="w-6 h-6" />
              </a>
            )}
            {user?.email && (
              <a
                href={`mailto:${user.email}`}
                className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <div className="w-6 h-10 border-2 border-muted rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-primary rounded-full animate-scroll"></div>
        </div>
      </motion.div>
    </section>
  );
}
