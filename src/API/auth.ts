import { myAxios } from "./config";


export const checkMe = async () => {
    const token = localStorage.getItem('token');
    return myAxios.get('/auth/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then(res => { return res })
        .catch(err => {
            return err
        })
}

