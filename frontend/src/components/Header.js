import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Box, Button, Tabs, Tab } from '@mui/material' // This one installed and you search from the browser by
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';
// writing material ui to get its actual link so that you can install it and it assisted us to use it as navbar

const Header = () => {
    const dispath = useDispatch();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const [value, setValue] = useState();
  return (
    //  The color of the background is derived from CSS Gradient website you can use it in future
    <AppBar 
    position='sticky'
    sx={{ background: "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)"}}>
        <Toolbar>
            <Typography variant='h4'>BlogApp</Typography>

            { isLoggedIn &&  <Box display="flex" marginLeft="auto" marginRight="auto">
                {/* This tab will allow us to navigate between the links it is like a button feature */}
                <Tabs textColor='inherit' value={value} onChange={(e, val) => setValue(val)}>
                   <Tab LinkComponent={Link} to = "/blogs" label = "All Blogs" />
                   <Tab LinkComponent={Link} to = "/myBlogs" label = "My Blogs" />
                   <Tab LinkComponent={Link} to = "/blogs/add" label = "Add Blogs" />
                </Tabs>
              </Box> }

            {/* This box acts like div in the material ui */}
                <Box display="flex" marginLeft="auto">
                    {/* if the user is not logged in we need to show these two buttons only */}
                   { 
                       !isLoggedIn && <> <Button LinkComponent={Link} to = "/auth" variant='contained' 
                       sx={{ margin: 1, borderRadius: 10}} color="warning">Login</Button>
                       <Button LinkComponent={Link} to = "/auth" variant='contained' 
                       sx={{ margin: 1, borderRadius: 10}} color="warning">Signup</Button> </>
                   }
                   { 
                     isLoggedIn &&  
                     (<Button 
                      onClick={() => dispath(authActions.logout())}
                     LinkComponent={Link} 
                     to = "/auth" variant='contained' 
                     sx={{ margin: 1, borderRadius: 10}}
                     color="warning">Logout</Button>
                    )}
                </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header;