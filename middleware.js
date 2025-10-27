import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'; 
import createIntlMiddleware from 'next-intl/middleware';

const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
});

const isProtectedRoute = createRouteMatcher([
  '/(ar|en)/dashboard(.*)',
  '/(ar|en)/settings',
  '/(ar|en)/checkout' 
]);

export default clerkMiddleware( async (auth, req) => {
  
  const response = intlMiddleware(req);

  await auth(); 

  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  return response;
});


export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
