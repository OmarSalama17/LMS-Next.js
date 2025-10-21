import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // اللغات المتاحة
  locales: ['en', 'ar'],

  // اللغة الافتراضية
  defaultLocale: 'en',
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
