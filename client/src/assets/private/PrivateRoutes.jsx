import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import Cookie from  'js-cookie'


const PrivateRoutes = () => {
  
    const token = Cookie.get("c_user")

    return token ? <Outlet /> : <Navigate to={'/login'} />
};

export default PrivateRoutes;
