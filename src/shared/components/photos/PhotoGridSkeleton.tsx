/* Skeleton placeholders shown while the first page of photos loads. */
export function PhotoGridSkeleton() {
  // Vary heights to mimic masonry layout
  const heights = [260, 340, 200, 300, 380, 220, 290, 350, 240, 310, 270, 360];

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
      {heights.map((h, i) => (
        <div key={i} style={{ height: h }}
          className="break-inside-avoid mb-4 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse"
        />
      ))}
    </div>
  );
}
