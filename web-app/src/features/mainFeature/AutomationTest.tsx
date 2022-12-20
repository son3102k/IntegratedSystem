import React from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, styled } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import test_image from '../../assets/image_login.jpg' ;

const BoxTitleCss = { display: "flex", flexWrap: "nowrap", flexDirection: "row", alignItems: "center" };
const TypoTitleCss = {fontSize: "1.25em", marginLeft: 1}
const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
});
const ContentFontCss ={fontSize: "1em", fontWeight: 600};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f8f8f8',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function AutomationTest() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    // <Box sx={{ width: '100%' }}>
    //   <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    //     <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
    //       <Tab label="Item One" {...a11yProps(0)} />
    //       <Tab label="Item Two" {...a11yProps(1)} />
    //       <Tab label="Item Three" {...a11yProps(2)} />
    //     </Tabs>
    //   </Box>
    //   <TabPanel value={value} index={0}>
    //     Item One
    //   </TabPanel>
    //   <TabPanel value={value} index={1}>
    //     Item Two
    //   </TabPanel>
    //   <TabPanel value={value} index={2}>
    //     Item Three
    //   </TabPanel>
    // </Box>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" component="h2" color="#072d94" align="left">
            Thi thử tự động
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" align="left">
            Mathematics mid term exam
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={BoxTitleCss}>
            <AccessTimeIcon fontSize="medium" color="disabled"/>
            <Typography variant="h6" align="left" color="#c2c2c2" sx={TypoTitleCss}>
              16/11/2022
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{
            ...BoxTitleCss,
            justifyContent: "center"
          }}>
            <AccessTimeIcon fontSize="medium" color="disabled"/>
            <Typography variant="h6" align="left" color="#c2c2c2" sx={TypoTitleCss}>
              15 minutes
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{
              ...BoxTitleCss,
              justifyContent: "center"}}>
            <AppRegistrationIcon fontSize="medium" color="disabled"/>
            <Typography variant="h6" align="left" color="#c2c2c2" sx={TypoTitleCss}>
              10 questions
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={8} sx={{flexGrow: 1}}>
          <Item>
            <Typography variant="h6" align="left" color="black" sx={ContentFontCss}>
                Question 1:
            </Typography>
            <Box component="img" src={test_image} alt="Question 1" sx={{ height: 400, width: "auto", marginTop: 5 }}/>
          </Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={2} md={12}>
              <Item>
                <Typography variant="h6" align="left" color="black" sx={ContentFontCss}>
                  Time remaining:
                </Typography>
                <Typography variant="h6" align="left" color="#2666a1" sx={ContentFontCss}>
                  15:00 minutes
                </Typography>
              </Item>
            </Grid>
            <Grid item xs={10} md={12}>
              <Item>
                <Typography variant="h6" align="left" color="black" sx={ContentFontCss}>
                  Questions
                </Typography>
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}