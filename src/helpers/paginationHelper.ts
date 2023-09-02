export type SortOrder = 'asc' | 'desc';

type PaginationReturnType = {
  page: number;
  size: number;
  sortBy: string;
  sortOrder: SortOrder;
  skip: number;
};

type OptionType = {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

const calculatePagination = (options: OptionType): PaginationReturnType => {
  const page = Number(options.page || 1);
  const size = Number(options.size || 10);
  const skip = (page - 1) * size;
  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  return {
    page,
    size,
    sortBy,
    sortOrder,
    skip,
  };
};

export const paginationHelper = {
  calculatePagination,
};
