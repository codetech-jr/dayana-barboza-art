import type { MetadataRoute } from 'next';
import { TSHIRTS_CATALOG } from '@/lib/data/tshirts';

const BASE_URL = 'https://www.dayanabarboza.com';

const STATIC_ROUTES = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/gallery', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/classes', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/experiences', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/merch', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/returns', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/privacy', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/terms', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/shipping', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/accessibility', priority: 0.5, changeFrequency: 'monthly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const productRoutes = TSHIRTS_CATALOG.map((product) => ({
    path: `/merch/${product.slug}`,
    priority: 0.75,
    changeFrequency: 'weekly' as const,
  }));

  const allRoutes = [...STATIC_ROUTES, ...productRoutes];

  return allRoutes.flatMap((route) => [
    {
      url: `${BASE_URL}/es${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          es: `${BASE_URL}/es${route.path}`,
          en: `${BASE_URL}/en${route.path}`,
        },
      },
    },
    {
      url: `${BASE_URL}/en${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: Number((route.priority * 0.9).toFixed(2)),
      alternates: {
        languages: {
          es: `${BASE_URL}/es${route.path}`,
          en: `${BASE_URL}/en${route.path}`,
        },
      },
    },
  ]);
}
