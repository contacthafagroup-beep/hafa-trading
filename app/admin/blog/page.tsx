'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Plus, Search, Eye, Edit, Trash2, Loader2, BookOpen, TrendingUp,
  Calendar, User, Globe, Package, Ship, Leaf, Award, Newspaper, Sparkles, Video, Play
} from 'lucide-react';
import Link from 'next/link';
import { 
  getAllBlogPosts, 
  deleteBlogPost, 
  updateBlogPost,
  createBlogPost,
  generateSlug,
  formatBlogDate,
  type BlogPost 
} from '@/lib/firebase/blog';
import { auth } from '@/lib/firebase/config';
import toast from 'react-hot-toast';

const categories = [
  { name: 'All', icon: Globe, color: 'from-blue-500 to-cyan-500' },
  { name: 'Agriculture', icon: Leaf, color: 'from-green-500 to-emerald-500' },
  { name: 'Spices', icon: Package, color: 'from-orange-500 to-red-500' },
  { name: 'Logistics', icon: Ship, color: 'from-purple-500 to-pink-500' },
  { name: 'Market Trends', icon: TrendingUp, color: 'from-yellow-500 to-orange-500' },
  { name: 'Export Laws', icon: Award, color: 'from-indigo-500 to-blue-500' },
];

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [newPostDialog, setNewPostDialog] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'blog' | 'news' | 'video'>('blog');
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

  const filterPosts = () => {
    let filtered = posts;
    
    // Filter by content type (blog, news, or video)
    if (activeTab === 'news') {
      filtered = filtered.filter((post) => post.category === 'Trade News');
    } else if (activeTab === 'video') {
      filtered = filtered.filter((post) => post.category === 'Video Insights');
    } else {
      filtered = filtered.filter((post) => post.category !== 'Trade News' && post.category !== 'Video Insights');
    }
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter((post) => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredPosts(filtered);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, selectedCategory, searchTerm, activeTab]);

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
        tags: formData.tags.split(',').map((t) => t.trim()).filter((t) => t),
        author: formData.author,
        authorId: auth.currentUser?.uid || 'admin',
        status: formData.status
      });
      const message = formData.status === 'published' ? 'Blog post published successfully!' : 'Blog post saved as draft successfully!';
      toast.success(message);
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
      loadPosts();
    } catch (error) {
      console.error('Error creating blog post:', error);
      toast.error('Failed to create blog post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
  const publishedPosts = posts.filter((p) => p.status === 'published');
  const draftPosts = posts.filter((p) => p.status === 'draft');
  const newsPosts = posts.filter((p) => p.category === 'Trade News');
  const videoPosts = posts.filter((p) => p.category === 'Video Insights');
  const blogPosts = posts.filter((p) => p.category !== 'Trade News' && p.category !== 'Video Insights');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Content Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Manage blog posts, trade news, and video insights</p>
          </div>
          
          <Button 
            onClick={() => {
              setFormData({
                ...formData,
                category: activeTab === 'news' ? 'Trade News' : activeTab === 'video' ? 'Video Insights' : ''
              });
              setNewPostDialog(true);
            }}
            className={`${
              activeTab === 'video' 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                : activeTab === 'news'
                ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
            } text-white`}
          >
            <Plus className="mr-2 h-5 w-5" />
            New {activeTab === 'news' ? 'News' : activeTab === 'video' ? 'Video' : 'Post'}
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border border-white/20 rounded-xl p-2 w-fit">
          <Button
            variant={activeTab === 'blog' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('blog')}
            className={activeTab === 'blog' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : ''}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Blog Posts
          </Button>
          <Button
            variant={activeTab === 'news' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('news')}
            className={activeTab === 'news' ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white' : ''}
          >
            <Newspaper className="mr-2 h-4 w-4" />
            Trade News
          </Button>
          <Button
            variant={activeTab === 'video' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('video')}
            className={activeTab === 'video' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : ''}
          >
            <Video className="mr-2 h-4 w-4" />
            Video Insights
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
        {[
          { label: 'Blog Posts', value: blogPosts.length, icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
          { label: 'Trade News', value: newsPosts.length, icon: Newspaper, color: 'from-orange-500 to-red-500' },
          { label: 'Video Insights', value: videoPosts.length, icon: Video, color: 'from-purple-500 to-pink-500' },
          { label: 'Published', value: publishedPosts.length, icon: Globe, color: 'from-green-500 to-emerald-500' },
          { label: 'Drafts', value: draftPosts.length, icon: Edit, color: 'from-yellow-500 to-orange-500' },
          { label: 'Total Views', value: totalViews, icon: Eye, color: 'from-indigo-500 to-purple-500' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                      <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.value}
                      </p>
                    </div>
                    <Icon className={`w-12 h-12 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder={`Search ${activeTab === 'news' ? 'news' : activeTab === 'video' ? 'videos' : 'posts'}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20"
            />
          </div>
        </div>
        
        {activeTab === 'blog' && (
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.name)}
                className={selectedCategory === category.name ? `bg-gradient-to-r ${category.color} text-white` : ''}
                size="sm"
              >
                {category.name}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Content Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          {activeTab === 'news' ? (
            <>
              <Newspaper className="w-6 h-6 text-orange-600" />
              International Trade News
            </>
          ) : activeTab === 'video' ? (
            <>
              <Video className="w-6 h-6 text-purple-600" />
              Video Insights
            </>
          ) : (
            <>
              <BookOpen className="w-6 h-6 text-blue-600" />
              Blog Posts
            </>
          )}
        </h2>
        <Badge variant="outline" className="text-sm">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'item' : 'items'}
        </Badge>
      </div>

      {/* Posts/News List */}
      <div className="grid gap-4">
        {filteredPosts.length === 0 ? (
          <Card className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20">
            <CardContent className="p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                {activeTab === 'news' ? (
                  <>
                    <Newspaper className="w-16 h-16 text-gray-400" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No trade news yet</h3>
                      <p className="text-gray-600 dark:text-gray-400">Create your first trade news article to get started</p>
                    </div>
                  </>
                ) : activeTab === 'video' ? (
                  <>
                    <Video className="w-16 h-16 text-gray-400" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No video insights yet</h3>
                      <p className="text-gray-600 dark:text-gray-400">Create your first video insight to get started</p>
                    </div>
                  </>
                ) : (
                  <>
                    <BookOpen className="w-16 h-16 text-gray-400" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No blog posts yet</h3>
                      <p className="text-gray-600 dark:text-gray-400">Create your first blog post to get started</p>
                    </div>
                  </>
                )}
                <Button 
                  onClick={() => {
                    setFormData({
                      ...formData,
                      category: activeTab === 'news' ? 'Trade News' : activeTab === 'video' ? 'Video Insights' : ''
                    });
                    setNewPostDialog(true);
                  }}
                  className={`${
                    activeTab === 'video' 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                      : activeTab === 'news'
                      ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                  } text-white`}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create {activeTab === 'news' ? 'News' : activeTab === 'video' ? 'Video' : 'Post'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border-white/20 hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {post.category === 'Trade News' && (
                        <Sparkles className="w-5 h-5 text-orange-600" />
                      )}
                      {post.category === 'Video Insights' && (
                        <Play className="w-5 h-5 text-purple-600" />
                      )}
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{post.title}</h3>
                      <Badge className={`bg-gradient-to-r ${
                        post.category === 'Trade News' 
                          ? 'from-orange-500 to-red-500' 
                          : post.category === 'Video Insights'
                          ? 'from-purple-500 to-pink-500'
                          : categories.find(c => c.name === post.category)?.color || 'from-gray-500 to-gray-600'
                      } text-white border-0`}>
                        {post.category}
                      </Badge>
                      <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                        {post.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatBlogDate(post.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.views || 0} views
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link href={`/blog/${post.slug}`} target="_blank">
                      <Button variant="outline" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleStatusChange(post.id, post.status === 'published' ? 'draft' : 'published')}
                    >
                      {post.status === 'published' ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleDelete(post.id, post.title)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          ))
        )}
      </div>

      {/* Create Post/News Dialog */}
      <Dialog open={newPostDialog} onOpenChange={setNewPostDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {activeTab === 'news' ? (
                <>
                  <Newspaper className="w-5 h-5 text-orange-600" />
                  Create New Trade News
                </>
              ) : activeTab === 'video' ? (
                <>
                  <Video className="w-5 h-5 text-purple-600" />
                  Create New Video Insight
                </>
              ) : (
                <>
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Create New Blog Post
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreatePost} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Excerpt</label>
              <Input
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={8}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3"
                required
              />
            </div>
            {activeTab === 'blog' && (
              <div>
                <label className="text-sm font-medium">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3"
                  required
                >
                  <option value="">Select category</option>
                  {categories.filter(c => c.name !== 'All').map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
            )}
            {activeTab === 'news' && (
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-medium">This will be published as Trade News</span>
                </div>
              </div>
            )}
            {activeTab === 'video' && (
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-2 text-purple-800 dark:text-purple-200">
                  <Play className="w-5 h-5" />
                  <span className="font-medium">This will be published as Video Insight</span>
                </div>
                <p className="text-sm text-purple-700 dark:text-purple-300 mt-2">
                  Add a video URL in the Featured Image field (YouTube, Vimeo, etc.)
                </p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium">Tags (comma separated)</label>
              <Input
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="export, trade, logistics"
              />
            </div>
            <div>
              <label className="text-sm font-medium">
                {activeTab === 'video' ? 'Video URL (YouTube, Vimeo, etc.)' : 'Featured Image URL'}
              </label>
              <Input
                value={formData.featuredImage}
                onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                placeholder={activeTab === 'video' ? 'https://youtube.com/watch?v=...' : 'https://...'}
              />
              {activeTab === 'video' && (
                <p className="text-xs text-gray-500 mt-1">
                  Paste the full video URL from YouTube, Vimeo, or other video platforms
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as BlogPost['status'] })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setNewPostDialog(false)} className="flex-1">
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={saving} 
                className={`flex-1 ${activeTab === 'news' ? 'bg-gradient-to-r from-orange-600 to-red-600' : 'bg-gradient-to-r from-blue-600 to-purple-600'}`}
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : `Create ${activeTab === 'news' ? 'News' : 'Post'}`}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
