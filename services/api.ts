import axios from 'axios';
import { Post } from '@models/post';
import { CATEGORIES } from '@models/category';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export async function fetchPosts(): Promise<Post[]> {
  const response = await api.get('/posts');
  const data: Post[] = response.data;

  const baseDate = new Date('2024-01-01T00:00:00.000Z');
  const oneDay = 24 * 60 * 60 * 1000;

  const enrichedData = data.map((post) => {
    // Deterministic category assignment based on post.id
    const assignedCategory = CATEGORIES[post.id % CATEGORIES.length];
    // Deterministic date: base date plus post.id days
    const createdAt = new Date(
      baseDate.getTime() + post.id * oneDay
    ).toISOString();
    return {
      ...post,
      category: assignedCategory,
      createdAt,
    };
  });

  return enrichedData;
}
