import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

import LoadingImage from '@src/assets/loader.png';
import ErrorImage from '@src/assets/no-image.jpg';

const imageStates = {
  Loading: LoadingImage,
  Error: ErrorImage,
  Loaded: '',
};

type ImageState = keyof typeof imageStates;
type SingleImageProps = { image: string; name: string };

function CustomImage({ image, name }: SingleImageProps) {
  const [currentState, setCurrentState] = useState<ImageState>('Loading');

  useEffect(() => {
    const imageNew = new Image();
    imageNew.src = image;
    imageNew.onload = () => {
      setCurrentState('Loaded');
    };
    imageNew.onerror = () => {
      setCurrentState('Error');
    };
  }, [image]);

  return (
    <Box
      sx={{
        'transition': 'transform 0.5s ease',
        '&:hover': { transform: 'scale(1.1)' },
        '& img': {
          width: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          mx: 'auto',
          height: {
            xs: 270,
            sm: 300,
            md: 250,
            xl: 270,
          },
        },
      }}
    >
      <img src={imageStates[currentState] || image} alt={name} loading="lazy" />
    </Box>
  );
}

export default CustomImage;
