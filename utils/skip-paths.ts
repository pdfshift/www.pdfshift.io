/**
 * Shared utility for skip paths and extensions used by both server middleware and Netlify edge functions
 * This ensures consistent behavior across environments
 */

export const SKIP_PATHS = [
  '/_nuxt/',
  '/images/',
  '/js/',
  '/documents/',
  '/.well-known/',
  '/.netlify/',
  '/content/',
];

export const SKIP_EXTENSIONS = [
  '.js',
  '.css',
  '.png',
  '.jpg',
  '.jpeg',
  '.svg',
  '.ico',
  '.woff',
  '.woff2',
  '.ttf',
  '.eot',
  '.webp',
  '.gif',
  '.pdf',
  '.zip',
  '.json',
  '.xml',
  '.txt'
];