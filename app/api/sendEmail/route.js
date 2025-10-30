import { Email } from '../../Components/Email';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      email, 
      firstName, 
      courseTitle,
      coursePrice,
      courseImage 
    } = body;

    if (!email || !firstName || !courseTitle || !coursePrice || !courseImage) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'EDP <onboarding@resend.dev>', 
      to: [email],
      subject: `🎉 تم التسجيل بنجاح في كورس: ${courseTitle}`,
      
      react: Email({
        firstName: firstName,
        userEmail: email,
        courseTitle: courseTitle,
        coursePrice: coursePrice,
        courseImage: courseImage,
      }),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message || 'An unknown error occurred' }, { status: 500 });
  }
}