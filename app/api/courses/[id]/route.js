// File: app/api/courses/[id]/route.js

import { NextResponse } from 'next/server';

// (!! IMPORTANTE !!)
// ده الـ API بتاعك اللي إنت لسه باعته
const MOCK_API_URL = "https://68f816d9deff18f212b51c45.mockapi.io/api/product";

export async function GET(request, { params }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: 'Course ID is required' },
      { status: 400 }
    );
  }

  try {
    // (!! IMPORTANTE !!)
    // هنا إحنا بنعمل fetch من الـ MockAPI بتاعك مباشرة
    const res = await fetch(`${MOCK_API_URL}/${id}`);

    if (!res.ok) {
      // لو الـ MockAPI رجع إيرور (زي 404 Not Found)
      return NextResponse.json(
        { error: 'Course not found in MockAPI' },
        { status: 404 }
      );
    }

    // رجع الداتا زي ما هي لصفحة الـ Checkout
    const data = await res.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Failed to fetch from MockAPI:', error);
    return NextResponse.json(
      { error: 'An internal server error occurred' },
      { status: 500 }
    );
  }
}