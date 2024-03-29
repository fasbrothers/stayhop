import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useCallback, useState } from 'react';

import useGetReviewsQuery from '@src/api/queries/reviews/useGetReviewsQuery';
import LoadingPrimary from '@src/components/loader/LoadingPrimary';
import { ReviewList } from '@src/types/i18n.types';
import { useTranslation } from 'react-i18next';
import { Review } from './Review';

export const Reviews = ({ accommodationId }: { accommodationId: string }) => {
  const { t } = useTranslation();
  const { data: reviews, isLoading } = useGetReviewsQuery(accommodationId);
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down('md'));

  const toggleModal = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  if (isLoading) return <LoadingPrimary />;

  return reviews?.data?.length ? (
    <Box>
      <Stack
        alignItems={'center'}
        pb={12}
        borderBottom={'1px solid'}
        borderColor={'secondary2.light'}
        mb={12}
      >
        <Typography fontSize={'2rem'}>{t(ReviewList.title)}</Typography>
        <Typography fontSize={'3.5rem'} fontWeight={600}>
          {reviews.averageRate.toFixed(1)}
        </Typography>
        <Rating
          readOnly
          value={reviews.averageRate}
          precision={0.1}
          sx={{
            '& .MuiRating-iconFilled': {
              color: 'secondary.main',
            },
            'fontSize': '2rem',
            'flexShrink': 0,
          }}
        />
      </Stack>

      <Grid container spacing={{ xs: 8, lg: 16 }}>
        {reviews.data.slice(0, 4).map((review) => (
          <Grid key={review.id} item xs={12} lg={6}>
            <Review review={review} />
          </Grid>
        ))}
      </Grid>

      <Button
        onClick={toggleModal}
        variant={'outlined'}
        sx={{
          display: 'block',
          mt: { xs: 8, lg: 16 },
          mr: 'auto',
          fontWeight: 600,
          textTransform: 'none',
        }}
      >
        {t(ReviewList.show_all)} {reviews.totalCount} {t(ReviewList.reviews)}
      </Button>

      {/* Modal */}
      <Dialog open={open} onClose={toggleModal} maxWidth={'md'} fullScreen={mobileScreen}>
        <Stack
          direction={{ xs: 'row-reverse', md: 'row' }}
          sx={{
            px: { xs: 6, md: 8 },
            py: { xs: 2, md: 4 },
            alignItems: 'center',
            borderBottom: '1px solid',
            borderColor: 'secondary2.light',
          }}
        >
          <Typography
            fontWeight={'fontWeightMedium'}
            mr={{ xs: 'auto', md: 0 }}
            fontSize={'1.25rem'}
          >
            Reviews
          </Typography>

          <IconButton
            aria-label="close"
            onClick={toggleModal}
            sx={{ ml: { xs: 0, md: 'auto' }, padding: 0 }}
          >
            {mobileScreen ? <KeyboardArrowLeftRoundedIcon fontSize="large" /> : <CloseIcon />}
          </IconButton>
        </Stack>

        <DialogContent sx={{ p: 0 }}>
          <Stack gap={8} px={8} py={4}>
            {reviews.data.map((review) => (
              <Review key={review.id} review={review} />
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  ) : (
    <Box>
      <Typography variant={mobileScreen ? 'lg' : 'xl'} fontWeight={600}>
        No reviews (yet)
      </Typography>
    </Box>
  );
};
