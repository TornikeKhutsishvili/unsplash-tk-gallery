export interface UnsplashPhotoUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface UnsplashUser {
  id: string;
  username: string;
  name: string;
  profile_image: {
    small: string;
    medium: string;
    large: string;
  };
  links: {
    html: string;
  };
}

export interface UnsplashPhotoLinks {
  self: string;
  html: string;
  download: string;
}

export interface UnsplashPhotoExif {
  make: string | null;
  model: string | null;
  exposure_time: string | null;
  aperture: string | null;
  focal_length: string | null;
  iso: number | null;
}

export interface UnsplashPhotoLocation {
  name: string | null;
  city: string | null;
  country: string | null;
}

export interface UnsplashPhoto {
  id: string;
  slug: string;
  created_at: string;
  width: number;
  height: number;
  color: string | null;
  blur_hash: string | null;
  description: string | null;
  alt_description: string | null;
  likes: number;
  downloads?: number;
  views?: number;
  urls: UnsplashPhotoUrls;
  user: UnsplashUser;
  links: UnsplashPhotoLinks;
  exif?: UnsplashPhotoExif;
  location?: UnsplashPhotoLocation;
}

export interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
}

export interface FetchPhotosParams {
  page: number;
  perPage?: number;
}

export interface SearchPhotosParams {
  query: string;
  page: number;
  perPage?: number;
}
