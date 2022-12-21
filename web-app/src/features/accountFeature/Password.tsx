import {Grid, Typography , TextField, Button} from '@mui/material';

const textfieldCss = {width: "20%", marginTop: 1};
const fontTitleCss = {fontWeight: 600}

export default function Password() {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={12}>
        <Typography variant="h4" component="h2" color="#072d94" align="left" sx={{ fontWeight: 700 }}>
          Change Password
        </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <Typography variant="h6" component="h2"  align="left" sx={fontTitleCss}>
          Password
        </Typography>
        <TextField type="password" variant="outlined" sx={textfieldCss}/>
      </Grid>
      <Grid item xs={12} md={12}>
        <Typography variant="h6" component="h2"  align="left" sx={fontTitleCss}>
          New Password
        </Typography>
        <TextField type="password" variant="outlined" sx={textfieldCss}/>
      </Grid>
      <Grid item xs={12} md={12}>
        <Typography variant="h6" component="h2"  align="left" sx={fontTitleCss}>
          Confirm New Password
        </Typography>
        <TextField type="password" variant="outlined" sx={textfieldCss}/>
      </Grid>
      <Grid item xs={12} md={2}>
        <Button variant="contained" color="success" sx={{backgroundColor: "#f9bf2a", fontWeight: 700, width: "50%"}}>Save</Button>
      </Grid>
    </Grid>
  );
}
