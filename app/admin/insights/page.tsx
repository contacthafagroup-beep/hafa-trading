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
  translations?: {
    [key: string]: {
      title: string;
      summary: string;
      content: string;
    };
  };
  autoTranslate?: boolean;
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
    visible: true,
    autoTranslate: true,
    translations: {
      amharic: { title: '', summary: '', content: '' },
      arabic: { title: '', summary: '', content: '' },
      french: { title: '', summary: '', content: '' },
      chinese: { title: '', summary: '', content: '' }
    }
  });
  const [showTranslations, setShowTranslations] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [isDemo, setIsDemo] = useState(false);

  // Check if user is admin or show demo mode
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        // No user logged in - show demo mode
        setIsDemo(true);
      } else if (user.email !== 'admin@hafatrading.com') {
        router.push('/');
      }
    }
  }, [user, authLoading, router]);

  // Fetch insights or use demo data
  useEffect(() => {
    if (isDemo) {
      // Demo mode - show sample insights
      setInsights([
        {
          id: '1',
          title: 'UAE Increases Demand for Fresh Rosemary & Herbs',
          summary: 'Export opportunities rise for East African suppliers.',
          category: 'Herbs & Spices',
          date: '2025-03-22',
          content: 'Sample content...',
          featured: true,
          visible: true
        },
        {
          id: '2',
          title: 'Saudi Arabia Introduces New Quality Requirements',
          summary: 'Updated regulations for agricultural exports.',
          category: 'Regulations',
          date: '2025-03-20',
          content: 'Sample content...',
          featured: false,
          visible: true
        }
      ]);
      return;
    }

    try {
      if (!db) {
        console.log('Firebase not initialized, using demo mode');
        setIsDemo(true);
        return;
      }
      const insightsRef = collection(db, 'insights');
      const q = query(insightsRef, orderBy('date', 'desc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const insightsData: Insight[] = [];
        snapshot.forEach((doc) => {
          insightsData.push({ id: doc.id, ...doc.data() } as Insight);
        });
        setInsights(insightsData);
      }, (error) => {
        console.log('Firebase error, using demo mode');
        setIsDemo(true);
      });

      return () => unsubscribe();
    } catch (error) {
      console.log('Firebase not configured, using demo mode');
      setIsDemo(true);
    }
  }, [isDemo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isDemo) {
      toast.error('Demo mode - Firebase not configured. Please set up Firebase to save insights.');
      return;
    }

    try {
      let dataToSave = { ...formData };

      // If auto-translate is enabled, generate translations
      if (formData.autoTranslate) {
        toast.loading('Generating translations...');
        
        // Import translator dynamically
        const { translateInsight, languages } = await import('@/lib/translator');
        
        const translations: any = {};
        
        // Translate to each language
        for (const [langKey, langCode] of Object.entries(languages)) {
          if (langKey !== 'english') {
            try {
              const translated = await translateInsight(
                formData.title,
                formData.summary,
                formData.content,
                langCode
              );
              translations[langKey] = translated;
            } catch (error) {
              console.error(`Translation error for ${langKey}:`, error);
            }
          }
        }
        
        dataToSave.translations = translations;
      }

      if (!db) {
        toast.error('Firebase not initialized');
        return;
      }

      if (editingId) {
        await updateDoc(doc(db, 'insights', editingId), {
          ...dataToSave,
          updatedAt: serverTimestamp()
        });
        toast.success('Insight updated successfully with translations!');
      } else {
        await addDoc(collection(db, 'insights'), {
          ...dataToSave,
          createdAt: serverTimestamp()
        });
        toast.success('Insight added successfully with translations!');
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
      visible: insight.visible,
      autoTranslate: insight.autoTranslate || true,
      translations: {
        amharic: insight.translations?.amharic || { title: '', summary: '', content: '' },
        arabic: insight.translations?.arabic || { title: '', summary: '', content: '' },
        french: insight.translations?.french || { title: '', summary: '', content: '' },
        chinese: insight.translations?.chinese || { title: '', summary: '', content: '' }
      }
    });
    setEditingId(insight.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this insight?')) {
      try {
        if (!db) {
          toast.error('Firebase not initialized');
          return;
        }
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
      if (!db) {
        toast.error('Firebase not initialized');
        return;
      }
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
      if (!db) {
        toast.error('Firebase not initialized');
        return;
      }
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
      visible: true,
      autoTranslate: true,
      translations: {
        amharic: { title: '', summary: '', content: '' },
        arabic: { title: '', summary: '', content: '' },
        french: { title: '', summary: '', content: '' },
        chinese: { title: '', summary: '', content: '' }
      }
    });
    setEditingId(null);
    setIsEditing(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-4"
          >
            ⏳
          </motion.div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
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
          
          {isDemo && (
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>⚠️ Demo Mode:</strong> Firebase is not configured. You can view the interface but cannot save changes. 
                Please configure Firebase to enable full functionality.
              </p>
            </div>
          )}
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

                {/* Translation Options */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <Label className="text-base font-semibold">🌐 Multi-Language Support</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowTranslations(!showTranslations)}
                    >
                      {showTranslations ? 'Hide' : 'Show'} Translations
                    </Button>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer mb-4">
                    <input
                      type="checkbox"
                      checked={formData.autoTranslate}
                      onChange={(e) => setFormData({ ...formData, autoTranslate: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">
                      🤖 Auto-translate to all languages (uses LibreTranslate API)
                    </span>
                  </label>

                  {showTranslations && !formData.autoTranslate && (
                    <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-3">
                        Manually provide translations for each language (leave empty to use auto-translation)
                      </p>

                      {/* Amharic */}
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">አማርኛ (Amharic)</Label>
                        <Input
                          placeholder="Title in Amharic"
                          value={formData.translations.amharic.title}
                          onChange={(e) => setFormData({
                            ...formData,
                            translations: {
                              ...formData.translations,
                              amharic: { ...formData.translations.amharic, title: e.target.value }
                            }
                          })}
                        />
                        <Textarea
                          placeholder="Content in Amharic"
                          value={formData.translations.amharic.content}
                          onChange={(e) => setFormData({
                            ...formData,
                            translations: {
                              ...formData.translations,
                              amharic: { ...formData.translations.amharic, content: e.target.value }
                            }
                          })}
                          rows={3}
                        />
                      </div>

                      {/* Arabic */}
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">العربية (Arabic)</Label>
                        <Input
                          placeholder="Title in Arabic"
                          value={formData.translations.arabic.title}
                          onChange={(e) => setFormData({
                            ...formData,
                            translations: {
                              ...formData.translations,
                              arabic: { ...formData.translations.arabic, title: e.target.value }
                            }
                          })}
                          dir="rtl"
                        />
                        <Textarea
                          placeholder="Content in Arabic"
                          value={formData.translations.arabic.content}
                          onChange={(e) => setFormData({
                            ...formData,
                            translations: {
                              ...formData.translations,
                              arabic: { ...formData.translations.arabic, content: e.target.value }
                            }
                          })}
                          rows={3}
                          dir="rtl"
                        />
                      </div>

                      {/* French */}
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">Français (French)</Label>
                        <Input
                          placeholder="Title in French"
                          value={formData.translations.french.title}
                          onChange={(e) => setFormData({
                            ...formData,
                            translations: {
                              ...formData.translations,
                              french: { ...formData.translations.french, title: e.target.value }
                            }
                          })}
                        />
                        <Textarea
                          placeholder="Content in French"
                          value={formData.translations.french.content}
                          onChange={(e) => setFormData({
                            ...formData,
                            translations: {
                              ...formData.translations,
                              french: { ...formData.translations.french, content: e.target.value }
                            }
                          })}
                          rows={3}
                        />
                      </div>

                      {/* Chinese */}
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">中文 (Chinese)</Label>
                        <Input
                          placeholder="Title in Chinese"
                          value={formData.translations.chinese.title}
                          onChange={(e) => setFormData({
                            ...formData,
                            translations: {
                              ...formData.translations,
                              chinese: { ...formData.translations.chinese, title: e.target.value }
                            }
                          })}
                        />
                        <Textarea
                          placeholder="Content in Chinese"
                          value={formData.translations.chinese.content}
                          onChange={(e) => setFormData({
                            ...formData,
                            translations: {
                              ...formData.translations,
                              chinese: { ...formData.translations.chinese, content: e.target.value }
                            }
                          })}
                          rows={3}
                        />
                      </div>
                    </div>
                  )}
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
