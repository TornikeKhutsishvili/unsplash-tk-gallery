import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "../../core/query/queryKey";
import { photoService } from "../../core/services/photoService";
import type { UnsplashPhoto } from "../../core/interfaces/unsplash.interface";

const PER_PAGE = 21;

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
    queryFn: ({ pageParam }) => {
      // const msg = `Fetching page: ${pageParam}`;
      // console.log(msg);
      // window.localStorage.setItem('debug_usePhotos', msg);
      return photoService.getPhotos({ page: pageParam as number, perPage: PER_PAGE });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      // const debugInfo = {
      //   lastPageLength: lastPage.length, 
      //   PER_PAGE, 
      //   lastPageParam,
      // };
      // console.log('getNextPageParam:', debugInfo);
      // window.localStorage.setItem('debug_getNextPageParam', JSON.stringify(debugInfo));
      
      // If we got no items at all, we've reached the end
      // if (lastPage.length === 0) {
      //   window.localStorage.setItem('debug_result', 'STOP: Empty page');
      //   return undefined;
      // }

      if (lastPage.length === 0) return undefined;
      
      // Otherwise, fetch the next page
      const nextPage = (lastPageParam as number) + 1;
      // window.localStorage.setItem('debug_result', `CONTINUE: next page = ${nextPage}`);
      return nextPage;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // Cache for 10 minutes
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
