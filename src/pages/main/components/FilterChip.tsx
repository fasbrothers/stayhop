import { Chip } from '@mui/material';
import { useCallback } from 'react';

import { ObjType } from '@src/types/accommodation.types';
import { MuiStylesObject } from '@src/types/utility.types';

interface FilterChipProps {
  minItem: number | string;
  item: ObjType;
  onSelect: (id: string | number) => void;
}

function FilterChip({ minItem, item, onSelect }: FilterChipProps) {
  const { name, id } = item;

  const handleChipClick = useCallback(() => {
    onSelect(id);
  }, [onSelect, id]);

  const chipStyles = {
    root: {
      'transition': 'all 0.2s ease-in-out',
      'fontWeight': 'bold',
      'border': '1px solid',
      'padding': '10px',
      'paddingY': '18px',
      'cursor': 'pointer',
      'backgroundColor': minItem === id ? 'primary.main' : 'transparent',
      'color': minItem === id ? 'background.default' : 'primary.main',
      ':hover': {
        color: minItem === id ? 'background.default' : 'primary.main',
        borderColor: 'primary.main',
        backgroundColor: minItem === id ? 'primary.main' : 'transparent',
      },
      'borderColor': 'secondary2.main',
    },
  } satisfies MuiStylesObject;

  return (
    <Chip
      sx={chipStyles.root}
      label={name}
      variant="filled"
      onClick={handleChipClick}
      color="secondary"
    />
  );
}

export default FilterChip;
