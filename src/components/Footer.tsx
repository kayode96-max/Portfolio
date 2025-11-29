import { GitHubUser } from '@/types';
import { Github, Twitter, Mail, Globe, Heart } from 'lucide-react';

interface FooterProps {
  user: GitHubUser | null;
}

export function Footer({ user }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground">
              Portfolio
            </h3>
            <p className="text-muted-foreground max-w-xs">
              Building amazing digital experiences with modern technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <a href="#home" className="block text-muted-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="#about" className="block text-muted-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#experience" className="block text-muted-foreground hover:text-primary transition-colors">
                Experience
              </a>
              <a href="#skills" className="block text-muted-foreground hover:text-primary transition-colors">
                Skills
              </a>
              <a href="#projects" className="block text-muted-foreground hover:text-primary transition-colors">
                Projects
              </a>
              <a href="#contact" className="block text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-4">
              {user?.html_url && (
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}

              {user?.twitter_username && (
                <a
                  href={`https://twitter.com/${user.twitter_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}

              {user?.email && (
                <a
                  href={`mailto:${user.email}`}
                  className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              )}

              {user?.blog && (
                <a
                  href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label="Website"
                >
                  <Globe className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-muted">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {currentYear} {user?.name || user?.login || 'Portfolio'}. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              Built with
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              using Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
