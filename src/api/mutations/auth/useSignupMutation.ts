import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { ROUTES } from '@src/config/routes.config';
import { SignUpReq } from '@src/types/auth.types';

const useSignupMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (values: SignUpReq) => {
      await httpClient.post(ENDPOINTS.auth.signUp, values);
    },
    onSuccess: () => {
      navigate(ROUTES.auth.confirmEmail);
    },
  });
};

export default useSignupMutation;
