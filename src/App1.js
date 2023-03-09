import React,{useState} from 'react'
import { ComponentA } from './ComponentA'
import { ComponentB } from './ComponentB'

export const App1 = () => {
 const [active,setActive] =    useState('')

  return (
    <div>App
    <button onClick={()=>setActive("ComponentA")}>ComponentA</button>
    <button onClick={()=>setActive("ComponentB")}>ComponentB</button>
    {
      active === 'ComponentA' && <ComponentA/>}
     {

      active === 'ComponentB' && <ComponentB/>
    }
    </div>
  )
}
