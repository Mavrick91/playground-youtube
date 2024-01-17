import axios from 'axios';
import { useMutation } from 'react-query';

export const useLogout = () => useMutation(() => axios.post('/api/auth/logout'));
