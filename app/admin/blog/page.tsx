'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Plus, Search, Eye, Edit, Trash2, FileText, Loader2, BookOpen, TrendingUp,
  Calendar, User, Clock, Tag, Image, Video, File, Check, X,
  BarChart3, Globe, Package, Plane, Ship, Leaf, Award, Filter,
  ArrowUp, ArrowDown, Sparkles, Zap, Target
} from 'lucide-react';
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

const categories = [
  { name: 'All', icon: Globe, color: 'from-blue-500 to-cyan-500' },
  { name: 'Agriculture', icon: Leaf, color: 'from-green-500 to-emerald-500' },
  { name: 'Spices', icon: Package, color: 'from-orange-500 to-red-500' },
  { name: 'Logistics', icon: Ship, color: 'from-purple-500 to-pink-500' },
  { name: 'Market Trends', icon: TrendingUp, color: 'from-yellow-500 to-orange-500' },
  { name: 'Export Laws', icon: Award, color: 'from-indigo-500 to-blue-500' },
];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
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

  useEffect(() => {
    filterPosts();
  }, [posts, selectedCategory, searchTerm]);

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
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredPosts(filtered);
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

  const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
  const publishedPosts = posts.filter(p => p.status === 'published');
  const draftPosts = posts.filter(p => p.status === 'draft');

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-6">
      {/* Header with Floating Animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <motion.h1 
              className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2"
              animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Blog Management
            </motion.h1>
            <p className="text-gray-600 dark:text-gray-400">Create and manage export insights</p>
          </div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={() => setNewPostDialog(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="mr-2 h-5 w-5" />
              New Post
              <Sparkles className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Premium Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          { 
            title: 'Total Posts', 
            value: posts.length, 
            icon: BookOpen, 
            color: 'from-blue-500 to-cyan-500',
            trend: '+12%',
            trendUp: true
          },
          { 
            title: 'Published', 
            value: publishedPosts.length, 
            icon: Check, 
            color: 'from-green-500 to-emerald-500',
            trend: '+8%',
            trendUp: true
          },
          { 
            title: 'Drafts', 
            value: draftPosts.length, 
            icon: Edit, 
            color: 'from-yellow-500 to-orange-500',
            trend: '-3%',
            trendUp: false
          },
          { 
            title: 'Total Views', 
            value: totalViews.toLocaleString(), 
            icon: TrendingUp, 
            color: 'from-purple-500 to-pink-500',
            trend: '+24%',
            trendUp: true
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="relative backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-all overflow-hidden group">
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge className={`${stat.trendUp ? 'bg-green-500' : 'bg-red-500'} text-white border-0`}>
                      {stat.trendUp ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                      {stat.trend}
                    </Badge>
                  </div>
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                    className={`text-3xl font-bold mb-2 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}
                  >
                    {stat.value}
                  </motion.div>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.title}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Search and Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                placeholder="Search by title, category, author, or content..." 
                className="pl-12 bg-white/50 dark:bg-gray-800/50 border-white/20 focus-visible:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => {
                const Icon = category.icon;
                const isSelected = selectedCategory === category.name;
                
                return (
                  <motion.button
                    key={category.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all
                      ${isSelected 
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg` 
                        : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Posts Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="h-12 w-12 text-blue-600" />
            </motion.div>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div className="relative backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl overflow-hidden border border-white/20 shadow-lg hover:shadow-2xl transition-all h-full">
                  {/* Featured Image */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900">
                    {post.featuredImage ? (
                      <img 
                        src={post.featuredImage} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-16 h-16 text-blue-400/50" />
                      </div>
                    )}
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className={`
                        ${post.status === 'published' 
                          ? 'bg-green-500 hover:bg-green-600' 
                          : 'bg-yellow-500 hover:bg-yellow-600'
                        } text-white border-0 shadow-lg
                      `}>
                        {post.status === 'published' ? (
                          <><Check className="w-3 h-3 mr-1" /> Published</>
                        ) : (
                          <><Edit className="w-3 h-3 mr-1" /> Draft</>
                        )}
                      </Badge>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge className={`
                        bg-gradient-to-r ${categories.find(c => c.name === post.category)?.color || 'from-gray-500 to-gray-600'} 
                        text-white border-0 shadow-lg
                      `}>
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 3).map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{post.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                    
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {post.views?.toLocaleString() || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatBlogDate(post.createdAt)}
                      </span>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setSelectedPost(post)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      
                      {post.status === 'draft' ? (
                        <Button
                          size="sm"
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                          onClick={() => handleStatusChange(post.id, 'published')}
                        >
                          <Zap className="w-4 h-4 mr-1" />
                          Publish
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleStatusChange(post.id, 'draft')}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Unpublish
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                        onClick={() => handleDelete(post.id, post.title)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
            className="text-center py-20"
          >
            <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-3xl p-12 border border-white/20 shadow-xl max-w-md mx-auto">
              <BookOpen className="w-20 h-20 mx-auto mb-6 text-gray-400" />
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">No Posts Found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm || selectedCategory !== 'All' 
                  ? 'Try adjusting your search or filter criteria' 
                  : 'Create your first blog post to get started'
                }
              </p>
              {!searchTerm && selectedCategory === 'All' && (
                <Button 
                  onClick={() => setNewPostDialog(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Create First Post
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* New Post Dialog */}
      <Dialog open={newPostDialog} onOpenChange={setNewPostDialog}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Create New Blog Post
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleCreatePost} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Title *
              </label>
              <Input 
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter an engaging title..."
                className="text-lg font-medium"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Excerpt *
              </label>
              <Input 
                required
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief description that appears in previews..."
              />
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Featured Image URL
              </label>
              <div className="flex gap-2">
                <Input 
                  value={formData.featuredImage}
                  onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1"
                />
                {formData.featuredImage && (
                  <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-blue-500">
                    <img 
                      src={formData.featuredImage} 
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Media Upload Section */}
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-gray-800/50 dark:to-gray-900/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Image className="w-5 h-5 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Upload Media Files
                  </label>
                  <p className="text-xs text-gray-500">
                    Images, videos, documents (PDF, DOC, etc.)
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <Input 
                  type="file"
                  multiple
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="flex-1"
                />
                {uploading && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="h-5 w-5 text-blue-600" />
                  </motion.div>
                )}
              </div>

              {mediaFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Uploaded Files ({mediaFiles.length}):
                  </p>
                  <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                    {mediaFiles.map((file, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {file.type === 'image' && <Image className="h-5 w-5 text-blue-600 flex-shrink-0" />}
                          {file.type === 'video' && <Video className="h-5 w-5 text-purple-600 flex-shrink-0" />}
                          {file.type !== 'image' && file.type !== 'video' && <File className="h-5 w-5 text-gray-600 flex-shrink-0" />}
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
                            <Plus className="h-4 w-4" />
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
                            <Target className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveMedia(index)}
                            title="Remove"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Content *
              </label>
              <textarea 
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your blog post content here... (Markdown supported)"
                rows={12}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Tip: Use markdown for formatting. Uploaded media links can be inserted above.
              </p>
            </div>

            {/* Category, Author, Tags */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full h-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select category</option>
                  {categories.filter(c => c.name !== 'All').map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Author *
                </label>
                <Input 
                  required
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Author name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Status *
                </label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as BlogPost['status'] })}
                  className="w-full h-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Tags
              </label>
              <Input 
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="coffee, export, ethiopia, trade (comma-separated)"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate tags with commas for better searchability
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end pt-6 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
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
                }}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={saving}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
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
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Blog Post Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedPost && (
            <div className="space-y-6">
              {/* Featured Image */}
              {selectedPost.featuredImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative aspect-video rounded-xl overflow-hidden shadow-xl"
                >
                  <img 
                    src={selectedPost.featuredImage} 
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Badges on Image */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className={`
                      ${selectedPost.status === 'published' 
                        ? 'bg-green-500' 
                        : 'bg-yellow-500'
                      } text-white border-0 shadow-lg
                    `}>
                      {selectedPost.status}
                    </Badge>
                    <Badge className={`
                      bg-gradient-to-r ${categories.find(c => c.name === selectedPost.category)?.color || 'from-gray-500 to-gray-600'} 
                      text-white border-0 shadow-lg
                    `}>
                      {selectedPost.category}
                    </Badge>
                  </div>
                </motion.div>
              )}

              {/* Title and Meta */}
              <div>
                <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  {selectedPost.title}
                </h3>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {selectedPost.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatBlogDate(selectedPost.createdAt)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    {selectedPost.views?.toLocaleString() || 0} views
                  </span>
                  <span className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    {selectedPost.likes?.toLocaleString() || 0} likes
                  </span>
                </div>
              </div>

              {/* Tags */}
              {selectedPost.tags && selectedPost.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-sm">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Excerpt */}
              {selectedPost.excerpt && (
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border border-blue-200 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Excerpt
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    {selectedPost.excerpt}
                  </p>
                </div>
              )}

              {/* Content */}
              <div className="border-t pt-6">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Full Content
                </p>
                <div className="prose prose-sm max-w-none p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap font-sans text-gray-800 dark:text-gray-200">
                    {selectedPost.content}
                  </pre>
                </div>
              </div>

              {/* SEO Info */}
              {(selectedPost.seoTitle || selectedPost.seoDescription) && (
                <div className="border-t pt-6">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    SEO Information
                  </p>
                  <div className="space-y-3 p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-green-200 dark:border-gray-700">
                    {selectedPost.seoTitle && (
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">SEO Title</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {selectedPost.seoTitle}
                        </p>
                      </div>
                    )}
                    {selectedPost.seoDescription && (
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">SEO Description</p>
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                          {selectedPost.seoDescription}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-6 border-t">
                <Link href={`/blog/${selectedPost.slug}`} target="_blank" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <Eye className="mr-2 h-4 w-4" />
                    View on Website
                  </Button>
                </Link>
                
                {selectedPost.status === 'draft' ? (
                  <Button 
                    onClick={() => {
                      handleStatusChange(selectedPost.id, 'published');
                      setSelectedPost(null);
                    }}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Publish Post
                  </Button>
                ) : (
                  <Button 
                    onClick={() => {
                      handleStatusChange(selectedPost.id, 'draft');
                      setSelectedPost(null);
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Unpublish
                  </Button>
                )}
                
                <Button
                  onClick={() => {
                    handleDelete(selectedPost.id, selectedPost.title);
                    setSelectedPost(null);
                  }}
                  variant="outline"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
