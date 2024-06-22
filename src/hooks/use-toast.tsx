import { notification } from 'antd';
import { useCallback } from 'react';

const useToast = () => {
  // const notify = useCallback((type: 'success' | 'info' | 'error' | 'warning', message: string) => {
  //   toast(message, { hideProgressBar: true, autoClose: 2000, type });
  // }, []);
  const notify = useCallback((type: 'success' | 'info' | 'error' | 'warning', message: string) => {
    notification[type]({
      message,
      placement: 'topRight',
    });
  }, []);

  return { notify };
};

export default useToast;
