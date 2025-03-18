export function findPagination(query: {
  offset?: number;
  size?: number;
  page?: number;
  sortBy?: string;
}) {
  const { offset = 0, page = 1, size = 10, sortBy } = query;
  const listSort = sortBy ? sortBy.split(',') : [];

  const order = listSort.reduce((acc, cur) => {
    const [column, ordering] = cur.split('-');
    acc[column] = ordering.toUpperCase();
    return acc;
  }, {});

  return {
    skip: page ? (page - 1) * size : offset,
    take: size,
    order: Object.keys(order).length > 0 ? order : { id: 'DESC' },
  };
}

export function responsePagination(
  total: number,
  count: number,
  query: { offset?: number; size?: number; page?: number; sortBy?: string },
) {
  const page = query.page ? query.page : 1;
  const size = query.size ? query.size : 10;
  const totalPage = Math.ceil(total / size) || 1;
  return {
    totalRow: total,
    pageRow: count,
    hasNext: totalPage > page,
    totalPage,
    page,
    size,
  };
}
