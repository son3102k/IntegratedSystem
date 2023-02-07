import React, { useEffect, useState } from "react";
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { Divider, List, ListItemButton, ListItemText, Button, Radio, ListItem } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../LogInRegister/AuthSlice";
import { getAllQuestionByExamId, getAllTest } from "../../apis/exam";
import { IAnswer, IListAnswer, IQuestion, ITestDescription } from "../../interfaces/exam";
import { useNavigate } from "react-router-dom";
import { Router_History } from "../../constant/routerComponent";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const BoxTitleCss = { display: "flex", flexWrap: "nowrap", flexDirection: "row", alignItems: "center" };
const TypoTitleCss = { fontSize: "1.25em", marginLeft: 1 };
// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });
const ContentFontCss = { fontSize: "1em", fontWeight: 600 };
const AnswerGridCss = { display: "flex", justifyContent: "flex-start" };

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#f8f8f8",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "100%",
}));

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const initDataExam: ITestDescription[] = [];
const initDataQuestion: IQuestion[] = [];
// const initDataAnswer: IListAnswer[] = [];
export default function AutomationTest() {
  const auth = useAppSelector(selectAuth);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [listExam, setListExam] = useState(initDataExam);
  const [listQuestion, setListQuestion] = useState(initDataQuestion);
  const [listDataAnswer, setListDataAnswer] = useState([]);
  const [isExamSelected, setIsExamSelected] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    getAllTest(auth.accessToken)
      .then((res) => setListExam(res.data["data"]))
      .catch((err) => console.log(err));
  }, []);

  const [listAnswers, setListAnswers] = useState(
    Array(listQuestion.length)
      .fill(null)
      .map(() => "")
  );
  const handleClickChangeQuestion = (i: number) => {
    setSelectedValue(listAnswers[i]);
    setSelectedIndex(i);
  };

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    setListAnswers((prev) => [...prev.slice(0, selectedIndex), event.target.value, ...prev.slice(selectedIndex + 1)]);
  };

  const handleClickSelectExam = (exam: ITestDescription) => {
    setIsExamSelected(true);
    console.log(exam);
    getAllQuestionByExamId(auth.accessToken, exam.id)
      .then((res) => {
        setListQuestion(res.data["data"]["listQuestion"]);
        setListDataAnswer(res.data["data"]["listAnswer"]);
      })
      .catch((err) => console.log(err));
  };
  const handleClickSubmit = () => {
    setOpen(true);
    setTimeout(()=> {
      navigate(Router_History);
    },1500);
  };

  return (
    <>
      {isExamSelected ? (
        <Box sx={{ flexGrow: 1 }}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
              Nộp bài thi thành công
            </Alert>
          </Snackbar>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" component="h2" color="#072d94" align="left" sx={{ fontWeight: 700 }}>
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
                  src={`data:image/jpeg;base64,${listQuestion.length > 0 && listQuestion[selectedIndex]["content"]}`}
                  alt={`Question ${selectedIndex + 1}`}
                  sx={{ height: "auto", width: "100%", marginTop: 5 }}
                />
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6} sx={AnswerGridCss}>
                    <Radio
                      checked={selectedValue === "a"}
                      onChange={handleChange}
                      value="a"
                      name="radio-buttons"
                      inputProps={{ "aria-label": "A" }}
                    />
                    <Box
                      component="img"
                      src={`data:image/jpeg;base64,${
                        listDataAnswer.length > 0 && listDataAnswer[selectedIndex][0]["content"]
                      }`}
                      alt={`Question ${selectedIndex + 1}`}
                      sx={{ height: "auto", width: "90%", marginTop: 5 }}
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
                    <Box
                      component="img"
                      src={`data:image/jpeg;base64,${
                        listDataAnswer.length > 0 && listDataAnswer[selectedIndex][1]["content"]
                      }`}
                      alt={`Question ${selectedIndex + 1}`}
                      sx={{ height: "auto", width: "90%", marginTop: 5 }}
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
                    <Box
                      component="img"
                      src={`data:image/jpeg;base64,${
                        listDataAnswer.length > 0 && listDataAnswer[selectedIndex][2]["content"]
                      }`}
                      alt={`Question ${selectedIndex + 1}`}
                      sx={{ height: "auto", width: "90%", marginTop: 5 }}
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
                    <Box
                      component="img"
                      src={`data:image/jpeg;base64,${
                        listDataAnswer.length > 0 && listDataAnswer[selectedIndex][3]["content"]
                      }`}
                      alt={`Question ${selectedIndex + 1}`}
                      sx={{ height: "auto", width: "90%", marginTop: 5 }}
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
                              selected={selectedIndex === i || listAnswers[i] !== undefined}
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
                      onClick={handleClickSubmit}
                    >
                      Submit
                    </Button>
                  </Item>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box>
          <Box sx={{ width: "100%", bgcolor: "#f2f2f2" }}>
            <List>
              {listExam?.map((exam, index) => (
                <div key={`div-exam-${index}`}>
                  <ListItem disablePadding key={`list-item-exam-${index}`}>
                    <ListItemButton onClick={() => handleClickSelectExam(exam)} key={`list-item-button-exam-${index}`}>
                      <ListItemText primary={exam.name} secondary={exam.type} key={`list-item-text-exam-${index}`} />
                    </ListItemButton>
                  </ListItem>
                  <Divider key={`divider-exam-${index}`} />
                </div>
              ))}
            </List>
          </Box>
        </Box>
      )}
    </>
  );
}
