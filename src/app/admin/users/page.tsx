
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
import { UserActions } from './_components/user-actions';
import { UserTable } from './_components/user-table';

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
            <p className="text-muted-foreground">View, filter, and manage all registered users.</p>
        </div>
      </div>
      <UserTable users={users} currentUserId={currentUserProfile.id} />
    </div>
  );
}
