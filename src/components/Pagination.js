import React,{useState,useEffect} from 'react'
import {useHistory}  from 'react-router-dom'
import {SelectAll2 }  from './SelectAll2'
import {EditProduct2}  from './EditProduct2'
import '../App.css'
import axios from 'axios'
export const Pagination = ({showPerPage,onPageChange,total,limit,start,items,end}) => {
    console.log(items)
   // console.log(showPerPage)
    const [counter,setCouter]= useState(1)
   const [searchId,setSearchId]=useState(0)
   const [category,setCategory]=useState("enter category")
  
    const [form,setForm]= useState({
       id:0,
         category:"",
         title:"",
         price:0,
         image:""
     })
     const [editform,setEditForm]= useState({
        //  id:0,
     //id:0,
       category:"",
       title:"",
       price:0,
       image:""
       
    })
     const [productId,setProductId]= useState(editform.id)
     const arr=[...items]
     console.log(arr)
     const [currentItems, setCurrentItems] = useState(items);
     console.log(currentItems)
    const [numberOfButtons,setNUmberOfButtons]=useState(Math.ceil(total/showPerPage))
    console.log(items)
 
    const history= useHistory()
    useEffect(()=>{
        console.log(counter)
        const value= showPerPage * counter;
        console.log("start value", value - showPerPage)
        console.log("end value", value)
        onPageChange(value-showPerPage,value)
    },[counter])
    useEffect(()=>{
        setCurrentItems([...items.slice(start, end)])
       //setCouter(1)
      // onPageChange(0,limit)
     
    },[limit,showPerPage,start])
    const fetchDataDefault=async()=>{
      const res = await axios.get(
        `https://fakestoreapi.com/products`
      )
      console.log(res.data)
      setCurrentItems([...res.data.slice(start, end)])
    }
    useEffect(()=>{
     // setCurrentItems([...items.slice(start, end)])
     fetchDataDefault()
     //setCouter(1)
    // onPageChange(0,limit)
   
  },[])
   
    useEffect(()=>{
        console.log("limit is",limit)
       
       
       setCouter(1)
       console.log(counter)

    },[limit,showPerPage])
    const handleChangeChk = (e) => {
        const { name, checked } = e.target;
      console.log(name)
      console.log(checked)
      if (name === "Allselect") {
        let tempUser = currentItems.map(item => {
          return { ...item, isChecked: checked }
        })
        setCurrentItems(tempUser)
      } else {
        let tempUser = currentItems.map(item => item.id    === parseInt(name)? { ...item, isChecked: checked } : item)
  console.log(tempUser)
        setCurrentItems(tempUser)
  
  
  
  
      }
  
    }
    const handleChange=(e)=>{
        e.preventDefault()
        setForm({...form,[e.target.name]:e.target.value})
    }
    
    const onButtonClick=(type)=>{
        console.log(total)
        console.log(counter)
        if(type ==="prev"){
            if(counter ===1){
                setCouter(1)
            }else{
                setCouter(counter -1)
            }

        } else if(type==="next"){
    //  if(numberOfButtons >= counter){
        if(Math.ceil(total/showPerPage) <= counter){
            console.log(counter)
            console.log(numberOfButtons)
       setCouter(counter )
    // setCouter(counter + 1)

     }else{
        // setCouter(counter)
       setCouter(counter +1)
     }
        }
       // setCouter(counter+1)
    }
    const handleDelete=async(e,id)=>{
        e.preventDefault()
        console.log("dele is pressed",id)
        const res = await axios.get(
            `https://fakestoreapi.com/products/${id}`
          )
          console.log(res.data)
          const arr=[...currentItems]
          const delIndex=currentItems.findIndex(el=>el.id===id)
          arr.splice(delIndex,1)
          setCurrentItems(arr)
    }
    const deleteSelected = async(e) => {
        e.preventDefault()
      
        const arrIds = []
        var newList = [...currentItems]
        console.log(newList)
       
        const a = currentItems.filter((item) => item?.isChecked === true)
        console.log("checked array", a)
      
        for (let i = 0; i < a.length; i++) {
            const res = await axios.get(
                `https://fakestoreapi.com/products/${a[i].id}`
              )
              console.log(res.data)
              updateList();
            }
      
      
        }
        const updateList=(e)=>{
            let newList=[...currentItems]
            const a = currentItems.filter((item) => item?.isChecked === true)
            console.log("checked array", a)
            for(let i =0;i<a.length;i++){
           
            const ind= newList.findIndex(el=>el.id===a[i].id)
            newList.splice(ind,1)

            }
            setCurrentItems(newList)

        }
        const handleSubmit=async(e)=>{
            e.preventDefault()
            console.log("form data is=",form)
            const res=await axios.post(`https://fakestoreapi.com/products/`,form)
            console.log(res.data)
            
           // let arr=[...currentItems]
            const newContact={
             // id:nanoid(),
             id: parseInt( form.id),
              category:form.category,
             title: form.title,
              image: form.image,
              price:form.price
          }
          const newContacts=[...currentItems,newContact]
          setCurrentItems(newContacts)
          // arr.push(form)
           // setCurrentItems(arr)
           
      
          
           
        
        }
        const changeImage=(e)=>{
            try {
              setForm({ ...form, image: URL.createObjectURL(e.target.files[0]) }
        
              )
            }
            catch {
              return 0
            }
        
        
          }
        const  changeImageEdit=(e)=>{
            try {
                setEditForm({ ...editform, image: URL.createObjectURL(e.target.files[0]) }
          
                )
              }
              catch {
                return 0
              }
          }
          const clickEdit=(e,id,item)=>{
           e.preventDefault()
            console.log("edit called")
            setProductId(item.id)
            console.log(productId)
            const editData={
               id:item.id,
                category:item.category,
               price:item.price,
                title: item.title,
                image:item.image
        
        
            }
            setEditForm(editData)
            console.log(editData)
          }
        
        const handleEditForm=(event)=>{
          event.preventDefault()
          
          setEditForm({...editform,[event.target.name]: event.target.value})
        
        
        }
      

const  handleEditFormSubmit=async(e)=>{
    e.preventDefault();
    console.log(editform)
    
      await axios.put(`https://fakestoreapi.com/products/${productId}`, editform)
        .then(res => {
          console.log(res.data)
        const newproducts = [...currentItems]
        // console.log(contactId)
    
        const index = newproducts.findIndex((product) => product.id === productId)
        console.log(index)
        //newproducts[index] = res.data;
        newproducts[index]= editform
     
        setCurrentItems(newproducts)
        setProductId(null)
     // })
    })
}
    const handleCancel=()=>{
      setProductId(null)
    }
    const handleSearch=(e,id)=>{
        e.preventDefault()
      console.log("search clicked")
      console.log("id is", id)
      const newList=[]
      currentItems.map(el=>
        el.id === parseInt(id )? newList.push(el): el
        )
        //setData(newList)
        setCurrentItems(newList)
      }
      // console.log(newList)
      
      const handleSearchByName=async(e,category)=>{
      e.preventDefault();
     
      
     
        const a = currentItems.filter((item) => item?.category === category)
        var newList=[];
     newList=a;
        // console.log(a)
        // let newList1= a;
        // console.log(newList1)
        //setData(newList1)
        setCurrentItems(newList)
        
      }
      //
     
    //   const updateList1=(e)=>{
    //     let newList=[...currentItems]
    //     const a = currentItems.filter((item) => item?.isChecked === true)
    //     console.log("checked array", a)
    //     for(let i =0;i<a.length;i++){
       
    //     const ind= newList.findIndex(el=>el.id===a[i].id)
    //     newList.splice(ind,1)

    //     }
    //     setCurrentItems(newList)

    // }
     
    return (
        <div>
             <form >
                       <table><tr><td>
                       <label className="custom-control-label">Search by id</label></td>
                       <td>
                       <input type="number" 
                       className="form-control" name="searchId" onChange={(e)=>setSearchId(e.target.value)}
                       value={searchId} />
                       </td>
                       <td>
                       <button 
                       className="btn btn-md btn-warning" 
                       onClick={(e)=>handleSearch(e,searchId)}><i className="fa fa-search-plus" 
                       style={{fontSize:"20px"}}
                       aria-hidden="true"></i></button>
                       </td>
                       </tr>
                       <tr>
                         <td> <label className="custom-control-label">Search by Cateegory</label></td>
                         <td>
                       <input type="text" 
                        className="form-control"
                       value={category} onChange={(e)=>setCategory(e.target.value)}/></td>
                       <td>
                       <button 
                       className="btn btn-md btn-warning"
                       onClick={(e)=>handleSearchByName(e,category)}><i className="fa fa-search-plus" 
                       style={{fontSize:"20px"}}
                       aria-hidden="true"></i></button>
                       </td>
                       </tr>
                       </table>
                     </form>
            <span>
                  
                  <button 
                  className="btn btn-lg btn-danger"
                  onClick={(e)=>deleteSelected(e)}>Delete Selected
                  <i class="fa fa-trash" aria-hidden="true"></i></button>
                  </span>  
               <form 
               onSubmit={handleEditFormSubmit} 
               >
       <table width="100%" border="10">
               <tr style={{backgroundColor:"grey"}}>
                   <th style={{paddingLeft:"20px"}}>
                   <SelectAll2 list={currentItems}   handleChange={handleChangeChk} 
                   
                   />
                   </th>
                   <th>
                       ID
                   </th>
                   <th>
                       Category
                   </th>
                   <th>
                       Title
                   </th>
                   <th>
                       Price
                   </th>
                   <th>
                       Picture
                   </th>
                   <th>Edit</th>
                   <th>Remove</th>
               </tr>
      { currentItems &&
        currentItems?.map((item) => (
          <>
        {
productId === item.id?   (<EditProduct2 
  editform={editform}
handleEditForm={handleEditForm}
handleCancel={handleCancel}
changeImageEdit={changeImageEdit}

/>) : 
          
          
               <tr style={{border:"5px solid lightgrey"}}>
                    <td style={{paddingLeft:"20px",border:"3px solid grey"}}>
                <input type="checkbox" 
              className="  custom-control-input"
                name={item.id}
                    checked={item?.isChecked || false}
                    onChange={handleChangeChk} 
                    />
                </td>
                   <td style={{border:"3px solid grey"}}>
                       {item.id}
                   </td>
                   <td style={{border:"3px solid grey"}}>
                       {item.category}
                   </td>
                   <td style={{border:"3px solid grey"}}>
                       {item.title}
                   </td>
                   <td style={{border:"3px solid grey"}}>
                       {item.price}
                   </td>
                   <td style={{border:"3px solid grey"}}>
                       <img src={item.image} alt="dd" height="200px" width="200px"
                       
                       />
                   </td>
                   
                 
   <td style={{border:"3px solid grey"}}>
        <button 
        className="btn btn-lg btn-warning"
        onClick={(e)=>clickEdit(e,item.id,item)}
        
        > <i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
    </td>
    <td style={{border:"3px solid grey"}}>
        <button 
        className="btn btn-lg btn-danger"
       onClick={(e)=>handleDelete(e,item.id)}
        > <i class="fa fa-trash" aria-hidden="true"></i></button>
    </td>
               </tr>
               
               
          
          
        }
        </>
        ))
      }
         </table>
         </form>
           
            <nav aria-label="...">
  <ul className="pagination d-flex ">
  
        
              
    <li className={`page-item`}><a className="page-link"  onClick={()=> onButtonClick('prev')}>Previous</a></li>
    
   {
      new Array(Math.ceil(total/showPerPage)).fill("").map((el,index)=>{
       // new Array({numberOfButtons}).fill("").map((el,index)=>{
           return(<>
           <li className={`page-item ${index+1===counter ? 'active':null}`}>
               <button class="page-link"  onClick={()=> setCouter(index+1)}>
            {index +1}</button></li>
           </>)
        

        } )
          
   }
    <li class="page-item"><a class="page-link"  onClick={()=> onButtonClick("next")}>Next</a></li>
  </ul>
</nav>
<h2>Add new User</h2>
            <form onSubmit={handleSubmit}>
            <label className="custom-control-label">ID:</label>
                <input type="number" 
                 className="form-control"
                name="id"  value={form.id}
                onChange={handleChange}
                />
            
              <label className="custom-control-label">Category</label>
                <input type="text" 
                 className="form-control"
                name="category" required="required" value={form.category}
                onChange={handleChange}
                />
                <label className="custom-control-label">Title</label>
                <input type="text" 
                 className="form-control"
                name="title" required="required" value={form.title}
                onChange={handleChange}
                />
                <input type="number" 
                 className="form-control"
                name="price" required="required" value={form.price}
                onChange={handleChange}
                />
                <input type="file" onChange={changeImage} name="form.image" id="file"

/>
<span style={{position:"absolute",left:"800px"}}>
please select an image
</span>


  <div>
  
   <img src={form.image} width="200px" height="190px" style={form.image === "" ? {display: "none"} : {position:"relative",bottom:"300px",left:"10px"
   
   }}
   
   />
   
   </div>



  
                <button 
                className="btn btn-md btn-success"
                type="submit">Add
                <i class="fa fa-plus-square" aria-hidden="true"></i></button>
            </form>   
        </div>
    )
}
