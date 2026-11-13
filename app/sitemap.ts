import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.dayanabarboza.com';

const ROUTES = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/gallery', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/classes', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/experiences', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/merch', priority: 0.8, changeFrequency: 'weekly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.flatMap((route) => [
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
