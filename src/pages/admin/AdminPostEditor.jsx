import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Save, 
  Eye, 
  ArrowLeft, 
  Upload, 
  X, 
  Plus,
  Hash,
  Image as ImageIcon,
  FileText,
  Settings,
  Link,
  ExternalLink,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { postsAPI, categoriesAPI, uploadAPI } from '../../services/api';
import { createSlug, calculateReadingTime } from '../../utils/helpers';

const AdminPostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [post, setPost] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    status: 'draft',
    featuredImage: {
      url: '',
      alt: '',
      caption: ''
    },
    externalLinks: [],
    seo: {
      metaTitle: '',
      metaDescription: '',
      metaKeywords: []
    }
  });

  const [categories, setCategories] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesAPI.getCategories();
        setCategories(response.data.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch post data if editing
  useEffect(() => {
    if (isEditing) {
      const fetchPost = async () => {
        try {
          setIsLoading(true);
          const response = await postsAPI.getPostById(id);
          const postData = response.data.data.post;
          
          setPost({
            title: postData.title || '',
            slug: postData.slug || '',
            excerpt: postData.excerpt || '',
            content: postData.content || '',
            category: postData.category._id || '',
            tags: postData.tags || [],
            status: postData.status || 'draft',
            featuredImage: {
              url: postData.featuredImage?.url || '',
              alt: postData.featuredImage?.alt || '',
              caption: postData.featuredImage?.caption || ''
            },
            externalLinks: postData.externalLinks || [],
            seo: {
              metaTitle: postData.seo?.metaTitle || '',
              metaDescription: postData.seo?.metaDescription || '',
              metaKeywords: postData.seo?.metaKeywords || []
            }
          });
        } catch (error) {
          console.error('Error fetching post:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPost();
    }
  }, [id, isEditing]);

  // Auto-generate slug from title
  useEffect(() => {
    if (post.title && !isEditing) {
      setPost(prev => ({
        ...prev,
        slug: createSlug(post.title)
      }));
    }
  }, [post.title, isEditing]);

  const handleInputChange = (field, value) => {
    setPost(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (parent, field, value) => {
    setPost(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !post.tags.includes(tagInput.trim())) {
      setPost(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !post.seo.metaKeywords.includes(keywordInput.trim())) {
      setPost(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          metaKeywords: [...prev.seo.metaKeywords, keywordInput.trim()]
        }
      }));
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (keywordToRemove) => {
    setPost(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        metaKeywords: prev.seo.metaKeywords.filter(keyword => keyword !== keywordToRemove)
      }
    }));
  };

  // External Links handlers
  const handleAddExternalLink = () => {
    const newLink = {
      title: '',
      url: '',
      description: '',
      isDefault: post.externalLinks.length === 0, // First link is default
      openInNewTab: true,
      order: post.externalLinks.length
    };

    setPost(prev => ({
      ...prev,
      externalLinks: [...prev.externalLinks, newLink]
    }));
  };

  const handleUpdateExternalLink = (index, field, value) => {
    setPost(prev => ({
      ...prev,
      externalLinks: prev.externalLinks.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  const handleRemoveExternalLink = (index) => {
    setPost(prev => ({
      ...prev,
      externalLinks: prev.externalLinks.filter((_, i) => i !== index)
    }));
  };

  const handleSetDefaultLink = (index) => {
    setPost(prev => ({
      ...prev,
      externalLinks: prev.externalLinks.map((link, i) => ({
        ...link,
        isDefault: i === index
      }))
    }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('image', file);

      const response = await uploadAPI.uploadImage(formData);
      const imageUrl = response.data.data.url;

      setPost(prev => ({
        ...prev,
        featuredImage: {
          ...prev.featuredImage,
          url: imageUrl,
          alt: prev.featuredImage.alt || post.title
        }
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (status = post.status) => {
    try {
      setIsSaving(true);

      const postData = {
        ...post,
        status,
        readingTime: calculateReadingTime(post.content),
        publishedAt: status === 'published' && post.status !== 'published' ? new Date() : undefined
      };

      let response;
      if (isEditing) {
        response = await postsAPI.updatePost(id, postData);
      } else {
        response = await postsAPI.createPost(postData);
      }

      if (response.data.success) {
        navigate('/admin/posts');
      }
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    // In a real app, this would open a preview modal or new tab
    setPreviewMode(!previewMode);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isEditing ? 'Edit Post' : 'New Post'} - Admin Dashboard</title>
        <meta name="description" content={isEditing ? 'Edit blog post' : 'Create new blog post'} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" onClick={() => navigate('/admin/posts')}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Posts
                </Button>
                <div>
                  <h1 className="text-2xl font-bold">
                    {isEditing ? 'Edit Post' : 'New Post'}
                  </h1>
                  <p className="text-muted-foreground">
                    {isEditing ? 'Update your blog post' : 'Create a new blog post'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={handlePreview}>
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleSave('draft')}
                  disabled={isSaving}
                >
                  Save Draft
                </Button>
                <Button 
                  onClick={() => handleSave('published')}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Publish
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Post Content</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={post.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Enter post title..."
                      className="text-lg"
                    />
                  </div>

                  {/* Slug */}
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={post.slug}
                      onChange={(e) => handleInputChange('slug', e.target.value)}
                      placeholder="post-url-slug"
                    />
                    <p className="text-xs text-muted-foreground">
                      URL: /blog/{post.slug}
                    </p>
                  </div>

                  {/* Excerpt */}
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={post.excerpt}
                      onChange={(e) => handleInputChange('excerpt', e.target.value)}
                      placeholder="Brief description of the post..."
                      rows={3}
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <Label htmlFor="content">Content *</Label>
                    <Textarea
                      id="content"
                      value={post.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      placeholder="Write your post content in Markdown..."
                      rows={20}
                      className="font-mono"
                    />
                    <p className="text-xs text-muted-foreground">
                      Supports Markdown formatting. Reading time: ~{calculateReadingTime(post.content)} min
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* SEO Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>SEO Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <Input
                      id="metaTitle"
                      value={post.seo.metaTitle}
                      onChange={(e) => handleNestedInputChange('seo', 'metaTitle', e.target.value)}
                      placeholder="SEO title (leave empty to use post title)"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea
                      id="metaDescription"
                      value={post.seo.metaDescription}
                      onChange={(e) => handleNestedInputChange('seo', 'metaDescription', e.target.value)}
                      placeholder="SEO description (leave empty to use excerpt)"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Meta Keywords</Label>
                    <div className="flex space-x-2">
                      <Input
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        placeholder="Add keyword..."
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
                      />
                      <Button type="button" onClick={handleAddKeyword}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {post.seo.metaKeywords.map((keyword, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                          <span>{keyword}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveKeyword(keyword)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Post Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Post Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <select
                      id="category"
                      value={post.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                      required
                    >
                      <option value="">Select category...</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      value={post.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex space-x-2">
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="Add tag..."
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      />
                      <Button type="button" onClick={handleAddTag}>
                        <Hash className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="flex items-center space-x-1">
                          <span>#{tag}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* External Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Link className="h-5 w-5" />
                      <span>External Links</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddExternalLink}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Link
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {post.externalLinks.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      <ExternalLink className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">No external links added yet.</p>
                      <p className="text-xs">Add links to related resources, tools, or references.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {post.externalLinks.map((link, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">Link {index + 1}</span>
                              {link.isDefault && (
                                <Badge variant="secondary" className="text-xs">
                                  <Star className="h-3 w-3 mr-1" />
                                  Default
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              {!link.isDefault && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleSetDefaultLink(index)}
                                  title="Set as default link"
                                >
                                  <Star className="h-3 w-3" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveExternalLink(index)}
                                className="text-destructive hover:text-destructive"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label>Link Title *</Label>
                              <Input
                                value={link.title}
                                onChange={(e) => handleUpdateExternalLink(index, 'title', e.target.value)}
                                placeholder="e.g., Official Documentation"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>URL *</Label>
                              <Input
                                value={link.url}
                                onChange={(e) => handleUpdateExternalLink(index, 'url', e.target.value)}
                                placeholder="https://example.com"
                                type="url"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Input
                              value={link.description}
                              onChange={(e) => handleUpdateExternalLink(index, 'description', e.target.value)}
                              placeholder="Brief description of the link (optional)"
                            />
                          </div>

                          <div className="flex items-center space-x-4">
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={link.openInNewTab}
                                onChange={(e) => handleUpdateExternalLink(index, 'openInNewTab', e.target.checked)}
                                className="rounded border-input"
                              />
                              <span className="text-sm">Open in new tab</span>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Featured Image */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ImageIcon className="h-5 w-5" />
                    <span>Featured Image</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {post.featuredImage.url ? (
                    <div className="space-y-3">
                      <img
                        src={post.featuredImage.url}
                        alt={post.featuredImage.alt}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleNestedInputChange('featuredImage', 'url', '')}
                        className="w-full"
                      >
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload featured image
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('image-upload').click()}
                        disabled={isUploading}
                      >
                        {isUploading ? 'Uploading...' : 'Choose Image'}
                      </Button>
                    </div>
                  )}

                  {post.featuredImage.url && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="imageAlt">Alt Text</Label>
                        <Input
                          id="imageAlt"
                          value={post.featuredImage.alt}
                          onChange={(e) => handleNestedInputChange('featuredImage', 'alt', e.target.value)}
                          placeholder="Describe the image..."
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="imageCaption">Caption</Label>
                        <Input
                          id="imageCaption"
                          value={post.featuredImage.caption}
                          onChange={(e) => handleNestedInputChange('featuredImage', 'caption', e.target.value)}
                          placeholder="Image caption (optional)"
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPostEditor;

