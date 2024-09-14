import { LoginRegisterRequest, LoginRegisterResponse } from '../../interfaces/User';
import baseApi from '../api';

const auth = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginRegisterResponse, LoginRegisterRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<LoginRegisterResponse, LoginRegisterRequest>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRegisterMutation
} = auth;
