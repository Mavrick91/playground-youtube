import axios from 'axios';
import { useMutation } from 'react-query';
import { API } from '~/constants/apiUrl';

export const useLogout = () => useMutation(() => axios.post(API.AUTH.LOGOUT));
