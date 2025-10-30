import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import ContactFormEmail from '../../Components/ContactFormEmail'; 

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, messageKey: 'form.error_fields' },
        { status: 400 }
      );
    }


    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'omarsalama25x25@gmail.com',
      subject: `New Message: ${subject}`,
      reply_to: email,
      
      react: <ContactFormEmail
        name={name}
        email={email}
        subject={subject}
        message={message}
      />
    });

    return NextResponse.json(
      { success: true, messageKey: 'form.success' },
      { status: 200 }
    );

  } catch (error) {
    console.error("--- CATCH BLOCK ERROR ---", error); 
    return NextResponse.json(
      { success: false, messageKey: 'form.error_server' },
      { status: 500 }
    );
  }
}