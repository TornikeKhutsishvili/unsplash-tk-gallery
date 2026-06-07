import { useQuery } from "@tanstack/react-query";
import type { UnsplashPhoto } from "../../core/interfaces/unsplash.interface";
import { queryKeys } from "../../core/query/queryKey";
import { photoService } from "../../core/services/photoService";

interface UsePhotoDetailResult {
  photo: UnsplashPhoto | undefined;
  isLoading: boolean;
  isError: boolean;
}

/*
  Fetches a single photo's full details.
  Result is cached — opening the same photo multiple times never re-fetches.
*/
export function usePhotoDetail(id: string | null): UsePhotoDetailResult {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.photos.detail(id ?? ''),
    queryFn: () => photoService.getPhotoById(id!),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  return { photo: data, isLoading, isError };
}