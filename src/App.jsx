import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from 'next-themes';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Public pages
import HomePage from './pages/HomePage';
import BlogPost from './pages/BlogPost';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import ContactPage from './pages/ContactPage';
import LatestPostsPage from './pages/LatestPostsPage';
import AboutUsPage from './pages/AboutUsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import NewsletterPage from './pages/NewsletterPage';
import SitemapPage from './pages/SitemapPage';
import ArchivePage from './pages/ArchivePage';
import NotFoundPage from './pages/NotFoundPage';

// Admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPosts from './pages/admin/AdminPosts';
import AdminPostEditor from './pages/admin/AdminPostEditor';
import AdminCategories from './pages/admin/AdminCategories';
import AdminProfile from './pages/admin/AdminProfile';

// Protected route component
import ProtectedRoute from './components/layout/ProtectedRoute';

import './App.css';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-background text-foreground">
              <Routes>
                {/* Public routes with header and footer */}
                <Route path="/*" element={
                  <>
                    <Header />
                    <main className="flex-1">
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/blog/:slug" element={<BlogPost />} />
                        <Route path="/category/:slug" element={<CategoryPage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/latest-posts" element={<LatestPostsPage />} />
                        <Route path="/about" element={<AboutUsPage />} />
                        <Route path="/privacy" element={<PrivacyPolicyPage />} />
                        <Route path="/terms" element={<TermsOfServicePage />} />
                        <Route path="/newsletter" element={<NewsletterPage />} />
                        <Route path="/sitemap" element={<SitemapPage />} />
                        <Route path="/archive" element={<ArchivePage />} />
                        <Route path="*" element={<NotFoundPage />} />
                      </Routes>
                    </main>
                    <Footer />
                  </>
                } />

                {/* Admin routes without header/footer */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/*" element={
                  <ProtectedRoute>
                    <Routes>
                      <Route path="/" element={<AdminDashboard />} />
                      <Route path="/posts" element={<AdminPosts />} />
                      <Route path="/posts/new" element={<AdminPostEditor />} />
                      <Route path="/posts/edit/:id" element={<AdminPostEditor />} />
                      <Route path="/categories" element={<AdminCategories />} />
                      <Route path="/profile" element={<AdminProfile />} />
                    </Routes>
                  </ProtectedRoute>
                } />
              </Routes>
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;

