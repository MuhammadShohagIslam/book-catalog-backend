export const bookSearchableFields: string[] = ['title'];
export const bookFilterableFields: string[] = [
  'searchTerm',
  'id',
  'categoryId',
];

export const bookRelationalFields: string[] = ['categoryId'];

export const bookRelationalFieldsMapper: {
  [key: string]: string;
} = {
  categoryId: 'category',
};
