import React from 'react'

import {Link,useHistory ,BrowserRouter as Router,Switch,Route}  from 'react-router-dom'
import {Home}  from './components/Home'
export const App = () => {
 // const {histrory}=useHistory()
  return (
    <div style={{backgroundColor:"pink"}}>
        <Router>
      <ul>
        <li>
       
          <Link to='/Home?limit=10&&offset=0'>Home</Link>
        </li>
      </ul>
    
            
            <Switch>
    <Route path="/Home" component={Home} exact  />
  
        </Switch>
          
        </Router>
      
        
    </div>
  )
}
