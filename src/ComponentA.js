import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useStateIfMounted } from 'use-state-if-mounted';
export const ComponentA = () => {
    const [data, setData] = useState([])
// 1:  using boolean flag you can prevent memory leaks below code is correct

    // var isMonuted = useRef(true)
   
    // useEffect(() => {
    // let isMounted1= true;
    //     setTimeout(() => {
    //         //if(isMoounted.current){

    //        // }
    //       if (isMounted1) {
    //             fetch(`https://fakestoreapi.com/products`).then(res => res.json()).
    //                 then(res => {
    //                     console.log(res)
    //                     setData(res)
    //                 })
    //        }




    //     }, 3000)


    //     return (() => {
    //         //isMonuted.current=false;
    //         isMounted1 = false;
    //     })

    // }, [])

// 2: using Abort Controller
//const Cars = () =>  {
  //  const [carList, setCarList] = useState([]);
    // useEffect( () => {
    //   let abortController;
    // //  (async () =>{
    //     abortController = new AbortController();
    //     let signal = abortController.signal;
    //     // const { data } = await axios.get('https://fakestoreapi.com/products');// showq memory leaks warning
    //     setTimeout(async()=>{
    //         const { data } = await axios.get('https://fakestoreapi.com/products', { signal: signal });// does not show memory 
    
    //         setData(data)
    //     },3000)
       
    // //  })();
    //   return () => abortController.abort();
    //  }, []);
   
   // 3: Using the use-state-if-mounted Hook the code is beow

// There is a great library use-state-if-mounted. It works like useState hook,
// but it also checks if that component is mounted before updating the state.

   const [carList, setCarList] = useStateIfMounted([]);
   
    useEffect( async () => {
   //  (async ()=> {
        setTimeout( async()=>{
            const { data } = await axios.get('https://fakestoreapi.com/products');
              setCarList(data)
           // setData(data)

        },3000)
       
     // })();
     }, []);
   



    return (
        <div>
            <h2>componentA</h2>
            {
               // data.map(item => {
                    carList.map(item => {
                    return (
                        <div key={item.id}>{item.id}{item.category}</div>
                    )
                })
            }
        </div>
    )
}
