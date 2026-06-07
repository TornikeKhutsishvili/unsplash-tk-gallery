import { useEffect } from "react";
import { usePhotoDetail } from "../../hooks/usePhotoDetail";
import { Spinner } from "../ui/Spinner";
import DetailRow from "../ui/ModalDetailRow";
import StatBox from "../ui/ModalStatBox";
import type { UnsplashPhoto } from "../../../core/interfaces/unsplash.interface";

interface PhotoModalProps {
  photoId: string | null;
  previewPhoto?: UnsplashPhoto; // optimistic preview from grid
  onClose: () => void;
}

/*
  Full-screen modal showing a photo's full resolution + metadata.
  Fetches detailed data via `usePhotoDetail` (cached).
  Falls back to the grid thumbnail until the detail loads.
*/
export function PhotoModal({ photoId, previewPhoto, onClose }: PhotoModalProps) {
  const { photo, isLoading } = usePhotoDetail(photoId);

  // Display detail photo if loaded, otherwise fall back to the preview
  const displayed = photo ?? previewPhoto;

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!photoId) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo detail"
    >
      {/* Modal panel — stop click propagation so clicking inside doesn't close */}
      <div
        className="
          relative flex flex-col lg:flex-row
          w-full max-w-5xl max-h-[90vh]
          bg-white dark:bg-gray-900
          rounded-3xl overflow-hidden shadow-2xl
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="
            absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center
            rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors
          "
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Photo */}
        <div className="lg:w-2/3 bg-gray-100 dark:bg-gray-800 flex items-center justify-center min-h-64 lg:min-h-0">
          {displayed ? (
            <img
              src={displayed.urls.regular}
              alt={displayed.alt_description ?? displayed.description ?? 'Photo'}
              className="w-full h-full object-contain max-h-[60vh] lg:max-h-[90vh]"
            />
          ) : (
            <Spinner size="lg" />
          )}
        </div>

        {/* Metadata panel */}
        <div className="lg:w-1/3 p-6 overflow-y-auto flex flex-col gap-5">
          {isLoading && !displayed ? (
            <div className="flex items-center justify-center h-full">
              <Spinner />
            </div>
          ) : displayed ? (
            <>
              {/* Photographer */}
              <div className="flex items-center gap-3">
                <img
                  src={displayed.user.profile_image.medium}
                  alt={displayed.user.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{displayed.user.name}</p>
                  <a
                    href={displayed.user.links.html}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    @{displayed.user.username}
                  </a>
                </div>
              </div>

              {/* Description */}
              {(displayed.description ?? displayed.alt_description) && (
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {displayed.description ?? displayed.alt_description}
                </p>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <StatBox label="Likes" value={displayed.likes.toLocaleString()} icon="❤️" />
                {photo?.downloads !== undefined && (
                  <StatBox label="Downloads" value={photo.downloads.toLocaleString()} icon="⬇️" />
                )}
                {photo?.views !== undefined && (
                  <StatBox label="Views" value={photo.views.toLocaleString()} icon="👁" />
                )}
              </div>

              {/* Dimensions */}
              <DetailRow label="ზომა" value={`${displayed.width} × ${displayed.height}`} />
              <DetailRow
                label="გამოქვეყნდა"
                value={new Date(displayed.created_at).toLocaleDateString('ka-GE', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              />

              {/* EXIF */}
              {photo?.exif && Object.values(photo.exif).some(Boolean) && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600">EXIF</p>
                  {photo.exif.make && <DetailRow label="Camera" value={`${photo.exif.make} ${photo.exif.model ?? ''}`} />}
                  {photo.exif.aperture && <DetailRow label="Aperture" value={`ƒ/${photo.exif.aperture}`} />}
                  {photo.exif.exposure_time && <DetailRow label="Exposure" value={`${photo.exif.exposure_time}s`} />}
                  {photo.exif.focal_length && <DetailRow label="Focal" value={`${photo.exif.focal_length}mm`} />}
                  {photo.exif.iso && <DetailRow label="ISO" value={String(photo.exif.iso)} />}
                </div>
              )}

              {/* Location */}
              {photo?.location?.name && (
                <DetailRow label="📍 Location" value={photo.location.name} />
              )}

              {/* Download link */}
              <a
                href={displayed.links.download}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-auto flex items-center justify-center gap-2
                  px-4 py-3 rounded-xl
                  bg-blue-500 hover:bg-blue-600 text-white font-medium
                  transition-colors
                "
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                ჩამოტვირთვა
              </a>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
