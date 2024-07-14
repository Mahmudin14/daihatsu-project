import { query } from "../../lib/db"

export default async function listLock(req, res){
    let message
    if(req.method === "POST"){
        const getIn = await query({
            query : "SELECT * FROM admin_protected WHERE name = ?",
            values: [req.body.name]
        })
        const inputPassword = req.body.password
        const password = getIn[0].password
        if (password != inputPassword){
            message = "Error"
            res.status(400).json({message: message})
        }
        // res.status(200).json({message : password + " vs " + inputPassword})
        message = "Success"
        res.status(200).json({
            message: message,
            inputPassword : inputPassword,
            password : password
        })
    }
}