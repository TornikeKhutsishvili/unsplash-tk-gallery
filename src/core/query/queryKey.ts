/*
  Centralised query key factory.
  Helps React Query cache invalidation stay consistent across the app.
*/

export const queryKeys = {
  photos: {
    all: ['photos'] as const,
    lists: () => [...queryKeys.photos.all, 'list'] as const,
    list: (page: number) => [...queryKeys.photos.lists(), { page }] as const,
    searches: () => [...queryKeys.photos.all, 'search'] as const,
    search: (query: string, page: number) =>
      [...queryKeys.photos.searches(), { query, page }] as const,
    detail: (id: string) => [...queryKeys.photos.all, 'detail', id] as const,
  },
} as const;
