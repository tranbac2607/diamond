import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import useToast from '@/hooks/use-toast';
import { selectAuthState, setRenderHeaderInfo } from '@/store/auth-slice';

import { CODE_SUCCESS } from '@/common/constant';
import { verifyEmailApi } from '@/services/auth';
import { VerifyEmailRequest } from '@/models/auth';

import Verify from '@/component/verify/verify';
import Loading from '@/component/common/loading/loading';

const VerifyPage = () => {
  const router = useRouter();
  const { notify } = useToast();

  const dispatch = useDispatch();

  const authState = useSelector(selectAuthState);
  const { emailVerify } = authState;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVerifyError, setIsVerifyError] = useState<boolean>(false);

  const handleSubmitVerify = async (code: string) => {
    setIsLoading(true);
    const payload: VerifyEmailRequest = {
      code,
      email: emailVerify,
    };
    const res = await verifyEmailApi(payload);
    if (res.code === CODE_SUCCESS) {
      setIsVerifyError(false);

      dispatch(setRenderHeaderInfo(Date.now()));

      notify('success', 'Verify successfully!');
      localStorage.setItem('TOKEN', res.data.token);
      localStorage.setItem('USER', JSON.stringify(res.data.user));

      router.push('/list-exam');
    } else {
      setIsVerifyError(true);
      notify('error', 'Wrong code!');
    }
    setIsLoading(false);
  };
  return (
    <>
      <Loading loading={isLoading} />
      <Verify
        emailVerify={emailVerify}
        isVerifyError={isVerifyError}
        onSubmitVerify={handleSubmitVerify}
      />
    </>
  );
};

export default VerifyPage;
