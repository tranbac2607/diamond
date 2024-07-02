import { ReactNode, useEffect } from 'react';
import Head from 'next/head';

import { useDispatch, useSelector } from 'react-redux';
import { selectAuthState } from '@/store/auth-slice';
import useGetAccountInfo from '@/hooks/use-get-account-info';

import './layout.scss';
import { Header } from './header/header';
import Footer from './footer/footer';

type LayoutProps = {
  readonly children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const dispatch = useDispatch();
  const authState = useSelector(selectAuthState);
  const { role } = useGetAccountInfo();

  return (
    <div style={{ overflow: 'auto' }}>
      <Head>
        <title>Super Diamond</title>
      </Head>
      <Header />
      <main className='main-container'>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
