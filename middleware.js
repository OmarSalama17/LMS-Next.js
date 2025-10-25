import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'; 
import createIntlMiddleware from 'next-intl/middleware';

// 1. جهز الـ middleware بتاع اللغات (زي ما هو)
const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
});

// 2. حدد الصفحات اللي عايز تحميها (زي ما هو)
const isProtectedRoute = createRouteMatcher([
  '/(ar|en)/dashboard(.*)',
  '/(ar|en)/settings',
  '/(ar|en)/checkout' 
]);

// 3. (!!  هنا التعديل !!)
export default clerkMiddleware( async (auth, req) => {
  
  // (الخطوة 1)
  // شغل intlMiddleware الأول عشان يظبط المسار واللغة
  const response = intlMiddleware(req);

  // (الخطوة 2)
  // دلوقتي شغل auth() عشان تحمل السيشن للمسار "الجديد" (اللي فيه ar أو en)
  // ده اللي هيخلي auth() تشتغل جوه الـ Server Actions
  await auth(); 

  // (الخطوة 3)
  // احمي الصفحة لو محتاجة حماية
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // (الخطوة 4)
  // رجّع الـ response
  return response;
});


export const config = {
  matcher: [
    // القاعدة دي سليمة وممتازة، سيبها زي ما هي
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
