import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
export default function robots(): MetadataRoute.Robots {
  return process.env.NEXT_PUBLIC_LAUNCH_READY === 'true'
    ? {
        // Search access is independent of training. Private APIs retain the same exclusion.
        rules: ['*', 'OAI-SearchBot'].map((userAgent) => ({
          userAgent,
          allow: '/',
          disallow: ['/api/'],
        })),
        sitemap: `${site.url}/sitemap.xml`,
      }
    : { rules: { userAgent: '*', disallow: '/' } };
}
