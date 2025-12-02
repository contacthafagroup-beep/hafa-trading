'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Test Page</h1>
      <Card>
        <CardContent className="p-6">
          <p className="mb-4">If you can see this, the basic page structure works.</p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Test Button
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
