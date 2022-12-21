import React, { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, styled } from '@mui/material/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText,Button, Radio } from "@mui/material";
import { wrap } from "module";

const BoxTitleCss = { display: "flex", flexWrap: "nowrap", flexDirection: "row", alignItems: "center" };
const TypoTitleCss = {fontSize: "1.25em", marginLeft: 1}
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const ContentFontCss ={fontSize: "1em", fontWeight: 600};
const AnswerGridCss = {display: "flex", justifyContent: "flex-start"};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f8f8f8',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: "100%"
}));

export default function AutomationTest() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [listQuestion, setListQuestion] = useState([
    {
      id: 0,
      src: require("../../assets/image_login.jpg")
    },
    {
      id: 1,
      src: require("../../assets/exam1/question1.PNG")
    },
    {
      id: 2,
      src: require("../../assets/image_login.jpg")
    },
    {
      id: 3,
      src: require("../../assets/image_login.jpg")
    },
    {
      id: 4,
      src: require("../../assets/image_login.jpg")
    },
    {
      id: 5,
      src: require("../../assets/image_login.jpg")
    },
    {
      id: 6,
      src: require("../../assets/image_login.jpg")
    },
    {
      id: 7,
      src: require("../../assets/image_login.jpg")
    }
  ]);
  const [listAnswers , setListAnswers] = useState(Array(listQuestion.length).fill(null).map(() => ''));
  const handleClickChangeQuestion = (i: number) => {
    setSelectedValue(listAnswers[i]);
    setSelectedIndex(i);
  }

  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    setListAnswers((prev) => [...prev.slice(0 , selectedIndex), event.target.value, ...prev.slice(selectedIndex + 1)])
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h2" color="#072d94" align="left" sx={{fontWeight: 700}}>
            Automatic test
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" align="left">
            Mathematics mid term exam
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={BoxTitleCss}>
            <AccessTimeIcon fontSize="medium" color="disabled" />
            <Typography variant="h6" align="left" color="#c2c2c2" sx={TypoTitleCss}>
              16/11/2022
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              ...BoxTitleCss,
              justifyContent: "center",
            }}
          >
            <AccessTimeIcon fontSize="medium" color="disabled" />
            <Typography variant="h6" align="left" color="#c2c2c2" sx={TypoTitleCss}>
              15 minutes
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              ...BoxTitleCss,
              justifyContent: "center",
            }}
          >
            <AppRegistrationIcon fontSize="medium" color="disabled" />
            <Typography variant="h6" align="left" color="#c2c2c2" sx={TypoTitleCss}>
              {`${listQuestion.length} Questions:`}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={8} sx={{ flexGrow: 1, display: "flex", flexWrap: "wrap" }}>
          <Item>
            <Typography variant="h6" align="left" color="black" sx={ContentFontCss}>
              {`Question ${selectedIndex + 1}:`}
            </Typography>
            <Box
              component="img"
              src={listQuestion[selectedIndex].src}
              alt={`Question ${selectedIndex + 1}`}
              sx={{ height: "auto", width: "100%", marginTop: 5 }}
            />
            <Grid container>
              <Grid item xs={12} md={6} sx={AnswerGridCss}> 
                <Radio
                  checked={selectedValue === "a"}
                  onChange={handleChange}
                  value="a"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "A" }}
                  
                />
              </Grid>
              <Grid item xs={12} md={6} sx={AnswerGridCss}>
                <Radio
                  checked={selectedValue === "b"}
                  onChange={handleChange}
                  value="b"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "B" }}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={AnswerGridCss}>
                <Radio
                  checked={selectedValue === "c"}
                  onChange={handleChange}
                  value="c"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "C" }}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={AnswerGridCss}>
                <Radio
                  checked={selectedValue === "d"}
                  onChange={handleChange}
                  value="d"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "D" }}
                  
                />
              </Grid>
            </Grid>
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
                <List component="nav">
                  <Grid container spacing={2}>
                    {listQuestion.map((e, i) => (
                      <Grid item xs={12} md={2} key={`grid-question-${i}`}>
                        <ListItemButton
                          selected={selectedIndex === i || listAnswers[i] !== ''}
                          onClick={() => handleClickChangeQuestion(i)}
                          key={`itemButton-question-${i}`}
                          // sx={{"&.Mui-selected": {backgroundColor: "#3092ed"}}}
                        >
                          <ListItemText
                            primary={i + 1}
                            sx={{ textAlign: "center" }}
                            key={`itemText-question-${i}`}
                            primaryTypographyProps={{ fontWeight: 700 }}
                          />
                        </ListItemButton>
                      </Grid>
                    ))}
                  </Grid>
                </List>
                <Divider />
                <Button
                  variant="contained"
                  color="success"
                  sx={{ marginTop: 3, marginBottom: 3, backgroundColor: "#f9bf2a" }}
                >
                  Submit
                </Button>
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}