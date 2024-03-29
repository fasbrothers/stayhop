import { useInfiniteQuery } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { AMOUNT_PER_PAGE } from '@src/config/pagination.config';
import { ResponseAccommodationList } from '@src/types/accommodation.types';

interface AccommodationsQueryProps {
  searchParamsAsObject: Record<string, string | null>;
}

function useGetAccommodationsQuery({ searchParamsAsObject }: AccommodationsQueryProps) {
  return useInfiniteQuery({
    queryKey: ['accommodations', searchParamsAsObject],
    queryFn: async ({ pageParam }) => {
      const {
        limit,
        minPrice,
        maxPrice,
        minRooms,
        minPeople,
        orderByPrice,
        orderByPeople,
        orderByRoom,
        location,
        checkInDate,
        checkOutDate,
      } = searchParamsAsObject;

      const { data } = await httpClient.get<ResponseAccommodationList>(
        ENDPOINTS.accommodation.root,
        {
          params: {
            page: pageParam,
            limit: limit || AMOUNT_PER_PAGE,
            maxPrice: Number(maxPrice) || null,
            minPrice: Number(minPrice) || null,
            minRooms: Number(minRooms) || null,
            minPeople: Number(minPeople) || null,
            orderByPrice: orderByPrice == 'any' ? null : orderByPrice,
            orderByPeople: orderByPeople == 'any' ? null : orderByPeople,
            orderByRoom: orderByRoom == 'any' ? null : orderByRoom,
            location: location || null,
            checkInDate: checkInDate || null,
            checkOutDate: checkOutDate || null,
          },
        }
      );

      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < lastPage.totalCount / AMOUNT_PER_PAGE) {
        return pages.length + 1;
      }
      return;
    },
  });
}

export default useGetAccommodationsQuery;
