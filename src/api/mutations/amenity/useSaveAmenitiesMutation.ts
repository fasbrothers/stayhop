import { useMutation } from '@tanstack/react-query';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { Amenities, EditAmenitiesResponse } from '@src/types/amenity.types';

type Params = {
  amenitiesToSave: Amenities;
  isNewAccomodation: boolean;
};

const createAmenities = async (amenitiesToSave: Amenities, accomodationId: string) => {
  const { data } = await httpClient.post<EditAmenitiesResponse>(
    ENDPOINTS.amenity.root(accomodationId),
    amenitiesToSave
  );
  return data;
};

const updateAmenities = async (amenitiesToSave: Amenities, accomodationId: string) => {
  const { data } = await httpClient.put<EditAmenitiesResponse>(
    ENDPOINTS.amenity.root(accomodationId),
    amenitiesToSave
  );
  return data;
};

export const useSaveAmenitiesMutation = (accomodationId: string) => {
  return useMutation({
    mutationFn: async ({ amenitiesToSave, isNewAccomodation }: Params) => {
      if (isNewAccomodation) return await createAmenities(amenitiesToSave, accomodationId);
      else return await updateAmenities(amenitiesToSave, accomodationId);
    },
  });
};
