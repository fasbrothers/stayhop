import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCallback, useMemo, useState } from 'react';

import useEditAccountMutation from '@src/api/mutations/account/useEditAccountMutation';
import BackButton from '@src/components/button/BackButton';
import { LOCAL_STORAGE_KEYS } from '@src/config/local-storage.config';
import { DEFAULT_LANGUAGE } from '@src/constants';
import { useAppSelector } from '@src/hooks/redux-hooks';
import i18n from '@src/i18n/i18n';
import { getProfile } from '@src/stores/slices/authSlice';
import { SettingsInfo } from '@src/types/i18n.types';
import { ThemeMode } from '@src/types/profile.types';
import { convertCodeToLanguage, getValueFromLocalStorage } from '@src/utils';
import { useTranslation } from 'react-i18next';
import EditablePanel from '../EditablePanel';
import { ProfileLang } from './ProfileLang';

function ProfileSettings() {
  const profile = useAppSelector(getProfile);
  const { t } = useTranslation();
  const { language: userLang, id: profileId } = profile ?? {};

  const { mutate } = useEditAccountMutation(profileId ?? '');

  const uiTheme = useMemo(
    () => getValueFromLocalStorage<ThemeMode>(LOCAL_STORAGE_KEYS.uiTheme),
    []
  );

  const [theme, setTheme] = useState<ThemeMode>(uiTheme ?? ThemeMode.light);
  const language = useMemo(() => userLang || DEFAULT_LANGUAGE.code, [userLang]);

  const handleThemeChange = (e: SelectChangeEvent<ThemeMode>) => {
    const mode = e.target.value as ThemeMode;
    setTheme(mode);
    mutate({ uiTheme: mode });
  };
  const languageRenderProps = useCallback(
    (data: () => void) => <ProfileLang collapsePanel={data} userLang={language} />,
    [language]
  );

  return (
    <>
      <Stack direction={'row'} gap={4} alignItems={'center'} mb={{ xs: 6, md: 8, lg: 10 }}>
        <BackButton />

        <Typography variant={'heading'}>{t(SettingsInfo.title)}</Typography>
      </Stack>

      <Box maxWidth={'60rem'}>
        <Stack
          py={4}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          borderBottom={'1px solid'}
          borderTop={'1px solid'}
          borderColor={'secondary2.light'}
        >
          <Typography fontWeight={600}> {t(SettingsInfo.theme)}</Typography>
          <FormControl>
            <Select
              value={theme}
              onChange={handleThemeChange}
              size="small"
              labelId="profile-theme-select-label"
              id="profile-theme-select-label"
            >
              <MenuItem value={ThemeMode.light}> {i18n.t(SettingsInfo.light)}</MenuItem>
              <MenuItem value={ThemeMode.dark}> {i18n.t(SettingsInfo.dark)}</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <EditablePanel
          panelHeading={t(SettingsInfo.language)}
          initial={
            <Typography variant={'sm'} color={'secondary2.main'}>
              {convertCodeToLanguage(language)}
            </Typography>
          }
          editable={languageRenderProps}
        />
      </Box>
    </>
  );
}

export default ProfileSettings;
