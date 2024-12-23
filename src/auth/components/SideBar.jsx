import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid2, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"

const SideBar = ({ drawerWidth }) => {

    const { displayName } = useSelector((state) => state.auth)

  return (
    <Box
        component='nav'
        sx={{ width: { sm: drawerWidth}, flexShrink: { sm: 0 } }}
    >
        <Drawer
            variant="permanent"
            open
            sx={{ 
                display: {xs: 'block'},
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth}
             }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component='div'>
                    { displayName }
                </Typography>
            </Toolbar>
            <Divider/>

            <List>
                {
                    ['Enero', 'Febrero', 'Marzo', 'Abril'].map( text => {
                        return (
                        <ListItem key={text} >
                            <ListItemButton>
                                <ListItemIcon>
                                    <TurnedInNot/>
                                </ListItemIcon>
                                <Box container>
                                    <ListItemText primary={text}></ListItemText>
                                    <ListItemText secondary={ 'Lorem ipsum, dolor sit amet consectetur ' }></ListItemText>
                                </Box>
                            </ListItemButton>
                        </ListItem>
                        )
                    })
                }
            </List>
        </Drawer>
    </Box>
  )
}

export default SideBar
