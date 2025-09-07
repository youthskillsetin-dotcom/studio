

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot } from 'lucide-react';
import { generateSubtopicSummary } from '@/ai/flows/generate-subtopic-summary';
import { Skeleton } from './ui/skeleton';


export async function AISummaryCard({ title, content, existingSummary }: { title: string, content: string, existingSummary?: string }) {
    
    // The component now relies solely on the pre-existing summary.
    // The live generation call has been removed to prevent API rate limit errors.
    const summaryContent = existingSummary;

    if (!summaryContent) {
        return null; // Don't render the card if there's no summary
    }
  
    return (
        <Card>
            <CardHeader className="flex-row items-center gap-2 space-y-0">
                <Bot className="w-6 h-6 text-primary" />
                <CardTitle className="font-headline">AI Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <div 
                    className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground" 
                    dangerouslySetInnerHTML={{ __html: summaryContent.replace(/\n/g, '<br />') }} 
                />
            </CardContent>
        </Card>
    )
}

export function AISummaryCardSkeleton() {
    return (
      <Card>
        <CardHeader className="flex-row items-center gap-2 space-y-0">
            <Bot className="w-6 h-6 text-primary" />
            <CardTitle className="font-headline">AI Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className='pt-4 space-y-2'>
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
                <Skeleton className="h-4 w-5/6" />
            </div>
        </CardContent>
      </Card>
    );
  }
  
