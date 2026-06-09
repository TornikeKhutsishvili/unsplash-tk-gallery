import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "../../core/query/queryKey";
import { photoService } from "../../core/services/photoService";
import type { UnsplashPhoto } from "../../core/interfaces/unsplash.interface";

const PER_PAGE = 21;

interface UseSearchPhotosResult {
  photos: UnsplashPhoto[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isError: boolean;
  totalResults: number;
}

/*
  Manages searching photos with infinite scroll.
  Each unique (query, page) combination is cached — re-searching the same
  keyword never fires a new network request.
*/
export function useSearchPhotos(query: string): UseSearchPhotosResult {
  const enabled = query.trim().length > 0;

  const infiniteQuery = useInfiniteQuery({
    queryKey: queryKeys.photos.searches().concat([query] as never[]),
    queryFn: ({ pageParam }) =>
      photoService.searchPhotos({ query, page: pageParam as number, perPage: PER_PAGE }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if ((lastPageParam as number) >= lastPage.total_pages) return undefined;

      // Otherwise, calculate the next page number
      return (lastPageParam as number) + 1;
    },
    enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000, // Cache for 10 minutes
  });

  const photos = infiniteQuery.data?.pages.flatMap((p) => p.results) ?? [];
  const totalResults = infiniteQuery.data?.pages[0]?.total ?? 0;

  return {
    photos,
    isLoading: infiniteQuery.isLoading,
    isFetchingNextPage: infiniteQuery.isFetchingNextPage,
    hasNextPage: !!infiniteQuery.hasNextPage,
    fetchNextPage: infiniteQuery.fetchNextPage,
    isError: infiniteQuery.isError,
    totalResults,
  };
}
