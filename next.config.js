const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'googleusercontent.com',
      'res.cloudinary.com',
      'public-media.interaction-design.org',
      'www.atomcamp.com',
    ],
  },
};
 
module.exports = withNextIntl(nextConfig);