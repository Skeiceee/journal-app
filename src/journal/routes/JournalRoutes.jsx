import { Navigate, Route, Routes } from 'react-router'

import JournalPage from '../pages/JournalPage'

const JournalRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={ <JournalPage/>}/>

        <Route path='/*' element={ <Navigate to='/'/>}/>

    </Routes>
  )
}

export default JournalRoutes
