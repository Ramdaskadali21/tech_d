import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Eye, Lock, Users, Mail, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const PrivacyPolicyPage = () => {
  const lastUpdated = 'January 1, 2025';

  return (
    <>
      <Helmet>
        <title>Privacy Policy - Tech Blog</title>
        <meta name="description" content="Read our privacy policy to understand how we collect, use, and protect your personal information when you visit our tech blog." />
        <meta name="keywords" content="privacy policy, data protection, personal information, cookies, tech blog" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Shield className="h-4 w-4" />
                <span>Your Privacy Matters</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Privacy Policy
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                We are committed to protecting your privacy and being transparent about how we handle your data.
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
                  <Eye className="h-6 w-6 text-primary" />
                  <span>Introduction</span>
                </h2>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  At Tech Blog ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal data. 
                  This privacy policy explains how we collect, use, and safeguard your information when you visit our website 
                  or use our services.
                </p>
                <p>
                  This policy applies to all visitors, users, and others who access or use our service. By using our website, 
                  you agree to the collection and use of information in accordance with this policy.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold flex items-center space-x-2">
                  <Users className="h-6 w-6 text-primary" />
                  <span>Information We Collect</span>
                </h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
                  <p className="text-muted-foreground mb-3">
                    We may collect personal information that you voluntarily provide to us, including:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Email address (when subscribing to our newsletter)</li>
                    <li>Name (when commenting or contacting us)</li>
                    <li>Contact information (when reaching out through our contact form)</li>
                    <li>Any other information you choose to provide</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Automatically Collected Information</h3>
                  <p className="text-muted-foreground mb-3">
                    When you visit our website, we automatically collect certain information:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>IP address and location data</li>
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>Pages visited and time spent on our site</li>
                    <li>Referring website</li>
                    <li>Device information</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Cookies and Tracking Technologies</h3>
                  <p className="text-muted-foreground">
                    We use cookies and similar tracking technologies to enhance your browsing experience, 
                    analyze site traffic, and understand where our visitors are coming from. You can control 
                    cookie settings through your browser preferences.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Your Information */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold flex items-center space-x-2">
                  <Lock className="h-6 w-6 text-primary" />
                  <span>How We Use Your Information</span>
                </h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Providing and maintaining our website and services</li>
                  <li>Sending newsletters and updates (with your consent)</li>
                  <li>Responding to your comments, questions, and requests</li>
                  <li>Analyzing website usage and improving our content</li>
                  <li>Detecting and preventing fraud or abuse</li>
                  <li>Complying with legal obligations</li>
                  <li>Personalizing your experience on our website</li>
                </ul>
              </CardContent>
            </Card>

            {/* Information Sharing */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Information Sharing and Disclosure</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We do not sell, trade, or otherwise transfer your personal information to third parties, 
                  except in the following circumstances:
                </p>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Service Providers</h3>
                  <p className="text-muted-foreground">
                    We may share your information with trusted third-party service providers who assist us in 
                    operating our website, conducting our business, or serving our users, provided they agree 
                    to keep this information confidential.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Legal Requirements</h3>
                  <p className="text-muted-foreground">
                    We may disclose your information if required to do so by law or in response to valid 
                    requests by public authorities.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Business Transfers</h3>
                  <p className="text-muted-foreground">
                    In the event of a merger, acquisition, or sale of assets, your information may be 
                    transferred as part of that transaction.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Data Security</h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We implement appropriate technical and organizational security measures to protect your 
                  personal information against unauthorized access, alteration, disclosure, or destruction. 
                  These measures include:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication measures</li>
                  <li>Employee training on data protection</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  However, no method of transmission over the internet or electronic storage is 100% secure, 
                  and we cannot guarantee absolute security.
                </p>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Your Rights and Choices</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Access and Portability</h3>
                  <p className="text-muted-foreground">
                    You have the right to request access to the personal information we hold about you 
                    and to receive a copy of that information.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Correction</h3>
                  <p className="text-muted-foreground">
                    You can request that we correct any inaccurate or incomplete personal information.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Deletion</h3>
                  <p className="text-muted-foreground">
                    You may request that we delete your personal information, subject to certain exceptions.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Opt-out</h3>
                  <p className="text-muted-foreground">
                    You can unsubscribe from our newsletters at any time by clicking the unsubscribe 
                    link in our emails or contacting us directly.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Third-Party Links */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Third-Party Links</h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our website may contain links to third-party websites or services. We are not responsible 
                  for the privacy practices or content of these external sites. We encourage you to review 
                  the privacy policies of any third-party sites you visit.
                </p>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Children's Privacy</h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our website is not intended for children under the age of 13. We do not knowingly collect 
                  personal information from children under 13. If you are a parent or guardian and believe 
                  your child has provided us with personal information, please contact us so we can delete 
                  such information.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Policy */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Changes to This Privacy Policy</h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We may update this privacy policy from time to time to reflect changes in our practices 
                  or for other operational, legal, or regulatory reasons. We will notify you of any material 
                  changes by posting the new privacy policy on this page and updating the "Last updated" date.
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
                  If you have any questions about this privacy policy or our data practices, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Email:</strong> privacy@techblog.com</p>
                  <p><strong>Website:</strong> <a href="/contact" className="text-primary hover:underline">Contact Form</a></p>
                  <p><strong>Address:</strong> Tech Blog Privacy Team, 123 Tech Street, Digital City, DC 12345</p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;

