import { addDays, addHours } from "date-fns";
import { query } from "../../lib/db";



 export default async function queue(req,res){
    // const conn = mysql.createConnection({
    //     host : 'host.docker.internal',
    //     user : 'root',
    //     database: 'daihatsu_service_queue',
    //     password : 'mahmudinproject',
    //     port: '3306'
    // })
    // conn.ping()

    let message
    // var date = new Date()
    
    if (req.method === "GET") {
        const queue = await query({
            query: "SELECT * FROM queue_data",
            values: [],
        });
        res.status(200).json({ queries: queue });
        
    }

    if (req.method === "POST"){

        const getQueueInDate = await query({
            query : "SELECT * FROM queue_data WHERE arrival_date = ?",
            values: [req.body.arrival_date]
        })

        if (getQueueInDate.length <= 0 ){
            let initTime = '08:00:00'
            let queue_number = 1
            const addQueue = await query({
                query: "INSERT INTO queue_data ( name , telp , plat_number, car_type , arrival_date , arrival_time , complaint , queue_number ) VALUES ( ? , ? , ? , ? , ? , ? , ? , ?)",
                values: [ req.body.customer_name , req.body.telp , req.body.plat_number , req.body.car_type , req.body.arrival_date , initTime , req.body.complaint , queue_number ]
            })
    
            let queue = []
            queue = {
                name : req.body.customer_name,
                plat_number : req.body.plat_number,
                car_type : req.body.car_type,
                arrival_date : req.body.arrival_date,
                arrival_time : initTime,
                complaint : req.body.complaint,
                queue_number : queue_number
            }

            if (addQueue.insertId) {
                message = "Success"
                res.status(200).json({ response: { message: message, queue: queue } });
            } else {
                message = "Error"
                res.status(400).json({ response: { message: message, queue: queue } });
            }
    
            // res.status(200).json({ response: { message: message, queue: queue } });
        } else if (getQueueInDate.length > 8){
            // Max 10 Mobil
            let queue = []
            queue = {
                name : req.body.customer_name,
                telp : req.body.telp,
                plat_number : req.body.plat_number,
                car_type : req.body.car_type,
                arrival_date : req.body.arrival_date,
                arrival_time : "NULL",
                complaint : req.body.complaint,
            }
            res.status(400).json({ response: { message: "Error, Untuk Hari Ini Antrian Service Sudah Penuh, Silahkan Daftar Di Lain Hari", queue: queue } });
        } else {

            const getQueue = await query({
                query: "SELECT * FROM queue_data WHERE arrival_date = ? ORDER BY id DESC LIMIT 1",
                values: [req.body.arrival_date],
            });
            // const customerName = req.body.customer_name;
    
            // const arrivalDate = addDays(new Date(getQueue[0].arrival_date), 1)
            // const arrivalDate = getQueue[0].arrival_date
            // const getTime = await getQueue[0].arrival_time
    
            // const arrivalTime = `ADDTIME( ${getTime} , 1:0:0)`
    
            const getArrivalTime = String(getQueue[0].arrival_time)
            const splitArrivalTime = getArrivalTime.split(":")
            const getHourPlusOne = parseInt(splitArrivalTime[0]) + 1
            const newGeneratedTime = new String(getHourPlusOne.toString() + ":" + splitArrivalTime[1]+ ":" + splitArrivalTime[2])
    
            const getQueueNumber = parseInt(getQueue[0].queue_number)
            const QueueNumberAdd = getQueueNumber + 1
            
            // const arrivalTime = date.toTimeString()
    
            const addQueue = await query({
                query: "INSERT INTO queue_data ( name , telp , plat_number, car_type , arrival_date , arrival_time , complaint , queue_number ) VALUES ( ? , ? , ? , ? , ? , ? , ? , ?)",
                values: [ req.body.customer_name , req.body.telp , req.body.plat_number , req.body.car_type , req.body.arrival_date , newGeneratedTime , req.body.complaint , QueueNumberAdd ]
            })
    
            let queue = []
            // if (addQueue.insertId) {
            //     message = "Success"
            // } else {
            //     message = "Error"
            // }
    
            queue = {
                name : req.body.customer_name,
                telp : req.body.telp,
                plat_number : req.body.plat_number,
                car_type : req.body.car_type,
                arrival_date : req.body.arrival_date,
                arrival_time : newGeneratedTime,
                complaint : req.body.complaint,
                queue_number : QueueNumberAdd
            }

            if (addQueue.insertId) {
                message = "Success"
                res.status(200).json({ response: { message: message, queue: queue } });
            } else {
                message = "Error"
                res.status(400).json({ response: { message: message, queue: queue } });
            }
    
            // res.status(200).json({ response: { message: message, queue: queue } });
        }

    }

    // if(req.method === "DELETE" ){
    //     const customerName = req.body.customer_name;
    //     const deleteQueue = await query({
    //         query: "DELETE FROM queue_data WHERE name "
    //     })
    // }
   
    // res.status(200).json({ name: 'John Smith' })
 }