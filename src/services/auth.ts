import {
  AuthResponse,
  LoginType,
  RegisterType,
  VerifyEmailReponse,
  VerifyEmailRequest,
} from '@/models/auth';
import api from '../api';

export const registerApi = async (payload: RegisterType) => {
  try {
    const res = await api.post('api/Auth/register', { ...payload });
    return res.data;
  } catch (error) {
    return false;
  }
};

export const loginApi = async (payload: LoginType) => {
  try {
    const res = await api.post('/api/Auth/login', {
      ...payload,
    });
    return res.data;
  } catch (error) {
    return undefined;
  }
};

// export const verifyEmailApi = async (payload: VerifyEmailRequest) => {
//   try {
//     const res: BaseResponse<any> = await api.post('/api/v2/users/verify-email', {
//       ...payload,
//     });
//     return res.data;
//   } catch (error) {
//     return false;
//   }
// };

// export const getUserInfoApi = async () => {
//   try {
//     const res: BaseResponse<any> = await api.get('/api/v2/users/info');
//     return res.data;
//   } catch (error) {
//     return false;
//   }
// };
