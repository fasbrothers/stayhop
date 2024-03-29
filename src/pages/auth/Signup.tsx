import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Divider, Link, Stack, Typography } from '@mui/material';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import useSignupMutation from '@src/api/mutations/auth/useSignupMutation';
import ButtonPrimary from '@src/components/button/ButtonPrimary';
import InputForm from '@src/components/input/InputForm';
import PasswordInput from '@src/components/input/PasswordInput';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { PROJECT_NAME } from '@src/constants';
import { SignUpReq, signUpSchema } from '@src/types/auth.types';
import { HomeUIInfo, LoginAndSecurityInfo } from '@src/types/i18n.types';
import GoogleLoginButton from './components/GoogleLoginButton';
import { styles } from './styles';

const Signup = () => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpReq>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
  });
  const { mutate, isPending } = useSignupMutation();

  const onSubmit = useCallback(
    (inputdata: SignUpReq) => {
      mutate(inputdata);
    },
    [mutate]
  );

  return (
    <Box sx={styles.formContainer}>
      <Typography variant="subtitle1" align="center" margin={5} fontWeight="bold">
        {t(HomeUIInfo.sing_out_sing_up_btn)}
      </Typography>
      <Divider />
      <Stack p={4} spacing={3}>
        <Typography variant="h5">
          {t(HomeUIInfo.sing_out_sing_title, { name: PROJECT_NAME })}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={3}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <InputForm
                  {...field}
                  type="email"
                  placeholder={t(LoginAndSecurityInfo.email)}
                  label={t(LoginAndSecurityInfo.email)}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <PasswordInput
              name="password"
              label={t(LoginAndSecurityInfo.password_input)}
              placeholder={t(LoginAndSecurityInfo.password_input)}
              control={control}
              errors={errors}
            />
            <PasswordInput
              name="confirm_password"
              label={t(LoginAndSecurityInfo.password_confirm)}
              placeholder={t(LoginAndSecurityInfo.password_confirm)}
              control={control}
              errors={errors}
            />
          </Stack>
          <ButtonPrimary loading={isPending}> {t(HomeUIInfo.sing_out_sing_up_btn)}</ButtonPrimary>
        </form>

        <Typography variant="subtitle2" align="center" color="secondary2.main">
          {t(HomeUIInfo.sing_out_desc)}
          <Link component={RouterLink} to={ENDPOINTS.auth.signIn} sx={styles.formLink}>
            {' '}
            {t(HomeUIInfo.sing_in_link)}
          </Link>
        </Typography>
      </Stack>
      <GoogleLoginButton />
    </Box>
  );
};

export default Signup;
