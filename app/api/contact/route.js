import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// 1. تغيير الـ import: احذف @react-email/render
//    واستورد "renderToString" من "react-dom/server"
import { renderToString } from 'react-dom/server'; 

import ContactFormEmail from '../../../emails/ContactFormEmail'; 

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

    // 2. تغيير الدالة: استخدم "renderToString" بدلاً من "render"
    const emailHtml = renderToString(
      <ContactFormEmail
        name={name}
        email={email}
        subject={subject}
        message={message}
      />
    );

    // 3. (خطوة اختيارية لكنها جيدة) نتأكد أن الـ HTML هو نص
    if (typeof emailHtml !== 'string') {
      console.error("Email render failed, output was not a string.");
      throw new Error("Email template failed to render.");
    }

    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'YOUR_PERSONAL_EMAIL@gmail.com', // <--- تأكد من تغيير هذا
      subject: `New Message: ${subject}`,
      reply_to: email,
      html: emailHtml, // <-- الآن هذا "نص" مضمون
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