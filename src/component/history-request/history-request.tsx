import { useEffect, useState } from 'react';
import { Space, Table, TableProps } from 'antd';
import useGetAccountInfo from '@/hooks/use-get-account-info';

import { HistoryRequestCustomer } from './history-request.model';
import DiamondButton from '../common/button';
import { SETTING_SCROLL_TABLE } from '../home/home.constant';
import Loading from '../common/loading/loading';
import { downloadCertificateApi, getListBookingCustomerApi } from '@/services/account';
import { CODE_SUCCESS } from '@/constant/common';
import { transformServiceBooking } from './history-request.utils';
import PaymentDialog from '../services/components/payment-dialog';

const STATUS = {
  WAIT_TO_PAY: 'Chờ thanh toán',
  PAYMENTED: 'Đã thanh toán',
  ACCREDITATION: 'Kiểm định thành công',
};

const HistoryRequest = () => {
  const { customerId } = useGetAccountInfo();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<HistoryRequestCustomer[]>([]);

  const [isOpenPaymentDialog, setIsOpenPaymentDialog] = useState(false);
  const [loadDataKey, setLoadDataKey] = useState(0);
  const [requestId, setRequestId] = useState(0);
  const [serviceId, setServiceId] = useState('1');

  const handleOpenDialogPayment = (rowData: HistoryRequestCustomer) => {
    setRequestId(rowData.requestId);
    setServiceId(rowData.serviceId);
    setIsOpenPaymentDialog(true);
  };

  const handleDownLoadCertificate = async (requestId: number) => {
    setIsLoading(true);
    const res = await downloadCertificateApi(requestId);
    if (res?.status === CODE_SUCCESS) {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(new Blob([res.data], { type: 'PDF' }));
      link.download = decodeURI('test');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    }

    setIsLoading(false);
  };

  const historyColumns: TableProps<HistoryRequestCustomer>['columns'] = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Địa chỉ đặt đơn',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Gói',
      dataIndex: 'serviceId',
      key: 'serviceId',
      render: (_, rowData) => <div>{transformServiceBooking(rowData.serviceId)}</div>,
    },
    {
      title: 'Trạng thái đơn',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: '',
      width: 360,
      render: (_, rowData) => (
        <div className='d-flex gap-2 align-items-center'>
          {rowData.status === STATUS.WAIT_TO_PAY ? (
            <Space size='middle'>
              <DiamondButton
                content='Thanh toán ngay'
                onClick={() => handleOpenDialogPayment(rowData)}
              />
            </Space>
          ) : (
            <>Bạn đã thanh toán</>
          )}
          {rowData.status === STATUS.ACCREDITATION && (
            <DiamondButton
              content='Lấy giấy chứng nhận'
              onClick={() => handleDownLoadCertificate(rowData.requestId)}
            />
          )}
        </div>
      ),
    },
  ];

  const getData = async () => {
    setIsLoading(true);
    const res = await getListBookingCustomerApi(customerId);
    if (res?.status === CODE_SUCCESS) {
      const dataSoureRevert = res.data.map((item: any, index: number) => ({
        id: index + 1,
        phoneNumber: item.phoneNumber,
        address: item.address,
        serviceId: item.serviceId,
        status:
          item.status === STATUS.PAYMENTED
            ? 'Đã thanh toán, nhân viên đang đến lấy kim cương'
            : item.status,
        requestId: item.requestId,
      }));
      setDataSource(dataSoureRevert);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    customerId && getData();
  }, [loadDataKey, customerId]);

  return (
    <>
      <Loading loading={isLoading} />
      <Table columns={historyColumns} dataSource={dataSource} scroll={SETTING_SCROLL_TABLE} />
      <PaymentDialog
        serviceId={serviceId}
        requestId={requestId}
        isOpenPaymentDialog={isOpenPaymentDialog}
        setIsOpenPaymentDialog={setIsOpenPaymentDialog}
        setLoadDataKey={setLoadDataKey}
      />
    </>
  );
};

export default HistoryRequest;
