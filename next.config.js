const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // هنستخدم الطريقة الأبسط (domains) بدل remotePatterns 
    // كتجربة أخيرة
    domains: [
      'lh3.googleusercontent.com',
      'googleusercontent.com',
      'res.cloudinary.com',
      'public-media.interaction-design.org',
    ],
  },
};
 
module.exports = withNextIntl(nextConfig);