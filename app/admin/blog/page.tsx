'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Search, Eye, Edit, Trash2, FileText, Loader2, BookOpen, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { 
  getAllBlogPosts, 
  deleteBlogPost, 
  updateBlogPost,
  createBlogPost,
  generateSlug,
  formatBlogDate,
  BlogPost 
} from '@/lib/firebase/blog';
import { auth } from '@/lib/firebase/config';
import toast from 'react-hot-toast';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [newPostDialog, setNewPostDialog] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    author: 'Admin',
    status: 'draft' as BlogPost['status'],
    featuredImage: ''
  });
  const [mediaFiles, setMediaFiles] = useState<Array<{ url: string; type: string; name: string }>>([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await getAllBlogPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error loading blog posts:', error);
      toast.error('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    
    try {
      await deleteBlogPost(id);
      toast.success('Blog post deleted successfully!');
      loadPosts();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast.error('Failed to delete blog post');
    }
  };

  const handleStatusChange = async (id: string, status: BlogPost['status']) => {
    try {
      await updateBlogPost(id, { status });
      toast.success(`Post ${status === 'published' ? 'published' : 'unpublished'} successfully!`);
      loadPosts();
    } catch (error) {
      console.error('Error updating post status:', error);
      toast.error('Failed to update post status');
    }
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const { uploadToCloudinary } = await import('@/lib/cloudinary/upload');
      
      for (const file of Array.from(files)) {
        const result = await uploadToCloudinary(file, 'blog');
        
        setMediaFiles(prev => [...prev, {
          url: result.url,
          type: result.resourceType,
          name: file.name
        }]);

        toast.success(`${file.name} uploaded successfully!`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveMedia = (index: number) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
  };

  const insertMediaIntoContent = (url: string, type: string, name: string) => {
    let mediaTag = '';
    
    if (type === 'image') {
      mediaTag = `\n![${name}](${url})\n`;
    } else if (type === 'video') {
      mediaTag = `\n[Video: ${name}](${url})\n`;
    } else {
      mediaTag = `\n[${name}](${url})\n`;
    }

    setFormData(prev => ({
      ...prev,
      content: prev.content + mediaTag
    }));
    
    toast.success('Media link inserted into content!');
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await createBlogPost({
        title: formData.title,
        slug: generateSlug(formData.title),
        excerpt: formData.excerpt,
        content: formData.content,
        featuredImage: formData.featuredImage || undefined,
        category: formData.category,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        author: formData.author,
        authorId: auth.currentUser?.uid || 'admin',
        status: formData.status
      });

      toast.success(`Blog post ${formData.status === 'published' ? 'published' : 'saved as draft'} successfully!`);
      setNewPostDialog(false);
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        tags: '',
        author: 'Admin',
        status: 'draft',
        featuredImage: ''
      });
      setMediaFiles([]);
      loadPosts();
    } catch (error) {
      console.error('Error creating blog post:', error);
      toast.error('Failed to create blog post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground">Manage blog content</p>
        </div>
        <Button onClick={() => setNewPostDialog(true)}>
          <Plus className="mr-2 h-5 w-5" />
          New Post
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <div className="text-2xl font-bold">{posts.length}</div>
                <p className="text-sm text-muted-foreground">Total Posts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {posts.filter(p => p.status === 'published').length}
                </div>
                <p className="text-sm text-muted-foreground">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Edit className="h-8 w-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {posts.filter(p => p.status === 'draft').length}
                </div>
                <p className="text-sm text-muted-foreground">Drafts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Total Views</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search by title, category, or author..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Posts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Blog Posts ({filteredPosts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Title</th>
                    <th className="text-left p-4 font-medium">Category</th>
                    <th className="text-left p-4 font-medium">Author</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Views</th>
                    <th className="text-left p-4 font-medium">Date</th>
                    <th className="text-right p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium line-clamp-1">{post.title}</div>
                            {post.excerpt && (
                              <div className="text-xs text-muted-foreground line-clamp-1">
                                {post.excerpt}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{post.category}</Badge>
                      </td>
                      <td className="p-4 text-sm">{post.author}</td>
                      <td className="p-4">
                        <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                          {post.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3 text-muted-foreground" />
                          <span>{post.views?.toLocaleString() || 0}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm">{formatBlogDate(post.createdAt)}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="View Details"
                            onClick={() => setSelectedPost(post)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {post.status === 'draft' && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              title="Publish"
                              onClick={() => handleStatusChange(post.id, 'published')}
                              className="text-green-600"
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                          )}
                          {post.status === 'published' && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              title="Unpublish"
                              onClick={() => handleStatusChange(post.id, 'draft')}
                              className="text-yellow-600"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Delete"
                            onClick={() => handleDelete(post.id, post.title)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredPosts.length === 0 && !loading && (
                <div className="text-center py-12 text-muted-foreground">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No blog posts found</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* New Post Dialog */}
      <Dialog open={newPostDialog} onOpenChange={setNewPostDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Blog Post</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreatePost} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <Input 
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter post title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Excerpt *</label>
              <Input 
                required
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief description of the post"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Featured Image URL</label>
              <Input 
                value={formData.featuredImage}
                onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                placeholder="Enter image URL or upload below"
              />
            </div>

            <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
              <label className="block text-sm font-medium mb-2">Upload Media Files</label>
              <p className="text-xs text-muted-foreground mb-3">
                Upload images, videos, audio, documents (PDF, DOC, etc.)
              </p>
              
              <div className="flex items-center gap-2 mb-3">
                <Input 
                  type="file"
                  multiple
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="flex-1"
                />
                {uploading && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
              </div>

              {mediaFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Uploaded Files:</p>
                  {mediaFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded border">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {file.type === 'image' && <FileText className="h-4 w-4 text-blue-600" />}
                        {file.type === 'video' && <FileText className="h-4 w-4 text-purple-600" />}
                        {file.type !== 'image' && file.type !== 'video' && <FileText className="h-4 w-4 text-gray-600" />}
                        <span className="text-sm truncate">{file.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => insertMediaIntoContent(file.url, file.type, file.name)}
                          title="Insert into content"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setFormData({ ...formData, featuredImage: file.url });
                            toast.success('Set as featured image!');
                          }}
                          title="Set as featured image"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveMedia(index)}
                          title="Remove"
                        >
                          <Trash2 className="h-3 w-3 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content *</label>
              <textarea 
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your blog post content here..."
                rows={10}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <Input 
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Export, Agriculture"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Author *</label>
                <Input 
                  required
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Author name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <Input 
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Comma-separated tags (e.g., coffee, export, ethiopia)"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Separate tags with commas
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Status *</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as BlogPost['status'] })}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="flex gap-2 justify-end pt-4 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setNewPostDialog(false)}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Post
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Post Details Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Blog Post Details</DialogTitle>
          </DialogHeader>
          {selectedPost && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-2">{selectedPost.title}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline">{selectedPost.category}</Badge>
                  <Badge variant={selectedPost.status === 'published' ? 'default' : 'secondary'}>
                    {selectedPost.status}
                  </Badge>
                  {selectedPost.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {selectedPost.featuredImage && (
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <img 
                    src={selectedPost.featuredImage} 
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Author</p>
                  <p className="font-medium">{selectedPost.author}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="font-medium">{formatBlogDate(selectedPost.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Views</p>
                  <p className="font-medium">{selectedPost.views?.toLocaleString() || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Likes</p>
                  <p className="font-medium">{selectedPost.likes?.toLocaleString() || 0}</p>
                </div>
              </div>

              {selectedPost.excerpt && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Excerpt</p>
                  <p className="text-sm">{selectedPost.excerpt}</p>
                </div>
              )}

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Content</p>
                <div className="prose prose-sm max-w-none p-4 bg-gray-50 dark:bg-gray-800 rounded-lg max-h-96 overflow-y-auto">
                  {selectedPost.content}
                </div>
              </div>

              {selectedPost.seoTitle && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">SEO</p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Title</p>
                      <p className="text-sm">{selectedPost.seoTitle}</p>
                    </div>
                    {selectedPost.seoDescription && (
                      <div>
                        <p className="text-xs text-muted-foreground">Description</p>
                        <p className="text-sm">{selectedPost.seoDescription}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t">
                {selectedPost.status === 'draft' && (
                  <Button 
                    onClick={() => {
                      handleStatusChange(selectedPost.id, 'published');
                      setSelectedPost(null);
                    }}
                    className="flex-1"
                  >
                    Publish Post
                  </Button>
                )}
                {selectedPost.status === 'published' && (
                  <Button 
                    onClick={() => {
                      handleStatusChange(selectedPost.id, 'draft');
                      setSelectedPost(null);
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Unpublish
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
