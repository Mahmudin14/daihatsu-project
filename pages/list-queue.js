import React, { useEffect, useLayoutEffect, useState } from 'react'
import DaihatsuLogo from '../public/Daihatsu-Logo.wine__1_-removebg-preview.png'
import { Table } from 'reactstrap'
import { useQuery } from 'react-query'
import { useQueueState } from '../store/QueueState'
import { useRouter } from 'next/router'

export default function listQueue() {
  const { listLock , listLockUpdate , setInputDate } = useQueueState((state)=>state)
  const router = useRouter()

  useLayoutEffect(()=>{
    if(listLock == false){
      router.push('/index')
    }
  },[listLock])

  const datenow = new Date().toJSON().slice(0,10)
  const [ arrdate , setArrdate ] = useState(datenow)

  const { data , isLoading , refetch } = useQuery({
    queryKey : ['getList'],
    queryFn : async() =>{
      // setInputDate(arrdate)
      // const req = await fetch(`http://localhost:3000/api/list-queue`,{
      const req = await fetch(`http://103.245.39.106:3000/api/queue`,{
        //const req = await fetch(`http://localhost:3000/api/queue`,{
        method: "GET",
        headers:{
          "Content-Type": "application/json",
          // "arrival_date": {arrdate}
        }
      })
      const resp = await req.json()
      return resp
    }
  }) 

  useEffect(()=>{
    refetch()
  },[arrdate])
  
  console.log(arrdate)
  console.log(data)
  console.log("Manipulasi String : " + arrdate.slice(0,9) + (arrdate.slice(9,10) - 1))

  return (
    <>
        <nav className="navbar bg-body-tertiary shadow">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                <img src={DaihatsuLogo.src} alt="Logo" width={180} height={40}  />
                </a>
            </div>
        </nav>

        <div className='p-1 mt-2 container-fluid'>
            <div className='row'>
              <div className='col-md-10 col-lg-10 offset-md-1 offset-lg-1'>
                <div className='shadow border border-1 border-primary-subtle rounded top-20 p-2'>
                  <div className='bg-primary-subtle p-4 rounded '>
                    <h4 className='pt-3'>
                      Masukan Tanggal Antrian
                    </h4>
                    <form className='pt-2'>
                      <input
                        type='date'
                        className='p-2 rounded-2 w-50'
                        value={arrdate}
                        onChange={(e)=>{e.preventDefault(); setArrdate(e.target.value)}}
                      >
                      </input>
                    </form>
                  </div>
                  <div className='pt-3'>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>No Urut</th>
                          <th>Name</th>
                          <th>No Telp</th>
                          <th>Plat Nomor</th>
                          <th>Jenis Mobil</th>
                          <th>Tanggal Kedatangan</th>
                          <th>Waktu Kedatangan</th>
                          <th>Keluhan</th>
                        </tr>
                      </thead>
                      <tbody>
                      {data?.queries?.filter((value)=>{
                           return(
                             value?.arrival_date?.includes(arrdate.slice(0,9) + (arrdate.slice(9,10) - 1))
                           )
                         }).map((detail_data,index) => {
                           return(
                      // .map((detail_data,index) => {
                      //      return(
                      // 
                        // .filter((value)=>{
                        //   return(
                        //     value.arrival_date.toLowerCase().includes(arrdate)
                        //   )
                        // })
                              <tr key={index}>
                                <td>{detail_data?.queue_number}</td>
                                <td>{detail_data?.name}</td>
                                <td>{detail_data?.telp}</td>
                                <td>{detail_data?.plat_number}</td>
                                <td>{detail_data?.car_type}</td>
                                <td>{detail_data?.arrival_date?.slice(0,9) + (Number(detail_data?.arrival_date?.slice(9,10)) + 1)}</td>
                                <td>{detail_data?.arrival_time}</td>
                                <td>{detail_data?.complaint}</td>
                              </tr>
                             )
                        })}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </>
  )
}
