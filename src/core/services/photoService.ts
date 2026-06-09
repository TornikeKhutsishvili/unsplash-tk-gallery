import { unsplashApi } from "../api/unsplash-api";
import type {
  FetchPhotosParams, SearchPhotosParams, UnsplashPhoto, UnsplashSearchResponse
} from "../interfaces/unsplash.interface";

const PER_PAGE = 21;

export const photoService = {
  /* Fetch editorial (trending) photos — used on initial load */
  getPhotos: async ({ page, perPage = PER_PAGE }: FetchPhotosParams): Promise<UnsplashPhoto[]> => {
    try {
      // const { data, headers } = await unsplashApi.get<UnsplashPhoto[]>('/photos', {
      const { data } = await unsplashApi.get<UnsplashPhoto[]>('/photos', {
        params: {
          page,
          per_page: perPage,
          order_by: 'popular'
        },
      });

      // const debugInfo = {
      //   itemsReceived: data.length,
      //   expectedPerPage: perPage,
      //   xTotalHeader: headers['x-total'],
      //   xTotalPagesHeader: headers['x-total-pages']
      // }
      // console.log(`📸 Page ${page}:`, debugInfo);
      
      return data;
    } catch (error) {
      console.error('Error fetching photos:', error);
      throw error;
    }
  },

  /* Search photos by keyword */
  searchPhotos: async ({
    query,
    page,
    perPage = PER_PAGE,
  }: SearchPhotosParams): Promise<UnsplashSearchResponse> => {
    const { data } = await unsplashApi.get<UnsplashSearchResponse>('/search/photos', {
      params: {
        query,
        page,
        per_page: perPage
      },
    });
    return data;
  },

  /* Get a single photo by ID — used for detail modal */
  getPhotoById: async (id: string): Promise<UnsplashPhoto> => {
    const { data } = await unsplashApi.get<UnsplashPhoto>(`/photos/${id}`);
    return data;
  },
};
