export type Category =
  | 'knowledge'
  | 'inspirations'
  | 'interpretations'
  | 'available';

export type CategoryItem = {
  id: Category;
  text: string;
  img: string;
  icon: string;
  bg: string;
  color: string;
};

export const CATEGORIES_LIST: Category[] = [
  'knowledge',
  'inspirations',
  'interpretations',
  'available',
];

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'knowledge',
    text: 'Wiedza',
    img: '/img/category_knowledge.jpeg',
    icon: 'icon_knowledge',
    bg: 'category1',
    color: 'white',
  },
  {
    id: 'inspirations',
    text: 'Inspiracje',
    img: '/img/category_inspirations.png',
    icon: 'icon_inspirations',
    bg: 'category2',
    color: 'accent4',
  },
  {
    id: 'interpretations',
    text: 'Interpretacje',
    img: '/img/category_interpretations.jpeg',
    icon: 'icon_interpretations',
    bg: 'category3',
    color: 'white',
  },
  {
    id: 'available',
    text: 'Dostępne',
    img: '/img/category_available.jpeg',
    icon: 'icon_available',
    bg: 'category4',
    color: 'accent4',
  },
];

export const categoryMap = CATEGORIES.reduce<Record<Category, CategoryItem>>(
  (map, category) => {
    map[category.id] = category;
    return map;
  },
  {} as Record<Category, CategoryItem>
);
