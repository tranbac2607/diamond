import { useState } from 'react';

import Loading from '@/component/common/loading/loading';
import Register from '@/component/register/register';
import { RegisterType } from '@/models/auth';
import useToast from '@/hooks/use-toast';

import { registerApi } from '@/services/auth';

const RegisterPage = () => {
  const { notify } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async (values: RegisterType) => {
    setIsLoading(true);
    const res = await registerApi({ ...values });
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
      <Register onRegister={handleRegister} />
    </div>
  );
};

export default RegisterPage;
