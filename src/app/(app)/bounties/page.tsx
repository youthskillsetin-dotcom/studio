
import { getBounties } from '@/lib/data';
import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Award, ArrowRight, Code, Brush, BarChart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const tagIcons: { [key: string]: LucideIcon } = {
    'Design': Brush,
    'Data': BarChart,
    'Coding': Code,
}

export default async function BountiesPage() {
  const bounties = await getBounties();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
         <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <Award className="w-10 h-10 text-primary" />
            <div>
                 <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">Bounty Board</h1>
                 <p className="text-muted-foreground text-lg">Apply your skills to real-world challenges and earn rewards.</p>
            </div>
        </div>
      </div>

      <div className="space-y-6">
        {bounties.length > 0 ? (
          bounties.map((bounty) => {
            const TagIcon = tagIcons[bounty.tags[0]] || Award;
            return (
                 <Card key={bounty.id} className="hover:bg-muted/50 transition-colors shadow-sm rounded-2xl">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-lg font-bold font-headline line-clamp-2">{bounty.title}</CardTitle>
                            <Badge className="text-sm shrink-0">{bounty.reward}</Badge>
                        </div>
                        <CardDescription className="text-sm flex items-center gap-4 pt-1">
                            <span>By {bounty.author_name}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm line-clamp-2">{bounty.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                         <div className="flex flex-wrap gap-2">
                            {bounty.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="text-xs font-medium">
                                    {tagIcons[tag] && React.createElement(tagIcons[tag], { className: 'w-3 h-3 mr-1' })}
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                         <Button variant="outline" size="sm">
                            View Details <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </CardFooter>
                 </Card>
            )
          })
        ) : (
          <Card className="text-center py-16">
             <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <CardHeader>
              <CardTitle className="font-headline text-2xl">The Bounty Board is Empty</CardTitle>
              <CardDescription>
                No challenges have been posted yet. Check back soon for new opportunities!
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}
