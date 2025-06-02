import { myAxios } from "../config";



export const getContactsCategory = async () => {
    const token = localStorage.getItem('token');
    return myAxios.get('/contacts/categories', {
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

export const getContacts = async () => {
    const token = localStorage.getItem('token');
    return myAxios.get('/contacts', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then(res => {
            if (res.data) {
                return res.data;
            }
        })
        .catch(err => {
            console.log(err);
            return err
        })
}