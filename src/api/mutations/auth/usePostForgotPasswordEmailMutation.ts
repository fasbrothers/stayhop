import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import httpClient from '@src/api/httpClient';
import { ENDPOINTS } from '@src/config/endpoints.config';
import { ROUTES } from '@src/config/routes.config';
import { CommonResponse } from '@src/types/auth.types';

function usePostForgotPasswordEmailMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (email: string) => {
      const { data } = await httpClient.post<CommonResponse>(ENDPOINTS.auth.forgotPasswordEmail, {
        email,
      });
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate(ROUTES.root);
    },
  });
}

export default usePostForgotPasswordEmailMutation;
