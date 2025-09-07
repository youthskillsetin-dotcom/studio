
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { getAllUsers, getUserProfile } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { UserCog } from 'lucide-react';
import { cn } from '@/lib/utils';

export default async function AdminUsersPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const currentUserProfile = await getUserProfile(supabase);

  // Protect the route: only admins can access
  if (currentUserProfile?.role !== 'admin') {
    notFound();
  }

  const users = await getAllUsers(supabase);

  return (
    <div className="max-w-7xl mx-auto">
       <div className="flex items-center gap-4 mb-6">
        <UserCog className="w-8 h-8" />
        <div>
            <h1 className="text-3xl font-bold font-headline">User Management</h1>
            <p className="text-muted-foreground">View and manage all registered users.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            A list of all users in the system. Found {users.length} users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? 'destructive' : 'secondary'} className={cn(user.role === 'premium' && 'bg-accent/20 text-accent-foreground')}>
                        {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(new Date(user.created_at), 'PPP')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
