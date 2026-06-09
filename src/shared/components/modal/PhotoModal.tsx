import { useEffect } from "react";
import { usePhotoDetail } from "../../hooks/usePhotoDetail";
import { Spinner } from "../ui/Spinner";
import { DetailRow } from "../ui/ModalDetailRow";
import { StatBox } from "../ui/ModalStatBox";
import { CloseIcon } from "../ui/CloseIcon";
import { Button } from "../ui/ui-general/Button";
import { DownloadIcon } from "../ui/DownloadIcon";
import type { UnsplashPhoto } from "../../../core/interfaces/unsplash.interface";

interface PhotoModalProps {
  photoId: string | null;
  previewPhoto?: UnsplashPhoto;
  onClose: () => void;
}

/*
  Full-screen modal showing a photo's full resolution + metadata.
  Fetches detailed data via `usePhotoDetail` (cached).
  Falls back to the grid thumbnail until the detail loads.
*/
export function PhotoModal({ photoId, previewPhoto, onClose }: PhotoModalProps) {
  const { photo, isLoading } = usePhotoDetail(photoId);
  const displayed = photo ?? previewPhoto;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!photoId) return null;

  return (
    <div onClick={onClose} role="dialog" aria-modal="true" aria-label="Photo detail"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <div onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col lg:flex-row w-full max-w-5xl max-h-[90vh]
                  bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Close button */}
        <Button variant="ghost" onClick={onClose} aria-label="Close"
          className="absolute top-4 right-4 z-10 w-9 h-9 p-0
                    bg-black/30 hover:bg-black/50 text-white rounded-full"
        >
          {CloseIcon}
        </Button>

        {/* Photo */}
        <div className="lg:w-2/3 bg-gray-100 dark:bg-gray-800 flex items-center justify-center min-h-64 lg:min-h-0">
          {displayed ? (
            <img src={displayed.urls.regular}
              alt={displayed.alt_description ?? displayed.description ?? "Photo"}
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
                <img src={displayed.user.profile_image.medium} alt={displayed.user.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{displayed.user.name}</p>
                  <a href={displayed.user.links.html} target="_blank" rel="noopener noreferrer"
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

              <DetailRow label="ზომა" value={`${displayed.width} × ${displayed.height}`} />
              <DetailRow label="გამოქვეყნდა"
                value={new Date(displayed.created_at).toLocaleDateString("ka-GE", {
                  year: "numeric", month: "long", day: "numeric",
                })}
              />

              {/* EXIF */}
              {photo?.exif && Object.values(photo.exif).some(Boolean) && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600">EXIF</p>
                  {photo.exif.make && <DetailRow label="Camera" value={`${photo.exif.make} ${photo.exif.model ?? ""}`} />}
                  {photo.exif.aperture && <DetailRow label="Aperture" value={`ƒ/${photo.exif.aperture}`} />}
                  {photo.exif.exposure_time && <DetailRow label="Exposure" value={`${photo.exif.exposure_time}s`} />}
                  {photo.exif.focal_length && <DetailRow label="Focal" value={`${photo.exif.focal_length}mm`} />}
                  {photo.exif.iso && <DetailRow label="ISO" value={String(photo.exif.iso)} />}
                </div>
              )}

              {photo?.location?.name && (
                <DetailRow label="📍 Location" value={photo.location.name} />
              )}

              {/* Download — <a> რჩება, Button-ის სტილი className-ით */}
              <a href={displayed.links.download} target="_blank" rel="noopener noreferrer"
                className="
                  mt-auto inline-flex items-center justify-center gap-2
                  px-4 py-3 rounded-xl font-medium
                  bg-blue-500 hover:bg-blue-600 text-white
                  transition-colors
                "
              >
                {DownloadIcon}
                ჩამოტვირთვა
              </a>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
