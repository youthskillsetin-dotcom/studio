
'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { UserActions } from './user-actions';
import { UserProfileWithSubscription } from '@/lib/types';
import { Input } from '@/components/ui/input';

interface UserTableProps {
    users: UserProfileWithSubscription[];
    currentUserId: string;
}

export function UserTable({ users, currentUserId }: UserTableProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter(user => 
        (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.fullName && user.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-4">
            <div className="max-w-sm">
                <Input 
                    placeholder="Filter by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {/* Table for larger screens */}
            <Card className="hidden md:block">
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
                    {filteredUsers.map((user) => (
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
                        {currentUserId !== user.id && user.role !== 'admin' && (
                            <UserActions user={user} />
                        )}
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </Card>

             {/* Card list for smaller screens */}
            <div className="md:hidden space-y-4">
                {filteredUsers.map((user) => (
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
                    {currentUserId !== user.id && user.role !== 'admin' && (
                        <UserActions user={user} />
                    )}
                    </CardFooter>
                </Card>
                ))}
            </div>

            {filteredUsers.length === 0 && (
                <div className="text-center text-muted-foreground py-10">
                    No users found matching your search.
                </div>
            )}
        </div>
    )
}
