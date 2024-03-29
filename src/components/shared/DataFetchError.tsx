import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { ErrorTypes } from '@src/types/i18n.types';

function DataFetchError({
  errorKey = ErrorTypes.default,
  position = 'center',
}: {
  errorKey?: string;
  position?: 'start' | 'center' | 'end';
}) {
  const { t } = useTranslation();
  const error = t(errorKey);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: position,
        alignItems: 'center',
        height: '50vh',
      }}
    >
      <Typography color="error">{error}</Typography>
    </Box>
  );
}

export default DataFetchError;
