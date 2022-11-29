import { getToken } from '../utils';

export const headers = () => {
    const token = getToken();
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
}
