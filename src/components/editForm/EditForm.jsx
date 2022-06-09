import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
function EditForm() {
    const [formData,setFormData]=useState({
        PlayerName:"",
        JerseyNumber:"",
        Height:"",
        Weight:"",
        Nationality:"",
        Position:"",

    })

    const handleFormChange=(e)=>{
        e.preventDefault();
        const fieldname=e.target.getAttribute("name")
        const fieldValue=e.target.value;
        const newFormData={...formData}
        newFormData[fieldname]=fieldValue
        setFormData(newFormData)
    }
  return (
   <>
   <Paper sx={{width:"40%",backgroundColor:"#2D2D2D",color:"white"}} elevation={3}>
<div style={{display:"flex",justifyContent:"space-between",width:"90%",margin:"auto",padding:"2%"}}>
    <Typography>Edit Player</Typography>
<CancelIcon/>
</div>
<form>
    <Grid container spacing={2}>
<Grid item xs={6}>
<label >Player Name</label>
    <TextField onChange={handleFormChange} name="PlayerName" sx={{marginTop:"20px",border:"1px solid grey"}}/>
</Grid>
<Grid item xs={6}>
<label>Jersey Number</label>
    <TextField onChange={handleFormChange} name="JerseyNumber" sx={{marginTop:"20px",border:"1px solid grey"}}/>
</Grid>
<Grid item xs={6}>
<label>Height</label>
    <TextField onChange={handleFormChange} name="Height" sx={{marginTop:"20px",border:"1px solid grey"}}/>
</Grid>
<Grid item xs={6}>
<label>Weight</label>
    <TextField onChange={handleFormChange} name="Weight" sx={{marginTop:"20px",border:"1px solid grey"}}/>
</Grid>
<Grid item xs={12}>
<label>Nationality</label>
    <TextField onChange={handleFormChange} name="Nationality" sx={{marginTop:"20px",border:"1px solid grey"}}/>
</Grid>
<Grid item xs={12}>
<label>Position</label>
    <TextField onChange={handleFormChange} name="Position" sx={{marginTop:"20px",border:"1px solid grey"}}/>
</Grid>
    </Grid>
    <Button variant="contained">Edit Player</Button>
</form>
   </Paper>
   </>
  )
}

export default EditForm