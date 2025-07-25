import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  Reply, 
  User,
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatRelativeTime } from '../utils/helpers';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [formData, setFormData] = useState({
    author: '',
    email: '',
    content: ''
  });

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/comments/${postId}`);
      const data = await response.json();
      
      if (data.success) {
        setComments(data.data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          author: formData.author,
          email: formData.email,
          content: formData.content,
          parentId: replyTo
        }),
      });

      const data = await response.json();

      if (data.success) {
        setFormData({ author: '', email: '', content: '' });
        setShowForm(false);
        setReplyTo(null);
        // Show success message
        alert('Comment submitted for approval!');
      } else {
        throw new Error(data.message || 'Failed to submit comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to submit comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReply = (commentId) => {
    setReplyTo(commentId);
    setShowForm(true);
  };

  const renderComment = (comment, isReply = false) => (
    <div key={comment._id} className={`${isReply ? 'ml-8 mt-4' : 'mb-6'}`}>
      <Card className={isReply ? 'border-l-4 border-l-primary/30' : ''}>
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="text-xs">
                {comment.author.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-medium text-sm">{comment.author}</span>
                <span className="text-xs text-muted-foreground">
                  {formatRelativeTime(comment.createdAt)}
                </span>
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-3">
                {comment.content}
              </p>
              {!isReply && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleReply(comment._id)}
                  className="text-xs p-1 h-auto"
                >
                  <Reply className="w-3 h-3 mr-1" />
                  Reply
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Render replies */}
      {comments
        .filter(reply => reply.parentId === comment._id)
        .map(reply => renderComment(reply, true))
      }
    </div>
  );

  const topLevelComments = comments.filter(comment => !comment.parentId);

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold flex items-center">
          <MessageSquare className="w-6 h-6 mr-2" />
          Comments ({topLevelComments.length})
        </h3>
        <Button
          onClick={() => setShowForm(!showForm)}
          variant={showForm ? "outline" : "default"}
        >
          {showForm ? 'Cancel' : 'Add Comment'}
        </Button>
      </div>

      {/* Comment Form */}
      {showForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">
              {replyTo ? 'Reply to Comment' : 'Leave a Comment'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Name *</Label>
                  <Input
                    id="author"
                    name="author"
                    type="text"
                    required
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Comment *</Label>
                <Textarea
                  id="content"
                  name="content"
                  required
                  rows={4}
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Share your thoughts..."
                />
              </div>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <AlertCircle className="w-4 h-4" />
                <span>Comments are moderated and will appear after approval.</span>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Comment
                    </>
                  )}
                </Button>
                {replyTo && (
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => {
                      setReplyTo(null);
                      setShowForm(false);
                    }}
                  >
                    Cancel Reply
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Comments List */}
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading comments...</p>
        </div>
      ) : topLevelComments.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium mb-2">No comments yet</h4>
            <p className="text-muted-foreground mb-4">
              Be the first to share your thoughts on this post!
            </p>
            <Button onClick={() => setShowForm(true)}>
              Write First Comment
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div>
          {topLevelComments.map(comment => renderComment(comment))}
        </div>
      )}
    </div>
  );
};

export default Comments;

