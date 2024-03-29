import { Add } from '@mui/icons-material';
import { Box, IconButton, Link, Stack, Typography } from '@mui/material';
import { useCallback, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link as RouterLink } from 'react-router-dom';

import { useGetAccommodations } from '@src/api/queries/accommodations/useGetAccommodations';
import BackButton from '@src/components/button/BackButton';
import { accommodationCardStyles } from '@src/components/card/acccommodationCard/accommodationCard.styles';
import CustomImage from '@src/components/shared/CustomImage';
import DataFetchError from '@src/components/shared/DataFetchError';
import { ROUTES } from '@src/config/routes.config';
import { useAppSelector } from '@src/hooks/redux-hooks';
import { getUser } from '@src/stores/slices/authSlice';
import { AccommodationType } from '@src/types/accommodation.types';
import { CreateAccommodationRoute, ErrorTypes } from '@src/types/i18n.types';
import { lineClampStyle } from '@src/utils';
import { useTranslation } from 'react-i18next';
import { mainStyles } from '../main/index.styles';
import AccommodationSkeleton from './components/AccommodationSkeleton';

export default function Accommodations() {
  const { t } = useTranslation();
  const profileId = useAppSelector(getUser)?.id ?? '';

  const { data, isPending, isError, hasNextPage, fetchNextPage } = useGetAccommodations(profileId);

  const accommodations = useMemo(
    () => data?.pages.reduce((acc, page) => [...acc, ...page.data], [] as AccommodationType[]),
    [data]
  );

  const handleNextPage = useCallback(() => fetchNextPage(), [fetchNextPage]);

  if (isError) {
    return <DataFetchError errorKey={ErrorTypes.accommodation_failed_to_get_list} />;
  }

  return (
    <Box>
      <Box
        display="flex"
        alignItems={{ xs: 'stretch', md: 'center' }}
        justifyContent="space-between"
        flexDirection={{ xs: 'column', md: 'row' }}
        mb={{ xs: 6, md: 8, lg: 10 }}
        gap={4}
      >
        <Stack direction={'row'} gap={4} alignItems={'center'}>
          <Box display={{ xs: 'block', md: 'none' }}>
            <BackButton />
          </Box>

          <Typography variant={'heading'}>{t(CreateAccommodationRoute.title_your_acc)}</Typography>
        </Stack>

        <Link component={RouterLink} to={ROUTES.accommodations.create} mx={{ xs: 'auto', md: 0 }}>
          <IconButton>
            <Add />
          </IconButton>
        </Link>
      </Box>

      {isPending && <AccommodationSkeleton />}

      {accommodations?.length === 0 ? (
        <Typography textAlign={'center'} variant={'h6'}>
          {t(CreateAccommodationRoute.no_acc_created)}
        </Typography>
      ) : (
        <InfiniteScroll
          dataLength={accommodations?.length || 0}
          next={handleNextPage}
          hasMore={hasNextPage}
          loader={<AccommodationSkeleton />}
        >
          <Box sx={mainStyles.accommmodationCard}>
            {accommodations?.map(({ id, title, thumbnailUrl, previewImgUrl, isDeleted, price }) => (
              <Link
                component={RouterLink}
                to={ROUTES.accommodations.details(id)}
                key={id}
                sx={accommodationCardStyles.root}
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <Box display="flex" flexDirection="column" gap={2}>
                  <Box width="100%" borderRadius={2} overflow="hidden" position="relative">
                    <CustomImage image={previewImgUrl || thumbnailUrl} name={`${id} thumbnail`} />
                    {isDeleted && (
                      <Box
                        position="absolute"
                        top={0}
                        right={0}
                        width="100%"
                        height="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
                        borderRadius="0 0 0 8px"
                        boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
                      >
                        <Typography
                          variant="caption"
                          color="error"
                          fontSize="large"
                          fontWeight="600"
                        >
                          {t(CreateAccommodationRoute.deleted)}
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  <Typography variant="body1" sx={lineClampStyle(1)}>
                    {title}
                  </Typography>
                  <Typography variant="body1" color="secondary2.main">
                    ${price}
                  </Typography>
                </Box>
              </Link>
            ))}
          </Box>
        </InfiniteScroll>
      )}
    </Box>
  );
}
