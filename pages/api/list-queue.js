import React from 'react'
import { useQueueState } from '../../store/QueueState';

export default async function listQueue(req, res) {
    if (req.method === "GET") {
        const {inputDate} = useQueueState((state)=>state)
        if(inputDate != ""){
            const queue = await query({
                query: `SELECT * FROM queue_data WHERE arrival_date = ${inputDate}`,
                values: [],
            });
            res.status(200).json({ data: queue });
        } else {
            res.status(404).json({ data: null , message : "Param arrival date tidak boleh kosong" });
        }
    }
}
