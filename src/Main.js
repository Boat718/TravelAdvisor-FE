import React, { useEffect, useState } from 'react';
import {Route,Routes, useNavigate} from 'react-router-dom';
import PrivateRoutes from './privateroutes/privateRoutes';
import localStorageService from './service/localStorageService';

export default function Main() {
    const [role,setRole] = useState(localStorageService.getRole);

    useEffect(()=>{
        setRole(localStorageService.getRole);
    },[role])

    return (
        <div>
            <PrivateRoutes role={role} setRole={setRole} />
        </div>
    )
}
