import { useState } from 'react';

import Loading from '@/component/common/loading/loading';
import Login from '@/component/login/login';

import { LoginType } from '@/models/auth';
import { loginApi } from '@/services/auth';

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async (values: LoginType) => {
    setIsLoading(true);
    const res = await loginApi({ ...values });
    console.log(res);

    // if (res.code === CODE_SUCCESS) {
    //   router.push('/verify');
    //   notify('success', 'Register successfully, please verify!');
    //   dispatch(setEmailVerify(values.email));
    // } else {
    //   notify('error', 'Something error!');
    // }
    setIsLoading(false);
  };

  return (
    <div className='page-container'>
      <Loading loading={isLoading} />
      <Login onClickLogin={handleRegister} />
    </div>
  );
};

export default SignInPage;
