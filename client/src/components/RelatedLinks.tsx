import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, FileText, Shield, Image, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogLink {
  title: string;
  href: string;
}

interface RelatedLinksProps {
  blogLinks?: BlogLink[];
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const standardLinks = [
  {
    title: 'Pricing & What\'s Included',
    href: '/private-cruises#pricing',
    icon: FileText,
    description: 'Transparent pricing and package details'
  },
  {
    title: 'FAQs',
    href: '/testimonials-faq',
    icon: BookOpen,
    description: 'Answers to common questions'
  },
  {
    title: 'Safety Guidelines',
    href: '/blogs/lake-travis-boat-safety-essential-guidelines-for-safe-party-cruises',
    icon: Shield,
    description: 'Lake Travis boat safety tips'
  },
  {
    title: 'Photo Gallery',
    href: '/gallery',
    icon: Image,
    description: 'Browse our event photos'
  }
];

export default function RelatedLinks({ blogLinks = [] }: RelatedLinksProps) {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-3">
            Related Links & Resources
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Everything you need to plan the perfect Lake Travis celebration
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {standardLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={link.href}>
                  <a className="block h-full group" data-testid={`link-related-${link.title.toLowerCase().replace(/[^a-z]+/g, '-')}`}>
                    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-brand-blue">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue/20 transition-colors">
                            <link.icon className="h-6 w-6 text-brand-blue" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg mb-1 group-hover:text-brand-blue transition-colors">
                              {link.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {link.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </Link>
              </motion.div>
            ))}
          </div>

          {blogLinks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold font-heading mb-6 text-center">
                Helpful Articles
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {blogLinks.map((blog, index) => (
                  <Link key={blog.href} href={blog.href}>
                    <a className="block group" data-testid={`link-blog-${index}`}>
                      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border hover:border-brand-yellow">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-3">
                            <BookOpen className="h-5 w-5 text-brand-yellow mt-1 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold group-hover:text-brand-blue transition-colors">
                                {blog.title}
                              </h4>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
