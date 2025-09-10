
import { MetadataRoute } from 'next'
import { getLessons } from '@/lib/data';

const URL = 'https://youthskillset.in';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lessons = await getLessons();

  const lessonRoutes = lessons.map(lesson => ({
    url: `${URL}/lessons/${lesson.id}`,
    lastModified: new Date(),
  }));

  const subtopicRoutes = lessons.flatMap(lesson => 
    lesson.subtopics.map(subtopic => ({
      url: `${URL}/subtopic/${subtopic.id}`,
      lastModified: new Date(),
    }))
  );

  const staticRoutes = [
    '/',
    '/about',
    '/pricing',
    '/login',
    '/signup',
    '/lessons'
  ].map(route => ({
    url: `${URL}${route}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...lessonRoutes, ...subtopicRoutes];
}
