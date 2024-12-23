import { Box, Toolbar } from '@mui/material'
import NavBar from '../../auth/components/NavBar';
import SideBar from '../../auth/components/SideBar';

const drawerWidth = 240;

const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' } } className="animate__animated animate__fadeIn animate__faster">
    
        {/* Navbar drawerWidth*/}
        <NavBar drawerWidth={drawerWidth}/>
        
        {/* Sidebar drawerWidth*/}
        <SideBar drawerWidth={drawerWidth}/>
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
            {/* Toolbar */}
            <Toolbar></Toolbar>
            { children }
        </Box>
    </Box>
  )
}

export default JournalLayout
