import React from 'react';
import { Card, CardHeader, Avatar, CardMedia, CardContent, Typography, Box, IconButton } from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';


const Blog = ({ title, describtion, imageURL, userName, isUser, id }) => {
  const navigate = useNavigate();
  const handleEdit = (e) => {
   navigate(`/blogs/${id}`);
  };
  const handleDelete = (e) => {
    
  }
  return (
    <div>
    <Card sx={{ width: '40%',
       margin: 'auto',
        mt:2, padding:2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
        }}
        >

          {
            isUser && (
              <Box display="flex">
                <IconButton onClick={handleEdit} sx={{ marginLeft: "auto"}}> 
                  <ModeEditOutlineIcon /> 
                  </IconButton>
                <IconButton onClick={handleDelete}> 
                  <DeleteForeverIcon /> 
                  </IconButton>
              </Box>
            )
          }
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
            {userName}
          </Avatar>
        }
       
        title={title}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={imageURL}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <b>{ userName }</b> {": "} {describtion}
        </Typography>
      </CardContent>
      
    </Card>
    </div>
  )
}

export default Blog