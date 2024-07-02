import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthState } from '@/store/auth-slice';

type AccountInfo = {
  customerId: string | null;
  customerName: string | null;
  role: string | null;
  employeeId: string | null;
};

const useGetAccountInfo = () => {
  const authState = useSelector(selectAuthState);
  const [accountInfo, setAccountInfo] = useState<AccountInfo | undefined>(undefined);

  useEffect(() => {
    const customerId = localStorage.getItem('CUSTOMER_ID');
    const customerName = localStorage.getItem('CUSTOMER_NAME');
    const role = localStorage.getItem('ROLE');
    const employeeId = localStorage.getItem('EMPLOYEE_ID');

    setAccountInfo({ customerId, customerName, role, employeeId });
  }, [authState.renderHeaderInfo]);

  return {
    customerId: Number(accountInfo?.customerId) || 0,
    customerName: accountInfo?.customerName,
    role: Number(accountInfo?.role),
    employeeId: Number(accountInfo?.employeeId),
  };
};

export default useGetAccountInfo;
