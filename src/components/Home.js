

import React,{useState,useEffect,useCallback} from 'react'
import {useLocation,Link,BrowserRouter as Router,useHistory}  from 'react-router-dom'
import axios from 'axios'
import {Pagination}  from './Pagination'
import queryString from 'query-string'
export const Home = () => {
   const loc=useLocation()
  const history= useHistory()
    const {path,search} = loc
    const parsed=queryString.parse(search)
    console.log(parsed)
    console.log("limit is",parsed.limit)
    console.log("offst is", parsed.offset)
   // const [page,setPage]= useState(parsed.name)
  //  console.log("page is ",page)
    const changeURL=(e)=>{
     
    }
   
    
  //const [posts,setPosts]=useState([]);
  const [items,setItems] =useState([])
 const [limit,setLimit] =useState(parsed.limit)
  const [showPerPage,setShowPerPage]= useState(limit)
  const [startPage,setStartPage]= useState(0)
  const [pagination,setPagination]=useState({
    start:parsed.offset,
    end:showPerPage
  })
 
const fetchData=async()=>{
    // const res= await axios.get(``)
  const res = await axios.get(
    `https://fakestoreapi.com/products`
  )
  console.log(res.data)
  setItems(res.data)
  console.log(items)
      // console.log(list.data)
      // return res.data;
    
 }
 useEffect(()=>{
   fetchData()
   console.log(items)

 },[])
console.log(items)
  const onPageChange=(start,end)=>{
   
    console.log(start,end)
    setPagination({start:start,end:end})
   // changeUrl();
    history.push({
        pathname: '/Home',
        search: "?" + new URLSearchParams({limit: limit}).toString() +"&&"+ new URLSearchParams({offset: start}).toString()
        })
  // history.push(`/?limit=10`)
  }

   
  
   
   
  // }
  const handleLimit=(e)=>{
    e.preventDefault()
      setLimit(e.target.value)
     setShowPerPage(e.target.value)
      onPageChange(0,e.target.value)
  
     
    
     
     
    }
  useEffect(()=>{
    changeUrl();
  },[limit])
const changeUrl=()=>{
    history.push({
        pathname: '/Home',
        search: "?" + new URLSearchParams({limit: limit}).toString() +"&&"+ new URLSearchParams({offset:pagination.start}).toString()
        })
}
 
 
  console.log("limit is",limit)
 // setShowPerPage(limit)
  console.log("show per page is", showPerPage)
  console.log(items)
 



  return (
    <div className="App" style={{backgroundColor:"pink"}}>
    
      
      <span><h4>change records on one page</h4></span>
      <span style={{textAlign:"center",position:"relative",right:"0px"}}>
      {/* <ul style={{display:"flex",listStyleType:"none"}}>
        <li><label for="page"><h4>Change number of records on single page</h4></label></li>
        <li> */}
      <select style={{height:"40px",width:"100px"}}
      id="page"
               value={limit}
                name="limit"
              //  placeholder={placeholder}
               onChange={handleLimit}
                
              >
               
                <option value="10">10</option>
                <option value="20">
                  20
                  </option>
                <option value="5">5</option>
                <option value="25">25</option>
              </select>
              {/* </li>
     <li> */}
      <Pagination showPerPage={showPerPage} onPageChange={onPageChange} items={items}
      total={items.length} limit1={limit} start={pagination.start} end={pagination.end}
      />
      {/* </li>
      </ul> */}
      </span>
    </div>
  )
}

