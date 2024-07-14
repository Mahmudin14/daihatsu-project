import { create } from "zustand";
import { persist } from "zustand/middleware"

export const useQueueState = create(
    persist(
        (set, get) => ({
            inputDate : "",
            setInputDate : (value) => {
                set(() => {
                    inputDate : value
                })
            },
            queueData : {
                customer_name : "",
                telp : "",
                plat_number : "",
                car_type : "",
                arrival_date : "",
                complaint : ""
            },
            queueInput : (key,value) => {
                set((state)=>({
                    queueData : {
                        ...state.queueData,
                        [key]: value
                    }
                }))
            },
            queueInputReset : () => {
                let initQueueData = {
                    customer_name : "",
                    telp : "",
                    plat_number : "",
                    car_type : "",
                    arrival_date : "",
                    complaint : ""
                }
                set(()=>({
                    queueData : initQueueData
                }))
            },
            respQueueData : {
                customer_name : "",
                telp: "",
                plat_number : "",
                car_type : "",
                arrival_date : "",
                arrival_time : "",
                complaint : ""
            },
            respQueueInput : (key,value) => {
                set((state)=>({
                    respQueueData : {
                        ...state.respQueueData,
                        [key]: value
                    }
                }))
            },
            respQueueReset : () => {
                let initRespQueueData = {
                    customer_name : "",
                    telp: "",
                    plat_number : "",
                    car_type : "",
                    arrival_date : "",
                    arrival_time : "",
                    complaint : ""
                }
                set(()=>({
                    respQueueData : initRespQueueData
                }))
            },
            listLock : false,
            listLockUpdate : (value) => {
                set(()=>({
                    listLock : value
                }))
            },
        }),
        {
            name : "queueDataState",
            getStorage : ()=>localStorage,
        }
    )
)