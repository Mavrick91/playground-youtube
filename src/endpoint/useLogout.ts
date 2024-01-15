import axios from 'axios';
import { useMutation } from 'react-query';

export const useLogout = () => {
  return useMutation(() => axios.post('/api/auth/logout'));
};
