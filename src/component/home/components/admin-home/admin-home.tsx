import { useEffect, useState } from 'react';
import { Tabs, TabsProps } from 'antd';

import { CODE_SUCCESS } from '@/constant/common';
import { getListEmployeeApi, getListResultApi } from '@/services/account';
import Loading from '@/component/common/loading/loading';
import { Employee } from '@/models/account';

import { TAB_ADMIN_KEY } from '../../home.constant';
import { transformListResultData } from '../staff-home/staff-home.utils';
import { ListResult } from '../staff-home/staff-home.model';
import ListResultTable from '../staff-home/components/list-result';
import ListEmployee from './components/list-employee';

const AdminHome = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [listEmployees, setListEmployees] = useState<Employee[]>([]);
  const [listResult, setListResult] = useState<ListResult[]>([]);
  const [loadListResultKey, setLoadListResultKey] = useState(0);
  const [loadDataEmployeeKey, setLoadDataEmployeeKey] = useState(0);

  const getListResult = async () => {
    setIsLoading(true);
    const res = await getListResultApi();
    if (res?.status === CODE_SUCCESS) {
      const dataSourceRevert = transformListResultData(res.data);
      setListResult(dataSourceRevert);
    }
    setIsLoading(false);
  };

  const getListEmployee = async () => {
    setIsLoading(true);
    const res = await getListEmployeeApi();
    if (res?.status === CODE_SUCCESS) {
      setListEmployees(res.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getListEmployee();
  }, [loadDataEmployeeKey]);

  useEffect(() => {
    getListResult();
  }, [loadListResultKey]);

  const LIST_ACTION_TAB: TabsProps['items'] = [
    {
      key: TAB_ADMIN_KEY.EMPLOYEES,
      label: 'Danh sách nhân viên',
      children: (
        <ListEmployee dataSource={listEmployees} setLoadDataEmployeeKey={setLoadDataEmployeeKey} />
      ),
    },
    {
      key: TAB_ADMIN_KEY.REQUEST_ORDER,
      label: 'Danh sách đơn kiểm định cần duyệt',
      children: (
        <ListResultTable
          isAdmin
          dataSource={listResult}
          setLoadListResultKey={setLoadListResultKey}
        />
      ),
    },
  ];

  return (
    <>
      <Loading loading={isLoading} />
      <Tabs defaultActiveKey={TAB_ADMIN_KEY.CUSTOMERS} items={LIST_ACTION_TAB} />
    </>
  );
};

export default AdminHome;
