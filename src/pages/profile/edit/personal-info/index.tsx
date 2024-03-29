import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import useUpdateAccountImageMutation from '@src/api/mutations/account/useUpdateAccountImageMutation';
import BackButton from '@src/components/button/BackButton';
import LoadingPrimary from '@src/components/loader/LoadingPrimary';
import { QUERY_KEYS, queryClient } from '@src/config/react-query.config';
import { useAppSelector } from '@src/hooks/redux-hooks';
import i18n from '@src/i18n/i18n';
import { getProfile, getUser } from '@src/stores/slices/authSlice';
import {
  AccountEditPageInfo,
  AccountEditPersonalInfo,
  ProfileActions,
} from '@src/types/i18n.types';
import AddImage from '../../AddImage';
import EditablePanel from '../EditablePanel';
import Country from './EditCountry';
import Description from './EditDescription';
import FullName from './EditFullName';
import Gender from './EditGender';
import PhoneNumber from './EditPhoneNumber';

function PersonalInfo() {
  const user = useAppSelector(getUser);
  const profile = useAppSelector(getProfile);
  const imageUrl = profile?.imageUrl;
  const profileId = profile?.id;

  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
  const { t } = useTranslation();
  const { mutate } = useUpdateAccountImageMutation(newProfileImage);

  const updateUserImage = useCallback(() => {
    mutate(profileId, {
      onSuccess: () => {
        toast.success(t(ProfileActions.profile_image_change));
        queryClient
          .invalidateQueries({ queryKey: [QUERY_KEYS.query.user] })
          .catch((error) => console.error(error));
      },
    });
  }, [mutate, profileId, t]);

  const fullNameRenderProps = useCallback(
    (data: () => void) => (
      <FullName
        collapsePanel={data}
        initialFirstName={user?.firstName}
        initialLastName={user?.lastName}
      />
    ),
    [user?.firstName, user?.lastName]
  );

  const genderRenderProps = useCallback(
    (data: () => void) => <Gender collapsePanel={data} initialGender={profile?.gender} />,
    [profile?.gender]
  );

  const countryRenderProps = useCallback(
    (data: () => void) => <Country collapsePanel={data} initialCountry={profile?.country} />,
    [profile?.country]
  );

  const phoneNumberRenderProps = useCallback(
    (data: () => void) => <PhoneNumber collapsePanel={data} />,
    []
  );

  const descriptionRenderProps = useCallback(
    (data: () => void) => (
      <Description collapsePanel={data} initialDescription={profile?.description} />
    ),
    [profile?.description]
  );

  useEffect(() => {
    if (newProfileImage) {
      updateUserImage();
    }
  }, [newProfileImage, updateUserImage]);

  if (!user || !profile) return <LoadingPrimary />;

  return (
    <>
      <Stack direction={'row'} gap={4} alignItems={'center'} mb={{ xs: 6, md: 8, lg: 10 }}>
        <BackButton />

        <Typography variant={'heading'}>{t(AccountEditPageInfo.personal_info)}</Typography>
      </Stack>

      <Stack direction={{ md: 'row' }}>
        <Box mr={{ md: 12, lg: 20 }} mb={{ xs: 12 }}>
          <AddImage imageUrl={imageUrl} setNewProfileImage={setNewProfileImage} />
        </Box>

        <Box
          flexGrow={1}
          sx={{
            '& > *:first-of-type': {
              paddingTop: 0,
            },
          }}
        >
          <EditablePanel
            panelHeading={t(AccountEditPersonalInfo.legal_name)}
            initial={
              <Typography variant={'sm'} color={'secondary2.main'}>
                {user.firstName + ' ' + user.lastName}
              </Typography>
            }
            editable={fullNameRenderProps}
          />

          <EditablePanel
            panelHeading={t(AccountEditPersonalInfo.your_gender)}
            initial={
              <Typography variant={'sm'} color={'secondary2.main'}>
                {profile.gender}
              </Typography>
            }
            editable={genderRenderProps}
          />

          <EditablePanel
            panelHeading={t(AccountEditPersonalInfo.where_do_live)}
            initial={
              <Typography variant={'sm'} color={'secondary2.main'}>
                {profile.country}
              </Typography>
            }
            editable={countryRenderProps}
          />

          <EditablePanel
            panelHeading={t(AccountEditPersonalInfo.phone_number)}
            initial={
              <Typography variant={'sm'} color={'secondary2.main'}>
                {profile.phoneNumber}
              </Typography>
            }
            editable={phoneNumberRenderProps}
          />

          <EditablePanel
            panelHeading={t(AccountEditPersonalInfo.about_title)}
            initial={
              <Typography variant={'sm'} color={'secondary2.main'}>
                {i18n.t(AccountEditPersonalInfo.about_desc)}
              </Typography>
            }
            editable={descriptionRenderProps}
          />
        </Box>
      </Stack>
    </>
  );
}

export default PersonalInfo;
