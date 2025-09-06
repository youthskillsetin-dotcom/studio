import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';

export default function AdminImportPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
       <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Admin: Import Content</CardTitle>
          <CardDescription>Upload a JSON file to seed lessons and subtopics.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="json-file">JSON File</Label>
            <Input id="json-file" type="file" accept=".json" />
          </div>
          <div className="flex items-center space-x-2">
            <Input type="checkbox" id="overwrite" />
            <label
              htmlFor="overwrite"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Overwrite existing content
            </label>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Upload className="mr-2 h-4 w-4" /> Import Content
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
