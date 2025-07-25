import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Heart,
  Rss,
  ArrowUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    blog: [
      { name: 'Latest Posts', href: '/latest-posts' },
      { name: 'Tech News', href: '/category/tech-news' },
      { name: 'How-To Guides', href: '/category/tech-how-to-guides' },
      { name: 'AI Tools', href: '/category/ai-tools-productivity-apps' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
    resources: [
      { name: 'RSS Feed', href: '/rss.xml' },
      { name: 'Newsletter', href: '/newsletter' },
      { name: 'Sitemap', href: '/sitemap' },
      { name: 'Archive', href: '/archive' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com/techblog', icon: Twitter },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/techblog', icon: Linkedin },
    { name: 'GitHub', href: 'https://github.com/techblog', icon: Github },
    { name: 'Email', href: 'mailto:contact@techblog.com', icon: Mail },
  ];

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TB</span>
                </div>
                <span className="font-bold text-xl">Tech Blog</span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your go-to source for the latest technology news, comprehensive how-to guides, 
                and reviews of cutting-edge AI tools and productivity apps.
              </p>
              <div className="flex space-x-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Button
                      key={social.name}
                      variant="ghost"
                      size="icon"
                      asChild
                      className="h-8 w-8 hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Blog Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm uppercase tracking-wider">Blog</h3>
              <ul className="space-y-2">
                {footerLinks.blog.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm uppercase tracking-wider">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm uppercase tracking-wider">Resources</h3>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center space-x-1"
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {link.name === 'RSS Feed' && <Rss className="h-3 w-3" />}
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>© {currentYear} Tech Blog. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-red-500 fill-current" />
              <span>by Tech Blog Team</span>
            </span>
          </div>

          {/* Back to Top Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="flex items-center space-x-1 text-muted-foreground hover:text-foreground"
          >
            <ArrowUp className="h-3 w-3" />
            <span>Back to top</span>
          </Button>
        </div>

        {/* Newsletter Signup Section */}
        <div className="py-8 border-t">
          <div className="max-w-md mx-auto text-center space-y-4">
            <h3 className="font-semibold text-lg">Stay Updated</h3>
            <p className="text-muted-foreground text-sm">
              Get the latest tech news and tutorials delivered to your inbox.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="sm" className="px-6">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              No spam, unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

