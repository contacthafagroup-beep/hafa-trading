'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/auth-context';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { Plus, Edit, Trash2, Eye, EyeOff, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Insight {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  thumbnail?: string;
  content: string;
  featured: boolean;
  visible: boolean;
}

const categories = [
  'Herbs & Spices',
  'Fresh Vegetables',
  'Cereals & Legumes',
  'Regulations',
  'Logistics',
  'Agriculture',
  'Livestock',
  'Trade News',
  'Export'
];

export default function AdminInsightsPage() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    category: 'Trade News',
    date: new Date().toISOString().split('T')[0],
    thumbnail: '',
    content: '',
    featured: false,
    visible: true
  });
  const { user } = useAuth();
  const router = useRouter();

  // Check if user is admin
  useEffect(() => {
    if (user && user.email !== 'admin@hafatrading.com') {
      router.push('/');
    }
  }, [user, router]);

  // Fetch insights
  useEffect(() => {
    const insightsRef = collection(db, 'insights');
    const q = query(insightsRef, orderBy('date', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const insightsData: Insight[] = [];
      snapshot.forEach((doc) => {
        insightsData.push({ id: doc.id, ...doc.data() } as Insight);
      });
      setInsights(insightsData);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateDoc(doc(db, 'insights', editingId), {
          ...formData,
          updatedAt: serverTimestamp()
        });
        toast.success('Insight updated successfully');
      } else {
        await addDoc(collection(db, 'insights'), {
          ...formData,
          createdAt: serverTimestamp()
        });
        toast.success('Insight added successfully');
      }

      resetForm();
    } catch (error) {
      console.error('Error saving insight:', error);
      toast.error('Failed to save insight');
    }
  };

  const handleEdit = (insight: Insight) => {
    setFormData({
      title: insight.title,
      summary: insight.summary,
      category: insight.category,
      date: insight.date,
      thumbnail: insight.thumbnail || '',
      content: insight.content,
      featured: insight.featured,
      visible: insight.visible
    });
    setEditingId(insight.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this insight?')) {
      try {
        await deleteDoc(doc(db, 'insights', id));
        toast.success('Insight deleted successfully');
      } catch (error) {
        console.error('Error deleting insight:', error);
        toast.error('Failed to delete insight');
      }
    }
  };

  const toggleVisibility = async (id: string, currentVisibility: boolean) => {
    try {
      await updateDoc(doc(db, 'insights', id), {
        visible: !currentVisibility
      });
      toast.success(`Insight ${!currentVisibility ? 'shown' : 'hidden'}`);
    } catch (error) {
      console.error('Error toggling visibility:', error);
      toast.error('Failed to update visibility');
    }
  };

  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      await updateDoc(doc(db, 'insights', id), {
        featured: !currentFeatured
      });
      toast.success(`Insight ${!currentFeatured ? 'featured' : 'unfeatured'}`);
    } catch (error) {
      console.error('Error toggling featured:', error);
      toast.error('Failed to update featured status');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      summary: '',
      category: 'Trade News',
      date: new Date().toISOString().split('T')[0],
      thumbnail: '',
      content: '',
      featured: false,
      visible: true
    });
    setEditingId(null);
    setIsEditing(false);
  };

  if (!user || user.email !== 'admin@hafatrading.com') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold mb-2">Insights Management</h1>
          <p className="text-muted-foreground">Manage industry insights and news articles</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                {isEditing ? 'Edit Insight' : 'Add New Insight'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="summary">Summary *</Label>
                  <Textarea
                    id="summary"
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    rows={2}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="thumbnail">Thumbnail URL (optional)</Label>
                  <Input
                    id="thumbnail"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <Label htmlFor="content">Full Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={8}
                    required
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Featured</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.visible}
                      onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Visible</span>
                  </label>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {isEditing ? 'Update' : 'Add'} Insight
                  </Button>
                  {isEditing && (
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* List */}
          <Card>
            <CardHeader>
              <CardTitle>All Insights ({insights.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[700px] overflow-y-auto">
                {insights.map((insight) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {insight.featured && (
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          )}
                          <h3 className="font-semibold">{insight.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{insight.summary}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 rounded-full">
                            {insight.category}
                          </span>
                          <span>{new Date(insight.date).toLocaleDateString()}</span>
                          {!insight.visible && (
                            <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full">
                              Hidden
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleVisibility(insight.id, insight.visible)}
                        >
                          {insight.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleFeatured(insight.id, insight.featured)}
                        >
                          <Star className={`w-4 h-4 ${insight.featured ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(insight)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(insight.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
