import { useInfiniteQuery } from "@tanstack/react-query";
import type { UnsplashPhoto } from "../../core/interfaces/unsplash.interface";
import { queryKeys } from "../../core/query/queryKey";
import { photoService } from "../../core/services/photoService";

const PER_PAGE = 20;

interface UsePhotosResult {
  photos: UnsplashPhoto[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isError: boolean;
  error: Error | null;
}

/*
 Manages fetching the editorial (trending) photo list with infinite scroll.
 React Query caches each page, so re-visiting the same page costs 0 requests.
*/
export function usePhotos(): UsePhotosResult {
  const query = useInfiniteQuery({
    queryKey: queryKeys.photos.lists(),
    queryFn: ({ pageParam }) =>
      photoService.getPhotos({ page: pageParam as number, perPage: PER_PAGE }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PER_PAGE ? allPages.length + 1 : undefined,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const photos = query.data?.pages.flat() ?? [];

  return {
    photos,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: !!query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
    isError: query.isError,
    error: query.error as Error | null,
  };
}
