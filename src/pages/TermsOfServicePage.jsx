import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Scale, Shield, AlertTriangle, Mail, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const TermsOfServicePage = () => {
  const lastUpdated = 'January 1, 2025';

  return (
    <>
      <Helmet>
        <title>Terms of Service - Tech Blog</title>
        <meta name="description" content="Read our terms of service to understand the rules and guidelines for using our tech blog website and services." />
        <meta name="keywords" content="terms of service, terms of use, legal, guidelines, tech blog" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Scale className="h-4 w-4" />
                <span>Legal Terms</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Terms of Service
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Please read these terms carefully before using our website and services.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Last updated: {lastUpdated}</span>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Introduction */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold flex items-center space-x-2">
                  <FileText className="h-6 w-6 text-primary" />
                  <span>Agreement to Terms</span>
                </h2>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  Welcome to Tech Blog ("we," "our," or "us"). These Terms of Service ("Terms") govern your 
                  use of our website located at techblog.com (the "Service") operated by Tech Blog.
                </p>
                <p>
                  By accessing or using our Service, you agree to be bound by these Terms. If you disagree 
                  with any part of these terms, then you may not access the Service.
                </p>
                <p>
                  These Terms apply to all visitors, users, and others who access or use the Service.
                </p>
              </CardContent>
            </Card>

            {/* Use of Service */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Use of Our Service</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Permitted Use</h3>
                  <p className="text-muted-foreground mb-3">
                    You may use our Service for lawful purposes only. You agree to use the Service in accordance 
                    with these Terms and all applicable laws and regulations.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Reading and sharing our articles</li>
                    <li>Subscribing to our newsletter</li>
                    <li>Commenting on articles (when available)</li>
                    <li>Contacting us through provided channels</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Prohibited Use</h3>
                  <p className="text-muted-foreground mb-3">
                    You may not use our Service:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                    <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                    <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                    <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                    <li>To submit false or misleading information</li>
                    <li>To upload or transmit viruses or any other type of malicious code</li>
                    <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                    <li>For any obscene or immoral purpose</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold flex items-center space-x-2">
                  <Shield className="h-6 w-6 text-primary" />
                  <span>Intellectual Property Rights</span>
                </h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Our Content</h3>
                  <p className="text-muted-foreground">
                    The Service and its original content, features, and functionality are and will remain the 
                    exclusive property of Tech Blog and its licensors. The Service is protected by copyright, 
                    trademark, and other laws. Our trademarks and trade dress may not be used in connection 
                    with any product or service without our prior written consent.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Your Content</h3>
                  <p className="text-muted-foreground">
                    Our Service may allow you to post, link, store, share and otherwise make available certain 
                    information, text, graphics, videos, or other material ("Content"). You are responsible for 
                    Content that you post to the Service, including its legality, reliability, and appropriateness.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">License Grant</h3>
                  <p className="text-muted-foreground">
                    By posting Content to the Service, you grant us the right and license to use, modify, 
                    publicly perform, publicly display, reproduce, and distribute such Content on and through 
                    the Service.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* User Accounts */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">User Accounts</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  When you create an account with us, you must provide information that is accurate, complete, 
                  and current at all times. You are responsible for safeguarding the password and for all 
                  activities that occur under your account.
                </p>
                <p className="text-muted-foreground">
                  You agree not to disclose your password to any third party. You must notify us immediately 
                  upon becoming aware of any breach of security or unauthorized use of your account.
                </p>
              </CardContent>
            </Card>

            {/* Privacy Policy */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Privacy Policy</h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your 
                  use of the Service, to understand our practices. Our Privacy Policy is incorporated into 
                  these Terms by reference.
                </p>
              </CardContent>
            </Card>

            {/* Disclaimers */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold flex items-center space-x-2">
                  <AlertTriangle className="h-6 w-6 text-primary" />
                  <span>Disclaimers</span>
                </h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Information Accuracy</h3>
                  <p className="text-muted-foreground">
                    While we strive to provide accurate and up-to-date information, we make no representations 
                    or warranties of any kind, express or implied, about the completeness, accuracy, reliability, 
                    suitability, or availability of the information contained on the Service.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Service Availability</h3>
                  <p className="text-muted-foreground">
                    We do not guarantee that the Service will be available at all times. We may experience 
                    hardware, software, or other problems or need to perform maintenance related to the Service, 
                    resulting in interruptions, delays, or errors.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Third-Party Links</h3>
                  <p className="text-muted-foreground">
                    Our Service may contain links to third-party websites or services that are not owned or 
                    controlled by Tech Blog. We have no control over and assume no responsibility for the 
                    content, privacy policies, or practices of any third-party websites or services.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Limitation of Liability</h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  In no event shall Tech Blog, nor its directors, employees, partners, agents, suppliers, or 
                  affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, 
                  including without limitation, loss of profits, data, use, goodwill, or other intangible losses, 
                  resulting from your use of the Service.
                </p>
                <p className="text-muted-foreground">
                  Some jurisdictions do not allow the exclusion of certain warranties or the exclusion or 
                  limitation of liability for consequential or incidental damages. Accordingly, some of the 
                  above limitations may not apply to you.
                </p>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Termination</h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We may terminate or suspend your account and bar access to the Service immediately, without 
                  prior notice or liability, under our sole discretion, for any reason whatsoever and without 
                  limitation, including but not limited to a breach of the Terms.
                </p>
                <p className="text-muted-foreground">
                  If you wish to terminate your account, you may simply discontinue using the Service or 
                  contact us to request account deletion.
                </p>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Governing Law</h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  These Terms shall be interpreted and governed by the laws of the State of [Your State/Country], 
                  without regard to its conflict of law provisions. Our failure to enforce any right or provision 
                  of these Terms will not be considered a waiver of those rights.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Terms */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Changes to Terms</h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                  If a revision is material, we will provide at least 30 days notice prior to any new terms 
                  taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
                <p className="text-muted-foreground mt-4">
                  By continuing to access or use our Service after any revisions become effective, you agree 
                  to be bound by the revised terms.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardHeader>
                <h2 className="text-2xl font-bold flex items-center space-x-2">
                  <Mail className="h-6 w-6 text-primary" />
                  <span>Contact Us</span>
                </h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Email:</strong> legal@techblog.com</p>
                  <p><strong>Website:</strong> <a href="/contact" className="text-primary hover:underline">Contact Form</a></p>
                  <p><strong>Address:</strong> Tech Blog Legal Team, 123 Tech Street, Digital City, DC 12345</p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfServicePage;

