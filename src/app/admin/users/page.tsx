
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { UserCog } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserActions } from './user-actions';

export default async function AdminUsersPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const currentUserProfile = await getUserProfile(supabase);

  // Protect the route: only admins can access
  if (currentUserProfile?.role !== 'admin') {
    notFound();
  }

  const users = await getAllUsers();

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
          {/* Table for larger screens */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell>{user.fullName || 'Not provided'}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.role === 'admin' ? 'destructive' : 'secondary'} 
                        className={cn(
                          {'bg-primary/20 text-primary border border-primary/30': user.role === 'premium'},
                          {'bg-secondary/20 text-secondary-foreground border border-secondary/30': user.role === 'user'}
                        )}>
                          {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.created_at ? format(new Date(user.created_at), 'PPP') : 'N/A'}</TableCell>
                    <TableCell className="text-right">
                      {currentUserProfile.id !== user.id && (
                          <UserActions user={user} />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Card list for smaller screens */}
          <div className="md:hidden space-y-4">
            {users.map((user) => (
              <Card key={user.id} className="rounded-xl">
                <CardHeader>
                   <CardTitle className="text-base font-semibold">{user.fullName || 'Not provided'}</CardTitle>
                   <CardDescription className="text-xs">{user.email}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Role</span>
                         <Badge 
                            variant={user.role === 'admin' ? 'destructive' : 'secondary'} 
                            className={cn(
                                'text-xs',
                                {'bg-primary/20 text-primary border border-primary/30': user.role === 'premium'},
                                {'bg-secondary/20 text-secondary-foreground border border-secondary/30': user.role === 'user'}
                            )}>
                            {user.role}
                        </Badge>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Joined</span>
                        <span>{user.created_at ? format(new Date(user.created_at), 'PPP') : 'N/A'}</span>
                    </div>
                </CardContent>
                <CardFooter>
                  {currentUserProfile.id !== user.id && (
                    <UserActions user={user} />
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
