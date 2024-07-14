import React, { useEffect, useState } from 'react'
import DaihatsuLogo from '../public/Daihatsu-Logo.wine__1_-removebg-preview.png'
import { Button } from 'reactstrap'
import { useRouter } from 'next/router'
import { useQueueState } from '../store/QueueState'

export default function listLock() {
  const router = useRouter()
  const { listLock , listLockUpdate } = useQueueState((state)=>state)
  const [ inputPassword , setInputPassword ] = useState("")

  useEffect(()=>{
    listLockUpdate(false)
  },[])

  const submitPassword = async() => {
    const req = await fetch(`http://localhost:3000/api/list-lock`,{
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        name : "mahmudin",
        password : inputPassword
      })
    })
    const resp = await req.json()
    console.log("msg :  " + resp.message)
    if(resp.message == "Success"){
      listLockUpdate(true)
      router.push("/list-queue")
    }
  }
  
  useEffect(()=>{
    if(listLock === true ){
      router.push("/list-queue")
    }
  },[listLock])
  
  console.log("inputPassword : " + inputPassword)

  return (
    <>
    <nav className="navbar bg-body-tertiary shadow">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">
            <img src={DaihatsuLogo.src} alt="Logo" width={180} height={40}  />
            {/* Bootstrap */}
            </a>
        </div>
    </nav>
    <div className='p-1 mt-5 container-fluid'>
        <div className='row'>
          <div className='col-md-10 col-lg-6 offset-md-1 offset-lg-3'>
            <div className='shadow border border-1 border-primary-subtle rounded top-20 p-5'>
              <h3 className='text-center'>
                Masukan Password
              </h3>
              <form className='m-3 mt-4'>
              <input
                type='password'
                className='rounded-2 w-100 p-2 text-center'
                onChange={(e)=>{e.preventDefault();setInputPassword(e.target.value)}}
              />
              <div className='d-flex justify-content-center mt-3'>
              <Button onClick={(e)=> {e.preventDefault();submitPassword()}}>Submit</Button>
              </div>
              </form>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}
