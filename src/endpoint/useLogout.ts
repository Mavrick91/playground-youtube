import axios from 'axios';
import { useMutation } from 'react-query';
import { API } from '~/constants/apiUrl';

export const useLogout = () => {
  return useMutation(() => axios.post(API.AUTH.LOGOUT));
};
