
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Save, Loader2 } from 'lucide-react';

interface VideoLinkEditorProps {
  subtopicId: string;
  initialUrl: string;
}

export function VideoLinkEditor({ subtopicId, initialUrl }: VideoLinkEditorProps) {
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsLoading(true);
    
    // In a real application, this would be an API call to a server action
    // that updates the database or the JSON file.
    // For this demonstration, we'll simulate the save process.
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(`Simulated save for subtopic ${subtopicId}: ${url}`);

    toast({
      title: "Video Link Updated",
      description: "The video URL has been saved successfully. (Simulated)",
    });

    setIsLoading(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter new video URL"
        className="max-w-xs"
      />
      <Button onClick={handleSave} disabled={isLoading || url === initialUrl}>
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Save className="w-4 h-4" />
        )}
        <span className="sr-only">Save</span>
      </Button>
    </div>
  );
}
