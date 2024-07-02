import { CreateResultRequest } from '@/models/account';
import api from '../api';

export const getListRequestApi = async () => {
  try {
    const res = await api.get('api/HistoryRequest/history/paid');
    return res;
  } catch (error) {
    return undefined;
  }
};

export const getListRequestAcceptedApi = async () => {
  try {
    const res = await api.get('api/HistoryRequest/history/processing');
    return res;
  } catch (error) {
    return undefined;
  }
};

export const updateStatusWhenReceivedDiamondApi = async (requestId: number, employeeId: number) => {
  try {
    const res = await api.put(
      `api/AcceptStatus/Update-status-when-received-diamond/${requestId}${employeeId}`
    );
    return res;
  } catch (error) {
    return undefined;
  }
};

export const createResultApi = async (payload: CreateResultRequest) => {
  try {
    const res = await api.post('api/Result/create', { ...payload });
    return res;
  } catch (error) {
    return undefined;
  }
};
