import { useCallback } from "react";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { PhotoCard } from "./PhotoCard";
import { Spinner } from "../ui/Spinner";
import type { UnsplashPhoto } from "../../../core/interfaces/unsplash.interface";

interface PhotoGridProps {
  photos: UnsplashPhoto[];
  onPhotoClick: (photo: UnsplashPhoto) => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

/*
  CSS-columns masonry grid.
  The sentinel div at the bottom triggers infinite scroll via IntersectionObserver.
*/
export function PhotoGrid({
  photos, onPhotoClick, hasNextPage, isFetchingNextPage, fetchNextPage
}: PhotoGridProps) {
  const onIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const sentinelRef = useInfiniteScroll(onIntersect, hasNextPage && !isFetchingNextPage);

  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-24 text-gray-400 dark:text-gray-600">
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-lg font-medium">ფოტო ვერ მოიძებნა</p>
      </div>
    );
  }

  return (
    <div>
      {/* Masonry grid using CSS columns */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {photos.map((photo) => (
          <div key={photo.id} className="break-inside-avoid mb-4">
            <PhotoCard photo={photo} onClick={onPhotoClick} />
          </div>
        ))}
      </div>

      {/* Infinite scroll sentinel */}
      <div ref={sentinelRef} className="h-4 mt-4" aria-hidden="true" />

      {/* Loading spinner for next page */}
      {isFetchingNextPage && (
        <div className="flex justify-center py-8">
          <Spinner size="md" />
        </div>
      )}

      {/* End of results */}
      {!hasNextPage && photos.length > 0 && (
        <p className="text-center py-8 text-sm text-gray-400 dark:text-gray-600">
          ყველა ფოტო ნაჩვენებია ✓
        </p>
      )}
    </div>
  );
}
