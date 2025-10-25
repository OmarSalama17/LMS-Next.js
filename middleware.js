// 1. استورد createRouteMatcher
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'; 
import createIntlMiddleware from 'next-intl/middleware';

// 2. جهز الـ middleware بتاع اللغات (زي ما هو)
const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
});

// 3. حدد الصفحات اللي عايز تحميها (لازم تشمل اللغات)
const isProtectedRoute = createRouteMatcher([
  '/(ar|en)/dashboard(.*)',   // مثال: حماية الداشبورد وكل اللي جواها
  '/(ar|en)/settings',       // مثال: حماية صفحة الإعدادات
  // ضيف أي صفحات تانية هنا
]);

// 4. عدّل الـ export بتاعك
export default clerkMiddleware( async (auth, req) => {
  
  // 5. شغّل intlMiddleware الأول (ده بيظبط اللغة)
  const response = intlMiddleware(req);

  // 6. اعمل check: لو الصفحة دي محمية، اطلب تسجيل الدخول
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // 7. رجّع الـ response
  return response;
});


export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', 
    '/', 
    '/(api|trpc)(.*)'
  ]
};