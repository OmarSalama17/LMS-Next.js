'use server';

import { auth, currentUser, clerkClient } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
// (!! 1. شيلنا الـ redirect من هنا !!)

export async function enrollCourseAction(courseId) {
  
  const { userId } = await auth();
  
  // (!! 2. هنرجع إيرور بدل الـ redirect !!)
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
    
    // (!! 3. الحل بتاعك اهو !!)
    // لو هو مشترك، رجع رسالة إيرور واضحة
    if (currentCourses.includes(courseId)) {
      console.log("User is already enrolled.");
      return { success: false, error: 'You are already enrolled in this course.' };
    }

    // لو مش مشترك، كمل وضفيه
    console.log("User not enrolled. Updating metadata...");
    const newCourses = [...currentCourses, courseId];
    const client = await clerkClient(); 
    await client.users.updateUserMetadata(userId, { 
      privateMetadata: {
        ...user.privateMetadata,
        enrolledCourses: newCourses,
      },
    });

    // (!! 4. لو نجح، اعمل revalidate ورجع رسالة نجاح !!)
    revalidatePath('/dashboard');
    return { success: true, message: 'Enrollment successful!' };

  } catch (error) {
    // (ده للإيرورات الحقيقية زي لو clerkClient فشل)
    console.error('❌ Failed to get/update Clerk user:', error);
    return { success: false, error: 'Could not update your data. Please try again.' };
  }
  
  // (!! 5. شيلنا الـ redirect اللي كانت هنا !!)
}

