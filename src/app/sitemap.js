import { blogPosts } from "@/data/blog-data";

export default function sitemap() {
  const baseUrl = 'https://vesha.in';

  // Static routes
  const routes = [
    '',
    '/about',
    '/contact',
    '/blogs',
    '/products',
    '/cart',
    '/login',
    '/signup',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1 : 0.8,
  }));

  // Blog routes
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...routes, ...blogRoutes];
}
