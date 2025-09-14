
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase/admin';


async function verifyAdmin() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Authentication required.');

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profile?.role !== 'admin') throw new Error('Permission denied. You must be an admin.');
    
    return user;
}


const NotificationSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});


export async function createNotificationAction(prevState: any, formData: FormData): Promise<{success: boolean, error?: string, errors?: any}> {
  try {
    await verifyAdmin();
    
    if (!supabaseAdmin) {
      return { success: false, error: "The admin service is not configured. Please set the SUPABASE_SERVICE_ROLE_KEY in your environment variables to send notifications." };
    }

    const rawFormData = {
      title: formData.get('title'),
      message: formData.get('message'),
    };
  
    const validatedFields = NotificationSchema.safeParse(rawFormData);
  
    if (!validatedFields.success) {
      return {
        success: false,
        error: 'Invalid form data.',
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
  
    const { error } = await supabaseAdmin.from('notifications').insert({
      title: validatedFields.data.title,
      message: validatedFields.data.message,
    });
  
    if (error) {
      throw error;
    }
  
    revalidatePath('/notifications');
    revalidatePath('/admin/notifications');

    return { success: true, errors: {} };

  } catch (error: any) {
    console.error('Create Notification Error:', error);
    return { success: false, error: error.message, errors: {} };
  }
}
