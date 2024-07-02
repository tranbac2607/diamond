import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import { Avatar, Dropdown, Menu, MenuProps, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';
import useGetAccountInfo from '@/hooks/use-get-account-info';
import { selectAuthState, setRenderHeaderInfo } from '@/store/auth-slice';
import useToast from '@/hooks/use-toast';

import {
  ADMIN_ADVANCE_USER,
  ADVANCE_USER_KEY,
  LIST_ADVANCE_USER,
  LIST_MENU,
} from './header-feature.constant';

import { logoutApi } from '@/services/auth';
import { CODE_SUCCESS } from '@/constant/common';

import DiamondButton from '@/component/common/button';
import logo from '~/assets/images/logo.jpg';
import './header-feature.scss';
import DetailAccountModal from './components/detail-account';
import { ACCOUNT_ROLE } from '@/constant/auth';

const HeaderFeature = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { notify } = useToast();
  const pathname = usePathname();
  const { customerName: name, role } = useGetAccountInfo();

  const authState = useSelector(selectAuthState);

  const [currentTab, setCurrentTab] = useState('/');
  const [customerName, setCustomerName] = useState('');

  const [isOpenDetailAccount, setIsOpenDetailAccount] = useState(false);

  useEffect(() => {
    const currentPathName = pathname?.replace('/', '');
    setCurrentTab(currentPathName || '/');
  }, [pathname]);

  useEffect(() => {
    setCustomerName(name || '');
  }, [authState.renderHeaderInfo, name]);

  const handleClickMenuItem: MenuProps['onClick'] = (e) => {
    setCurrentTab(e.key);
    router.push(e.key);
  };

  const handleToLogin = () => {
    router.push('/login');
  };

  const handleMenuClick: MenuProps['onClick'] = async (e) => {
    if (e.key === ADVANCE_USER_KEY.LOGOUT) {
      const res = await logoutApi();

      if (res?.status === CODE_SUCCESS) {
        notify('success', 'Đăng xuất thành công');
        localStorage.clear();
        router.push('/login');
        dispatch(setRenderHeaderInfo(Date.now()));
      } else {
        notify('error', 'Something error!');
      }
    } else {
      setIsOpenDetailAccount(true);
    }
  };
  return (
    <>
      <header className='header-outer'>
        <div className='header-inner responsive-wrapper'>
          <div className='d-flex'>
            <Link href='/'>
              <Image src={logo} alt='logo' width={60} height={60} />
            </Link>

            {role === ACCOUNT_ROLE.ADMIN || role === ACCOUNT_ROLE.STAFF ? (
              <></>
            ) : (
              <Menu
                onClick={handleClickMenuItem}
                selectedKeys={[currentTab]}
                mode='horizontal'
                items={LIST_MENU}
                style={{ height: '46px', margin: '4px 0 0 40px', minWidth: '700px' }}
              />
            )}
          </div>
          <div className='right-header-container'>
            {role ? (
              <Dropdown
                menu={{
                  items: [ACCOUNT_ROLE.ADMIN, ACCOUNT_ROLE.STAFF].includes(role)
                    ? ADMIN_ADVANCE_USER
                    : LIST_ADVANCE_USER,
                  onClick: handleMenuClick,
                }}
                placement='bottom'
              >
                <Typography.Title style={{ cursor: 'pointer' }} level={3}>
                  {role === ACCOUNT_ROLE.ADMIN
                    ? 'Admin'
                    : role === ACCOUNT_ROLE.STAFF
                    ? 'Nhân viên'
                    : customerName}{' '}
                  <Avatar size={40} icon={<UserOutlined />} />
                </Typography.Title>
              </Dropdown>
            ) : (
              <DiamondButton content='Đăng nhập' onClick={handleToLogin} />
            )}
          </div>
        </div>

        <DetailAccountModal
          isOpenDetailAccount={isOpenDetailAccount}
          setIsOpenDetailAccount={setIsOpenDetailAccount}
        />
      </header>
    </>
  );
};

export default HeaderFeature;
