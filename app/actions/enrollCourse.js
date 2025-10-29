'use server';

import { auth, currentUser, clerkClient } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function enrollCourseAction(courseId) {
  
  const { userId } = await auth();
  
  if (!userId) {
    return { success: false, error: 'User not signed in.' };
  }
  if (!courseId) {
    return { success: false, error: 'Course ID is required' };
  }

  try {
    const user = await currentUser(); 
    if (!user) {
      throw new Error('User not found.');
    }
    console.log("user from Clerk:", user.id);

    const currentCourses = user.privateMetadata?.enrolledCourses || [];
    
    if (currentCourses.includes(courseId)) {
      console.log("User is already enrolled.");
      return { success: false, error: 'You are already enrolled in this course.' };
    }

    console.log("User not enrolled. Updating metadata...");
    const newCourses = [...currentCourses, courseId];
    const client = await clerkClient(); 
    await client.users.updateUserMetadata(userId, { 
      privateMetadata: {
        ...user.privateMetadata,
        enrolledCourses: newCourses,
      },
    });

    revalidatePath('/dashboard');
    return { success: true, message: 'Enrollment successful!' };

  } catch (error) {
    console.error('❌ Failed to get/update Clerk user:', error);
    return { success: false, error: 'Could not update your data. Please try again.' };
  }
  
}

