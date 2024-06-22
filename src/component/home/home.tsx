import Image from 'next/image';
import './home.scss';
import Button from '../common/button/button';
import { LIST_ROUTER } from '@/common/constant';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  const handleToExam = () => {
    router.push(LIST_ROUTER.LIST_EXAM);
  };

  return (
    <>
      <div className='background-container'>
        {/* <Image
          src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/moon2.png'
          width={100}
          height={100}
          alt=''
        /> */}
        <div className='stars'></div>
        <div className='twinkling'></div>
        <div className='clouds'></div>
      </div>
      <div className='d-flex align-items-center justify-content-center'>
        <Button text='Go to exam' onClick={handleToExam} />
      </div>
    </>
  );
};

export default Home;
