import React, { useCallback, useState } from 'react'
import type { UnsplashPhoto } from '../../../core/interfaces/unsplash.interface';
import { usePhotos } from '../../../shared/hooks/usePhotos';
import { useSearchPhotos } from '../../../shared/hooks/useSearchPhotos';
import { SearchBar } from '../../../shared/components/ui/SearchBar';
import { ErrorMessage } from '../../../shared/components/ui/ErrorMessage';
import { PhotoGridSkeleton } from '../../../shared/components/photos/PhotoGridSkeleton';
import { PhotoGrid } from '../../../shared/components/photos/PhotoGrid';
import { PhotoModal } from '../../../shared/components/modal/PhotoModal';

const Home:React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<UnsplashPhoto | null>(null);

  const isSearching = searchQuery.trim().length > 0;

  // Editorial photos (no search)
  const {
    photos: editorialPhotos,
    isLoading: editorialLoading,
    isFetchingNextPage: editorialFetchingNext,
    hasNextPage: editorialHasNext,
    fetchNextPage: editorialFetchNext,
    isError: editorialError,
  } = usePhotos();

  // Search photos
  const {
    photos: searchedPhotos,
    isLoading: searchLoading,
    isFetchingNextPage: searchFetchingNext,
    hasNextPage: searchHasNext,
    fetchNextPage: searchFetchNext,
    isError: searchError,
    totalResults,
  } = useSearchPhotos(searchQuery);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handlePhotoClick = useCallback((photo: UnsplashPhoto) => {
    setSelectedPhoto(photo);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  // Derive which data set to show
  const photos = isSearching ? searchedPhotos : editorialPhotos;
  const isLoading = isSearching ? searchLoading : editorialLoading;
  const isFetchingNextPage = isSearching ? searchFetchingNext : editorialFetchingNext;
  const hasNextPage = isSearching ? searchHasNext : editorialHasNext;
  const fetchNextPage = isSearching ? searchFetchNext : editorialFetchNext;
  const isError = isSearching ? searchError : editorialError;

  return (
    <>
      {/* Hero / Search */}
      <section className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
          ფოტო გალერეა
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
          Unsplash-ის საუკეთესო ფოტოები
        </p>
        <SearchBar onSearch={handleSearch} />

        {/* Search result count */}
        {isSearching && !searchLoading && (
          <p className="mt-4 text-sm text-gray-400 dark:text-gray-600">
            {totalResults > 0
              ? `${totalResults.toLocaleString()} ფოტო მოიძებნა "${searchQuery}"`
              : `"${searchQuery}" — ვერ მოიძებნა`}
          </p>
        )}
      </section>

      {/* Content */}
      {isError ? (
        <ErrorMessage />
      ) : isLoading ? (
        <PhotoGridSkeleton />
      ) : (
        <PhotoGrid 
          photos={photos} 
          onPhotoClick={handlePhotoClick} 
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage} 
          fetchNextPage={fetchNextPage}
        />
      )}

      {/* Modal */}
      {selectedPhoto && (
        <PhotoModal photoId={selectedPhoto.id} previewPhoto={selectedPhoto} onClose={handleModalClose} />
      )}
    </>
  )
}

export default Home
