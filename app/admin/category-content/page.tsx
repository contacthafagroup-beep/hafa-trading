'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Save, Video, MapPin, Award, Image, FileText, Loader2 } from 'lucide-react';
import { saveCategoryContent, getCategoryContent } from '@/lib/firebase/category-content';
import { useToast } from '@/components/ui/use-toast';

const categories = [
  { id: 'fresh-vegetables', name: 'Fresh Vegetables' },
  { id: 'fresh-fruits', name: 'Fresh Fruits' },
  { id: 'grains-legumes', name: 'Grains & Legumes' },
  { id: 'herbs-spices', name: 'Herbs & Spices' },
  { id: 'livestock-meat', name: 'Livestock & Meat' },
  { id: 'specialty-products', name: 'Specialty Products' }
];

export default function CategoryContentManagement() {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('fresh-vegetables');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [videos, setVideos] = useState([
    { title: '', desc: '', thumbnail: '', videoUrl: '' }
  ]);
  const [originRegions, setOriginRegions] = useState([
    { name: '', product: '', coordinates: '', mapUrl: '' }
  ]);
  const [certifications, setCertifications] = useState([
    { icon: '', name: '', desc: '' }
  ]);
  const [carouselImages, setCarouselImages] = useState([
    { title: '', emoji: '' }
  ]);
  const [downloadables, setDownloadables] = useState([
    { icon: '', name: '', size: '' }
  ]);

  // Load category content when category changes
  useEffect(() => {
    loadCategoryContent();
  }, [selectedCategory]);

  const loadCategoryContent = async () => {
    setLoading(true);
    try {
      const content = await getCategoryContent(selectedCategory);
      if (content) {
        setVideos(content.videos || [{ title: '', desc: '', thumbnail: '', videoUrl: '' }]);
        setOriginRegions(content.originRegions || [{ name: '', product: '', coordinates: '', mapUrl: '' }]);
        setCertifications(content.certifications || [{ icon: '', name: '', desc: '' }]);
        setCarouselImages(content.carouselImages || [{ title: '', emoji: '' }]);
        setDownloadables(content.downloadables || [{ icon: '', name: '', size: '' }]);
      } else {
        // Reset to defaults if no content exists
        setVideos([{ title: '', desc: '', thumbnail: '', videoUrl: '' }]);
        setOriginRegions([{ name: '', product: '', coordinates: '', mapUrl: '' }]);
        setCertifications([{ icon: '', name: '', desc: '' }]);
        setCarouselImages([{ title: '', emoji: '' }]);
        setDownloadables([{ icon: '', name: '', size: '' }]);
      }
    } catch (error) {
      console.error('Error loading category content:', error);
      toast({
        title: 'Error',
        description: 'Failed to load category content',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const addVideo = () => {
    setVideos([...videos, { title: '', desc: '', thumbnail: '', videoUrl: '' }]);
  };

  const removeVideo = (index: number) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  const addOriginRegion = () => {
    setOriginRegions([...originRegions, { name: '', product: '', coordinates: '', mapUrl: '' }]);
  };

  const removeOriginRegion = (index: number) => {
    setOriginRegions(originRegions.filter((_, i) => i !== index));
  };

  const addCertification = () => {
    setCertifications([...certifications, { icon: '', name: '', desc: '' }]);
  };

  const removeCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const addCarouselImage = () => {
    setCarouselImages([...carouselImages, { title: '', emoji: '' }]);
  };

  const removeCarouselImage = (index: number) => {
    setCarouselImages(carouselImages.filter((_, i) => i !== index));
  };

  const addDownloadable = () => {
    setDownloadables([...downloadables, { icon: '', name: '', size: '' }]);
  };

  const removeDownloadable = (index: number) => {
    setDownloadables(downloadables.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const categoryData = {
        category: selectedCategory,
        videos: videos.filter(v => v.title || v.videoUrl),
        originRegions: originRegions.filter(r => r.name || r.product),
        certifications: certifications.filter(c => c.name),
        carouselImages: carouselImages.filter(i => i.title || i.emoji),
        downloadables: downloadables.filter(d => d.name)
      };
      
      await saveCategoryContent(categoryData);
      
      toast({
        title: 'Success',
        description: 'Category content saved successfully!',
      });
    } catch (error) {
      console.error('Error saving category content:', error);
      toast({
        title: 'Error',
        description: 'Failed to save category content',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Category Content Management</h1>
          <p className="text-muted-foreground">Manage videos, maps, certifications, and more for each product category</p>
        </div>
        <Button onClick={handleSave} size="lg" disabled={saving || loading}>
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Category</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {loading ? (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Loading category content...</span>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="videos">
            <Video className="mr-2 h-4 w-4" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="maps">
            <MapPin className="mr-2 h-4 w-4" />
            Origin Maps
          </TabsTrigger>
          <TabsTrigger value="certifications">
            <Award className="mr-2 h-4 w-4" />
            Certifications
          </TabsTrigger>
          <TabsTrigger value="carousel">
            <Image className="mr-2 h-4 w-4" />
            Carousel
          </TabsTrigger>
          <TabsTrigger value="downloads">
            <FileText className="mr-2 h-4 w-4" />
            Downloads
          </TabsTrigger>
        </TabsList>

        {/* Videos Tab */}
        <TabsContent value="videos" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Process Videos</CardTitle>
                <Button onClick={addVideo} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Video
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {videos.map((video, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Video {index + 1}</h4>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeVideo(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Title</Label>
                        <Input
                          value={video.title}
                          onChange={(e) => {
                            const newVideos = [...videos];
                            newVideos[index].title = e.target.value;
                            setVideos(newVideos);
                          }}
                          placeholder="e.g., Harvesting Process"
                        />
                      </div>
                      <div>
                        <Label>Thumbnail Emoji</Label>
                        <Input
                          value={video.thumbnail}
                          onChange={(e) => {
                            const newVideos = [...videos];
                            newVideos[index].thumbnail = e.target.value;
                            setVideos(newVideos);
                          }}
                          placeholder="e.g., 🎥"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label>Description</Label>
                        <Input
                          value={video.desc}
                          onChange={(e) => {
                            const newVideos = [...videos];
                            newVideos[index].desc = e.target.value;
                            setVideos(newVideos);
                          }}
                          placeholder="Brief description"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label>Video URL (YouTube/Vimeo embed)</Label>
                        <Input
                          value={video.videoUrl}
                          onChange={(e) => {
                            const newVideos = [...videos];
                            newVideos[index].videoUrl = e.target.value;
                            setVideos(newVideos);
                          }}
                          placeholder="https://www.youtube.com/embed/..."
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Origin Maps Tab */}
        <TabsContent value="maps" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Origin Regions</CardTitle>
                <Button onClick={addOriginRegion} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Region
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {originRegions.map((region, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Region {index + 1}</h4>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeOriginRegion(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Region Name</Label>
                        <Input
                          value={region.name}
                          onChange={(e) => {
                            const newRegions = [...originRegions];
                            newRegions[index].name = e.target.value;
                            setOriginRegions(newRegions);
                          }}
                          placeholder="e.g., Wolaita"
                        />
                      </div>
                      <div>
                        <Label>Product</Label>
                        <Input
                          value={region.product}
                          onChange={(e) => {
                            const newRegions = [...originRegions];
                            newRegions[index].product = e.target.value;
                            setOriginRegions(newRegions);
                          }}
                          placeholder="e.g., Mangoes"
                        />
                      </div>
                      <div>
                        <Label>Coordinates</Label>
                        <Input
                          value={region.coordinates}
                          onChange={(e) => {
                            const newRegions = [...originRegions];
                            newRegions[index].coordinates = e.target.value;
                            setOriginRegions(newRegions);
                          }}
                          placeholder="e.g., 6.8°N, 37.8°E"
                        />
                      </div>
                      <div>
                        <Label>Google Maps Embed URL</Label>
                        <Input
                          value={region.mapUrl}
                          onChange={(e) => {
                            const newRegions = [...originRegions];
                            newRegions[index].mapUrl = e.target.value;
                            setOriginRegions(newRegions);
                          }}
                          placeholder="https://www.google.com/maps/embed?pb=..."
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Certifications Tab */}
        <TabsContent value="certifications" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Certifications & Standards</CardTitle>
                <Button onClick={addCertification} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Certification
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Certification {index + 1}</h4>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeCertification(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Icon Emoji</Label>
                        <Input
                          value={cert.icon}
                          onChange={(e) => {
                            const newCerts = [...certifications];
                            newCerts[index].icon = e.target.value;
                            setCertifications(newCerts);
                          }}
                          placeholder="e.g., 🔒"
                        />
                      </div>
                      <div>
                        <Label>Name</Label>
                        <Input
                          value={cert.name}
                          onChange={(e) => {
                            const newCerts = [...certifications];
                            newCerts[index].name = e.target.value;
                            setCertifications(newCerts);
                          }}
                          placeholder="e.g., ISO Certified"
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Input
                          value={cert.desc}
                          onChange={(e) => {
                            const newCerts = [...certifications];
                            newCerts[index].desc = e.target.value;
                            setCertifications(newCerts);
                          }}
                          placeholder="e.g., Quality management"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Carousel Tab */}
        <TabsContent value="carousel" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Photo Carousel Images</CardTitle>
                <Button onClick={addCarouselImage} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Image
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {carouselImages.map((image, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Image {index + 1}</h4>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeCarouselImage(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Title</Label>
                        <Input
                          value={image.title}
                          onChange={(e) => {
                            const newImages = [...carouselImages];
                            newImages[index].title = e.target.value;
                            setCarouselImages(newImages);
                          }}
                          placeholder="e.g., Fresh Crates"
                        />
                      </div>
                      <div>
                        <Label>Emoji</Label>
                        <Input
                          value={image.emoji}
                          onChange={(e) => {
                            const newImages = [...carouselImages];
                            newImages[index].emoji = e.target.value;
                            setCarouselImages(newImages);
                          }}
                          placeholder="e.g., 📦"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Downloads Tab */}
        <TabsContent value="downloads" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Downloadable Resources</CardTitle>
                <Button onClick={addDownloadable} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Download
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {downloadables.map((file, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">File {index + 1}</h4>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeDownloadable(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Icon Emoji</Label>
                        <Input
                          value={file.icon}
                          onChange={(e) => {
                            const newFiles = [...downloadables];
                            newFiles[index].icon = e.target.value;
                            setDownloadables(newFiles);
                          }}
                          placeholder="e.g., 📄"
                        />
                      </div>
                      <div>
                        <Label>File Name</Label>
                        <Input
                          value={file.name}
                          onChange={(e) => {
                            const newFiles = [...downloadables];
                            newFiles[index].name = e.target.value;
                            setDownloadables(newFiles);
                          }}
                          placeholder="e.g., Product Catalog PDF"
                        />
                      </div>
                      <div>
                        <Label>File Size</Label>
                        <Input
                          value={file.size}
                          onChange={(e) => {
                            const newFiles = [...downloadables];
                            newFiles[index].size = e.target.value;
                            setDownloadables(newFiles);
                          }}
                          placeholder="e.g., 2.8 MB"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      )}
    </div>
  );
}
