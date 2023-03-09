
import React from 'react'
import '../App.css'
export const EditProduct2 = ({editform,handleEditForm,handleCancel,changeImageEdit}) => {
    console.log(editform)
    console.log(changeImageEdit)
    return (
        <>
            
                
         <tr style={{width:"50%"}}>
            <td style={{border:"3px solid grey"}}>
                    <input type="number" name="id"  
                    value={editform.id}/>
                </td>
                <td style={{border:"3px solid grey"}}>
                    <input type="text" name="category" required="required"  
                    value={editform.category} onChange={handleEditForm}/>
                </td>
                <td style={{border:"3px solid grey"}}>
                    <input type="text" name="title" required="required" 
                    value={editform.title} onChange={handleEditForm}
                    />
                </td>
               
                <td style={{border:"3px solid grey"}}>
                    <input type="number" name="price" required="required" 
                    value={editform.price} onChange={handleEditForm}
                    />
                </td>
               <td style={{border:"3px solid grey"}}>
                   <span style={{position:"relative",top:"50px"}}>Change ypur picture</span>
               <input type="file" onChange={changeImageEdit} name="editform.image" id="file1"

/>

</td>
<td style={{border:"3px solid grey"}}>  
  
   <img src={editform.image} width="200px" height="190px" 
   alt="ll"
   style={editform.image === "" ? {display: "none"} : {position:"relative",bottom:"0px",right:"250px"
   
   }}
   
   />
   
   
   </td>
            
                
                <td style={{border:"3px solid grey"}}>
                    <button 
                    className="btn btn-md btn-success"
                    type="submit">Save<i class="fa fa-plus-square" aria-hidden="true"></i></button>
                   
                </td>
                <td style={{border:"3px solid grey"}}>
                    <button onClick={handleCancel}>cancel</button>
                </td>
              
                
            </tr>
            
            
          
                 
                 
                
                 
        </>
    )
}

