export type Category =
  | 'knowledge'
  | 'inspirations'
  | 'interpretations'
  | 'available';

export type CategoryItem = {
  id: Category;
  text: string;
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
    icon: 'icon_knowledge',
    bg: 'category1',
    color: 'white',
  },
  {
    id: 'inspirations',
    text: 'Inspiracje',
    icon: 'icon_inspirations',
    bg: 'category2',
    color: 'accent4',
  },
  {
    id: 'interpretations',
    text: 'Interpretacje',
    icon: 'icon_interpretations',
    bg: 'category3',
    color: 'white',
  },
  {
    id: 'available',
    text: 'Dostępne',
    icon: 'icon_available',
    bg: 'category4',
    color: 'accent4',
  },
];
