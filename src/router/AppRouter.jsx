import { Navigate, Route, Routes } from "react-router"
import AuthRoutes from "../auth/routes/AuthRoutes"
import JournalRoutes from "../journal/routes/JournalRoutes"
import CheckingAuth from "../ui/components/CheckingAuth"
import useCheckAuth from "../hooks/useCheckAuth"

const AppRouter = () => {

  const { status } = useCheckAuth();

  if(status === 'checking'){
    return <CheckingAuth/>
  }

  return (
    <Routes>
        {
          (status) === 'authenticated'
          // JournalApp
          ? <Route  path="/*" element={ <JournalRoutes/>}/>
          // Login y Registro
          : <Route path="/auth/*" element={ <AuthRoutes/>}/>
        }
        
        <Route path="/*" element={ <Navigate to='/auth/login' />}/>
        
    </Routes>
  )
}

export default AppRouter
