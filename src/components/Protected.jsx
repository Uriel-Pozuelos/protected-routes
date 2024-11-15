import { Navigate, Outlet } from "react-router-dom"

export const Protected = ({isAllowed, children}) => {
    
    if(!isAllowed){
        return <Navigate to='/home' />
    }

    return children ? children : <Outlet />
}