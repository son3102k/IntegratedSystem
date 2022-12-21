import {Grid, Typography, TextField, MenuItem, Button} from '@mui/material';

const textfieldCss = {width: "70%", marginTop: 1};
const fontTitleCss = {fontWeight: 600}

const genders = [
  {
    value: 'F',
    label: 'Female',
  },
  {
    value: 'M',
    label: 'Male',
  },
  {
    value: 'O',
    label: 'Other',
  },
];


export default function Account() {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={12}>
        <Typography variant="h4" component="h2" color="#072d94" align="left" sx={{ fontWeight: 700 }}>
          Information
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" component="h2"  align="left" sx={fontTitleCss}>
          Name
        </Typography>
        <TextField variant="outlined" sx={textfieldCss}/>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" component="h2"  align="left" sx={fontTitleCss}>
          Phone Number
        </Typography>
        <TextField variant="outlined" sx={textfieldCss}/>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" component="h2"  align="left" sx={fontTitleCss}>
          Email
        </Typography>
        <TextField variant="outlined" sx={textfieldCss}/>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" component="h2"  align="left" sx={fontTitleCss}>
          School
        </Typography>
        <TextField variant="outlined" sx={textfieldCss}/>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" component="h2"  align="left" sx={fontTitleCss}>
          Class
        </Typography>
        <TextField variant="outlined" sx={textfieldCss}/>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" component="h2"  align="left" sx={fontTitleCss}>
          Gender
        </Typography>
        <TextField 
          select
          defaultValue="F" sx={textfieldCss}>
            {genders.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
            ))}
        </TextField>
      </Grid>
      <Grid item xs={12} md={2}>
        <Button variant="contained" color="success" sx={{backgroundColor: "#f9bf2a", fontWeight: 700, width: "50%"}}>Save</Button>
      </Grid>
    </Grid>
  );
}
