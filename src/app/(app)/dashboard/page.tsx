import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BookOpen, CheckCircle, TrendingUp } from 'lucide-react';
import { mockLessons, mockUserProgress } from '@/lib/mock-data';

const chartData = [
  { name: 'Mon', minutes: 30 },
  { name: 'Tue', minutes: 45 },
  { name: 'Wed', minutes: 60 },
  { name: 'Thu', minutes: 20 },
  { name: 'Fri', minutes: 75 },
  { name: 'Sat', minutes: 90 },
  { name: 'Sun', minutes: 40 },
];

export default function DashboardPage() {
  const completedSubtopics = mockUserProgress.filter(p => p.status === 'completed').length;
  const totalSubtopics = mockUserProgress.length;
  const overallProgress = totalSubtopics > 0 ? (completedSubtopics / totalSubtopics) * 100 : 0;
  const currentLesson = mockLessons[0];

  return (
    <div className="grid gap-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Welcome Back!</h1>
          <p className="text-muted-foreground">Let&apos;s continue your learning journey.</p>
        </div>
        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-xl">Go Premium</CardTitle>
            <CardDescription className="text-primary-foreground/80">Unlock all lessons and features.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" asChild><Link href="/dev/pay">Upgrade Now</Link></Button>
          </CardContent>
        </Card>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(overallProgress)}%</div>
            <p className="text-xs text-muted-foreground">
              {completedSubtopics} of {totalSubtopics} subtopics completed
            </p>
            <Progress value={overallProgress} className="mt-4" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
            <CheckCircle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0<span className="text-base text-muted-foreground">/{mockLessons.length}</span></div>
            <p className="text-xs text-muted-foreground">Keep up the great work!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Lesson</CardTitle>
            <BookOpen className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold font-headline truncate">{currentLesson.title}</div>
            <p className="text-xs text-muted-foreground truncate">{currentLesson.description}</p>
            <Button size="sm" className="mt-2" asChild><Link href={`/lessons/${currentLesson.id}`}>Continue</Link></Button>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Weekly Activity</CardTitle>
          <CardDescription>Your learning time in minutes for the last week.</CardDescription>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                }}
              />
              <Bar dataKey="minutes" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
