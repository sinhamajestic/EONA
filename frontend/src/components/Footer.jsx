import React from 'react';
import { Link } from 'react-router-dom';
import { Mic2, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

export const Footer = () => {
  const footerLinks = {
    Product: [
      { name: 'Features', href: '#features' },
      { name: 'How it Works', href: '#how-it-works' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'API', href: '#api' }
    ],
    Community: [
      { name: 'Discord', href: '#discord' },
      { name: 'Creator Program', href: '#creators' },
      { name: 'Blog', href: '#blog' },
      { name: 'Tutorials', href: '#tutorials' }
    ],
    Company: [
      { name: 'About', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press', href: '#press' },
      { name: 'Contact', href: '#contact' }
    ],
    Legal: [
      { name: 'Privacy', href: '#privacy' },
      { name: 'Terms', href: '#terms' },
      { name: 'Security', href: '#security' },
      { name: 'Cookies', href: '#cookies' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#twitter' },
    { name: 'Instagram', icon: Instagram, href: '#instagram' },
    { name: 'YouTube', icon: Youtube, href: '#youtube' },
    { name: 'Email', icon: Mail, href: 'mailto:hello@snapcast.com' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Mic2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">SnapCast</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              The TikTok for Audio. Create, remix, and share snackable voice clips powered by AI voices.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors hover-scale"
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-white mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © 2025 SnapCast. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#status" className="text-gray-400 hover:text-white text-sm transition-colors">
              Status
            </a>
            <a href="#security" className="text-gray-400 hover:text-white text-sm transition-colors">
              Security
            </a>
            <a href="#accessibility" className="text-gray-400 hover:text-white text-sm transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};