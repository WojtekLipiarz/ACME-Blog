import { Category } from './category';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  category: Category;
  createdAt: string;
}
