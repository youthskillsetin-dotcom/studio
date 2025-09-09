
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Save, Loader2 } from 'lucide-react';
import { updateVideoUrlAction } from './actions';
import { useRouter } from 'next/navigation';

interface VideoLinkEditorProps {
  subtopicId: string;
  initialUrl: string;
}

export function VideoLinkEditor({ subtopicId, initialUrl }: VideoLinkEditorProps) {
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSave = async () => {
    setIsLoading(true);
    
    const result = await updateVideoUrlAction({ subtopicId, newUrl: url });
    
    if (result.success) {
        toast({
            title: "Video Link Updated",
            description: "The video URL has been saved successfully.",
        });
        // Refresh the page to show the new URL
        router.refresh();
    } else {
        toast({
            variant: 'destructive',
            title: "Update Failed",
            description: result.error,
        });
    }

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
