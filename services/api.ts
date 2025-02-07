// services/api.ts
import axios from 'axios';
import { Post } from '@models/post';
import { CATEGORIES_LIST } from '@models/category';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * Helper function that enriches a post with a deterministic category and createdAt date.
 */
function enrichPost(original: Post): Post {
  const assignedCategory = CATEGORIES_LIST[original.id % CATEGORIES_LIST.length]; // prettier-ignore
  const baseDate = new Date('2024-01-01T00:00:00.000Z');
  const oneDay = 24 * 60 * 60 * 1000;
  const createdAt = new Date(
    baseDate.getTime() + original.id * oneDay
  ).toISOString();

  return {
    ...original,
    category: assignedCategory,
    createdAt,
  };
}

/**
 * Fetch all posts and enrich them.
 */
export async function fetchPosts(): Promise<Post[]> {
  const response = await api.get<Post[]>('/posts');
  const data = response.data;
  return data.map(enrichPost);
}

/**
 * Fetch a single post by ID and enrich it.
 */
export async function fetchPost(id: number): Promise<Post> {
  const response = await api.get<Post>(`/posts/${id}`);
  return enrichPost(response.data);
}
