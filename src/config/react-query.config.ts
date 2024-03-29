import { STALE_TIME } from '@src/constants';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const QUERY_KEYS = {
  query: {
    user: 'user',
    amenitiesList: 'amenities_list',

    availableDates: 'available_dates',

    accommodation: 'accommodation',
    hostedAccommodation: 'hostedAccommodation',
    accommodations: 'accommodations',
    accomodationReviews: 'accomodation_reviews',
    accomodationReservations: 'accomodation_reservations',

    media: 'media',

    bookings: 'bookings',

    wishlist: 'wishlist',

    listOfSuggestions: 'list_of_suggestions',
    selectedLocation: 'selected_location',
  },

  mutation: {
    createAccount: 'create_account',
    editAccount: 'edit_account',

    verifyEmail: 'verify_email',

    logout: 'logout',

    addToWishlist: 'add_to_wishlist',
    deleteFromWishlist: 'delete_from_wishlist',
    updateUserImage: 'update_user_image',
  },
} as const;
