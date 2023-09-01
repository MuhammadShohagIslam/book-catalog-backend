export type SortOrder = 'asc' | 'desc';

type PaginationReturnType = {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: SortOrder;
  skip: number;
};

type OptionType = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

const calculatePagination = (options: OptionType): PaginationReturnType => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  return {
    page,
    limit,
    sortBy,
    sortOrder,
    skip,
  };
};

export const paginationHelper = {
  calculatePagination,
};
