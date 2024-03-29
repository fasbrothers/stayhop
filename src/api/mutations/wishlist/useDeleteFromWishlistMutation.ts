import { useMutation } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { QUERY_KEYS, queryClient } from '@src/config/react-query.config';
import { CommonResponse } from '@src/types/auth.types';

function useDeleteFromWishlistMutation() {
  return useMutation({
    mutationKey: [QUERY_KEYS.mutation.deleteFromWishlist],

    mutationFn: async (accommodationId: string) => {
      const { data } = await httpClient.delete<CommonResponse>(
        ENDPOINTS.wishlist.deleteFromWishlist(accommodationId)
      );
      return data;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.wishlist],
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.accommodations],
      });
    },
  });
}

export default useDeleteFromWishlistMutation;
