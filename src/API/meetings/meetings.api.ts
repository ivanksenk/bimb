import { NewMeetingInterface } from "../../Interfaces/Meeting.interface"
import { myAxios } from "../config"

export const getAllMeetings = async () => {
    return myAxios.get('/meeting/')
        .then(res => { return res })
        .catch(err => { return err })
}

export const newMeetingSave = async (data:NewMeetingInterface)=>{
    return myAxios.post('/meeting/',data)
    .then(res=>{return res})
    .catch(err=>{return err})
}