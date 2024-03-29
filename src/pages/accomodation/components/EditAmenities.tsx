import { Check } from '@mui/icons-material';
import { Box, Button, List, ListItem, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { useSaveAmenitiesMutation } from '@src/api/mutations/amenity/useSaveAmenitiesMutation';
import { useGetAmenityListQuery } from '@src/api/queries/amenity/useGetAmenityListQuery';
import LoadingPrimary from '@src/components/loader/LoadingPrimary';
import { QUERY_KEYS } from '@src/config/react-query.config';
import { ROUTES } from '@src/config/routes.config';
import { Amenities, AmenitiesProps, AmenitySetting } from '@src/types/amenity.types';
import { Amenities as AmenitiesTr, CreateAccommodationRoute } from '@src/types/i18n.types';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CustomChip from './CustomChip';

export default function EditAmenities({
  accommodationId,
  isNew,
  accommodationAmenities,
}: AmenitiesProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentAmenities, setCurrentAmenities] = useState<AmenitySetting[] | undefined>(undefined);
  const [otherAmenities, setOtherAmenities] = useState<string[]>([]);

  const { data: amenities } = useGetAmenityListQuery();
  const queryClient = useQueryClient();

  const { mutate, isSuccess } = useSaveAmenitiesMutation(accommodationId);

  useEffect(() => {
    const invalidate = async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.query.accommodation, accommodationId],
      });
    };
    if (isSuccess) {
      isNew
        ? toast.success(t(AmenitiesTr.create_success))
        : toast.success(t(AmenitiesTr.edit_success));
      navigate(ROUTES.accommodations.root);
      void invalidate();
    }
  }, [isSuccess, t, navigate, accommodationId, queryClient, isNew]);

  useEffect(() => {
    if (amenities) {
      const existingAmenities = accommodationAmenities || {};
      const otherAmenitiesStr = existingAmenities.otherAmenities as string;
      const otherAmenities = otherAmenitiesStr?.trim() ? otherAmenitiesStr.split(',') : [];

      setCurrentAmenities(
        amenities.map((amenity) => ({
          ...amenity,
          added: existingAmenities[amenity.id] as boolean,
        }))
      );

      setOtherAmenities(otherAmenities);
    }
  }, [accommodationAmenities, amenities]);

  const handleSelect = useCallback(
    (id: string) => {
      if (currentAmenities) {
        const updatedAmenities = currentAmenities.map((amenity) =>
          amenity.id === id ? { ...amenity, added: !amenity.added } : amenity
        );
        setCurrentAmenities(updatedAmenities);
      }
    },
    [currentAmenities]
  );

  const removeCustomAmenity = useCallback((amenity: string) => {
    setOtherAmenities((prev) => prev.filter((a) => a !== amenity));
  }, []);

  const saveAmenities = useCallback(() => {
    const amenitiesToSave = currentAmenities?.reduce(
      (acc, amenity) => {
        acc[amenity.id] = Boolean(amenity.added);
        return acc;
      },
      { otherAmenities: otherAmenities.join(',') } as Amenities
    );

    if (!amenitiesToSave) {
      toast.error(t(AmenitiesTr.no_amenities_selected));
      return;
    }

    mutate({ amenitiesToSave, isNewAccomodation: isNew });
  }, [currentAmenities, mutate, isNew, otherAmenities, t]);

  const handleSaveAmenities = useCallback(() => {
    void saveAmenities();
  }, [saveAmenities]);

  return (
    <Box
      component="section"
      sx={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <Typography variant="h4" component="h2">
        {isNew
          ? `${t(CreateAccommodationRoute.add_aminities)}`
          : `${t(CreateAccommodationRoute.edit)} ${t(CreateAccommodationRoute.amenities)}`}
      </Typography>
      {currentAmenities ? (
        <>
          <Box
            sx={{
              maxWidth: '700px',
              flexGrow: 1,
              gap: '10px',
            }}
          >
            <List
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {currentAmenities.map((amenity) => (
                <ListItem
                  key={amenity.id}
                  sx={{
                    width: 'fit-content',
                    display: 'block',
                  }}
                >
                  <CustomChip
                    label={amenity.name}
                    icon={amenity.icon}
                    selected={amenity.added}
                    handleSelect={() => handleSelect(amenity.id)}
                  />
                </ListItem>
              ))}
              {otherAmenities.map((amenity) => (
                <ListItem
                  key={amenity}
                  sx={{
                    width: 'fit-content',
                    display: 'block',
                  }}
                >
                  <CustomChip
                    label={amenity}
                    icon={<Check />}
                    selected={true}
                    onDelete={() => removeCustomAmenity(amenity)}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              borderRadius: '100px',
              padding: '10px 20px',
              fontWeight: 'bold',
              mt: '20px',
            }}
            onClick={handleSaveAmenities}
          >
            {t(CreateAccommodationRoute.save_btn)}
          </Button>
        </>
      ) : (
        <LoadingPrimary />
      )}
    </Box>
  );
}
