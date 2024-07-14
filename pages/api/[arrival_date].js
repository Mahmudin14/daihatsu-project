import { useRouter } from 'next/router';
import React from 'react'

export default async function arrivalDate(req, res) {
    let message

    const router = useRouter()
    const { arrival_date } = router.query
    console.log(arrival_date)
    
    // if (req.method === "GET") {
    //     const queue = await query({
    //         query: "SELECT * FROM queue_data WHERE arrival_date = ?",
    //         values: [arrival_date],
    //     });
    //     res.status(200).json({ queries: queue });
    // }

    res.status(200).json({query: arrival_date})
}
