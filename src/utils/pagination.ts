export function getPaginationInfo(size: number, page: number, total_count: number) {
  let nextPage: number | null = null;
  const current_page = page - 1;
  if (current_page * size + size < total_count) {
    nextPage = page + 1;
  }
  return {
    nextPage: nextPage ?? null,
    total_pages: Math.ceil(total_count / size),
    skip_size: current_page * size
  };
}
