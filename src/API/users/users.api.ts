import { myAxios } from "../config"

export const getUserInfo = async (id: number) => {
    return myAxios.get(`/users/${id}`)
        .then(res => { return res.data[0] })
        .catch(err => { return err })
}

export const getAllUsers = async () => {
    const token = localStorage.getItem('token');
    return myAxios.get('/users', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then(res => {
            if (res.data) {
                return res.data;
            }
        })
        .catch(err => { return err })
}