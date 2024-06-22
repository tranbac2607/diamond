import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { Avatar, Dropdown, Menu, MenuProps, Typography } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { selectAuthState } from '@/store/auth-slice';

import {
  ContactsOutlined,
  HomeOutlined,
  MoneyCollectOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';

import DiamondButton from '@/component/common/button';

import logo from '~/assets/images/logo.jpg';
import './header.scss';
import Link from 'next/link';

const { Title } = Typography;
type MenuItem = Required<MenuProps>['items'][number];

const listMenu: MenuItem[] = [
  {
    label: 'Trang chủ',
    key: '',
    icon: <HomeOutlined />,
  },
  {
    label: 'Giới thiệu',
    key: 'introduce',
    icon: <SolutionOutlined />,
  },
  {
    label: 'Blogs',
    key: 'blogs',
    icon: <SmileOutlined />,
  },
  {
    label: 'Dịch vụ',
    key: 'service',
    icon: <MoneyCollectOutlined />,
  },
  {
    label: 'Liên hệ',
    key: 'contact',
    icon: <ContactsOutlined />,
  },
];

const listAdvanceUser: MenuProps['items'] = [
  {
    key: '1',
    label: 'Xem chi tiết tài khoản',
  },
  {
    key: '2',
    label: 'Đăng xuất',
  },
];

export const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const authState = useSelector(selectAuthState);

  const [currentTab, setCurrentTab] = useState('mail');
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const user = localStorage.getItem('USER');
    if (user) {
      setUserInfo(JSON.parse(user));
    } else {
      setUserInfo(null);
    }
  }, [authState.renderHeaderInfo]);

  const handleClickMenuItem: MenuProps['onClick'] = (e) => {
    setCurrentTab(e.key);
    router.push(e.key);
  };

  const handleToLogin = () => {
    router.push('/login');
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log(e.key);
  };

  return (
    <header className='header-outer'>
      <div className='header-inner responsive-wrapper'>
        <div className='d-flex'>
          <Link href='/'>
            <Image src={logo} alt='logo' width={60} height={60} />
          </Link>

          <Menu
            onClick={handleClickMenuItem}
            selectedKeys={[currentTab]}
            mode='horizontal'
            items={listMenu}
            style={{ height: '46px', margin: '4px 0 0 40px' }}
          />
        </div>
        <div className='right-header-container'>
          {Object.keys(userInfo ? userInfo : {}).length !== 0 ? (
            <Dropdown
              menu={{ items: listAdvanceUser, onClick: handleMenuClick }}
              placement='bottom'
            >
              <Title style={{ cursor: 'pointer' }} level={3}>
                Tran Van Bac <Avatar size={40} icon={<UserOutlined />} />
              </Title>
            </Dropdown>
          ) : (
            <DiamondButton content='Đăng nhập' onClick={handleToLogin} />
          )}
        </div>
      </div>
    </header>
  );
};
