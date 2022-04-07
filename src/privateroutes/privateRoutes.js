import React from 'react';
import {Route,Routes, Navigate} from 'react-router-dom';
import ConfigRoutes from "../config/routes";

export default function privateRoutes(props) {

    const role = props.role || "guest";

    const allowedRoutes = ConfigRoutes[role].allowedRoutes;
    const redirectRoute = ConfigRoutes[role].redirectRoute;


  return (
    <Routes>
        
        {allowedRoutes.map(route => 
            <Route 
            exact 
            path = {route.url}
            key = {route.url}
            element = {<route.page setRole ={props.setRole} role={props.role} />}
            />
            )}
            <Route path="*" element={<Navigate to={redirectRoute} replace />} />
    </Routes>
  )
}

// <Routes>
//             <Route index path="/login" element={ <Login />} />
//             <Route path="/register" element={ <Register />} />
//             <Route path='/main' element={< App />}/>

//         </Routes>
