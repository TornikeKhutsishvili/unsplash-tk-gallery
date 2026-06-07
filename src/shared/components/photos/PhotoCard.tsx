import type { UnsplashPhoto } from "../../../core/interfaces/unsplash.interface";

interface PhotoCardProps {
  photo: UnsplashPhoto;
  onClick: (photo: UnsplashPhoto) => void;
}

/*
  Displays a single photo thumbnail in the masonry grid.
  Uses `small` URL for performance, natural aspect ratio preserved.
*/
export function PhotoCard({ photo, onClick }: PhotoCardProps) {
  const aspectRatio = photo.height / photo.width;
  const bgColor = photo.color ?? '#e5e7eb';

  return (
    <article
      className="
        group relative overflow-hidden rounded-2xl cursor-pointer
        shadow-sm hover:shadow-xl
        transition-all duration-300 hover:-translate-y-1
        bg-gray-100 dark:bg-gray-800
      "
      style={{ paddingBottom: `${(aspectRatio * 100).toFixed(1)}%`, backgroundColor: bgColor }}
      onClick={() => onClick(photo)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(photo)}
      aria-label={photo.alt_description ?? photo.description ?? 'Photo'}
    >
      <img
        src={photo.urls.small}
        alt={photo.alt_description ?? photo.description ?? 'Unsplash photo'}
        loading="lazy"
        decoding="async"
        className="
          absolute inset-0 w-full h-full object-cover
          transition-transform duration-500 group-hover:scale-105
        "
      />

      {/* Hover overlay */}
      <div className="
        absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
      ">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2">
            <img
              src={photo.user.profile_image.small}
              alt={photo.user.name}
              className="w-7 h-7 rounded-full border-2 border-white/50"
            />
            <span className="text-white text-sm font-medium truncate">
              {photo.user.name}
            </span>
          </div>
          {photo.likes > 0 && (
            <div className="flex items-center gap-1 mt-1">
              <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="text-white text-xs">{photo.likes.toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
