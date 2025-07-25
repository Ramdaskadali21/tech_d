import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Users, 
  Target, 
  Heart, 
  Award,
  Mail,
  Twitter,
  Linkedin,
  Github
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AboutUsPage = () => {
  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'Founder & Editor-in-Chief',
      bio: 'Tech enthusiast with 10+ years of experience in software development and technology journalism.',
      image: '/uploads/team/alex-johnson.jpg',
      social: {
        twitter: 'https://twitter.com/alexjohnson',
        linkedin: 'https://linkedin.com/in/alexjohnson',
        github: 'https://github.com/alexjohnson'
      }
    },
    {
      name: 'Sarah Chen',
      role: 'Senior Tech Writer',
      bio: 'AI and machine learning specialist with a passion for making complex topics accessible to everyone.',
      image: '/uploads/team/sarah-chen.jpg',
      social: {
        twitter: 'https://twitter.com/sarahchen',
        linkedin: 'https://linkedin.com/in/sarahchen'
      }
    },
    {
      name: 'Mike Rodriguez',
      role: 'Mobile Technology Expert',
      bio: 'Former mobile app developer turned tech reviewer, specializing in smartphones and mobile ecosystems.',
      image: '/uploads/team/mike-rodriguez.jpg',
      social: {
        twitter: 'https://twitter.com/mikerodriguez',
        linkedin: 'https://linkedin.com/in/mikerodriguez'
      }
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Accuracy First',
      description: 'We prioritize factual accuracy and thorough research in all our content.'
    },
    {
      icon: Heart,
      title: 'Community Focused',
      description: 'Our readers are at the heart of everything we do. We write for you.'
    },
    {
      icon: Award,
      title: 'Quality Content',
      description: 'Every article is crafted with care to provide maximum value to our audience.'
    },
    {
      icon: Users,
      title: 'Inclusive Approach',
      description: 'Technology should be accessible to everyone, regardless of their background.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Monthly Readers' },
    { number: '500+', label: 'Articles Published' },
    { number: '3+', label: 'Years of Experience' },
    { number: '95%', label: 'Reader Satisfaction' }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Tech Blog</title>
        <meta name="description" content="Learn about our mission to make technology accessible to everyone. Meet our team of expert writers and discover what drives us." />
        <meta name="keywords" content="about us, tech blog team, technology writers, mission, values" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                About Tech Blog
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                We're passionate about making technology accessible, understandable, and useful for everyone.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Mission Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
              <div className="prose prose-lg mx-auto text-center">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At Tech Blog, we believe that technology should empower everyone, not intimidate them. 
                  Our mission is to bridge the gap between complex technological innovations and everyday users 
                  by providing clear, accurate, and actionable content.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                  Whether you're a complete beginner looking to understand the basics or a tech enthusiast 
                  seeking the latest insights, we're here to guide you through the ever-evolving world of technology.
                </p>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{value.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-4">
                      <Users className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <Badge variant="secondary" className="mx-auto">{member.role}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                    <div className="flex justify-center space-x-3">
                      {member.social.twitter && (
                        <a 
                          href={member.social.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Twitter className="h-4 w-4" />
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a 
                          href={member.social.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                      {member.social.github && (
                        <a 
                          href={member.social.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* What We Cover Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">What We Cover</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">Tech News</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Stay updated with the latest technology news, product launches, and industry developments.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">How-To Guides</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Step-by-step tutorials and guides to help you master new technologies and solve common problems.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">AI Tools & Reviews</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Comprehensive reviews and guides for AI tools, productivity apps, and emerging technologies.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Contact CTA Section */}
          <section className="text-center">
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardContent className="pt-8 pb-8">
                <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Have a question, suggestion, or want to collaborate? We'd love to hear from you!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <a href="/contact" className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Contact Us</span>
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="mailto:hello@techblog.com" className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>hello@techblog.com</span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;

