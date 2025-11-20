'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save, Building, Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your application settings</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Company Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Company Name</label>
                <Input defaultValue="Hafa General Trading PLC" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tagline</label>
                <Input defaultValue="Trading Beyond Borders" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  defaultValue="Leading import and export company specializing in agricultural products, livestock, electronics, and industrial machinery."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input type="email" defaultValue="info@hafatrading.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <Input defaultValue="+251 11 XXX XXXX" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <Input defaultValue="Addis Ababa, Ethiopia" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Website</label>
                <Input defaultValue="https://hafatrading.com" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">SMTP Host</label>
                <Input defaultValue="smtp.gmail.com" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">SMTP Port</label>
                  <Input defaultValue="587" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">SMTP User</label>
                  <Input type="email" defaultValue="your-email@gmail.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">SMTP Password</label>
                <Input type="password" placeholder="••••••••" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start">
                <Save className="mr-2 h-5 w-5" />
                Save All Changes
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Reset to Defaults
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version</span>
                <span className="font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Database</span>
                <span className="font-medium">Firestore</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Storage</span>
                <span className="font-medium">Firebase</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Hosting</span>
                <span className="font-medium">Firebase</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-2">Facebook</label>
                <Input placeholder="facebook.com/hafatrading" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Twitter</label>
                <Input placeholder="twitter.com/hafatrading" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">LinkedIn</label>
                <Input placeholder="linkedin.com/company/hafatrading" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Instagram</label>
                <Input placeholder="instagram.com/hafatrading" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
