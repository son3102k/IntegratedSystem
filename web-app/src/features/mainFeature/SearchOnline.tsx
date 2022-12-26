import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import { IRequestBody } from "../../interfaces/searchTest";
import { classList, Math, MidTerm1, subjectList, typeList, webList } from "../../constant/searchOnline";
import { Box, Divider, IconButton, InputBase, Paper, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const initialRequestBody: IRequestBody = {
  type: MidTerm1,
  subject: Math,
  grade: "All",
  level: "",
  text: "",
  page: "",
};

const SelectCSS = { m: "2rem 1rem", minWidth: 200 };

export default function SearchOnline() {
  const [webSearch, setWebSearch] = React.useState("all");

  const [requestBody, setRequestBody] = React.useState(initialRequestBody);
  const handleChange = (
    event: SelectChangeEvent | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    attribute: keyof IRequestBody
  ) => {
    setRequestBody({
      ...requestBody,
      [attribute]: event.target.value,
    });
  };

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(requestBody);
  };

  const renderSelect = (attribute: keyof IRequestBody, options: object) => (
    <FormControl sx={SelectCSS}>
      <InputLabel id={`select_${attribute}_label`}>{attribute}</InputLabel>
      <Select
        labelId={`select_${attribute}_label`}
        id={`select_${attribute}`}
        value={requestBody[attribute]}
        label={attribute}
        onChange={(event) => handleChange(event, attribute)}
      >
        {Object.keys(options).map((opt) => (
          <MenuItem key={opt} value={options[opt as keyof typeof options]}>
            {opt}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <Box sx={{ width: "100%", display: "flex", alignItems: "center", flexDirection: "column" }}>
      <Box sx={{ width: "80%" }}>
        <Paper
          component="form"
          sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "100%" }}
          onSubmit={(event) => submitSearch(event)}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search key word ..."
            onChange={(event) => handleChange(event, "text")}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      <Box sx={{ display: "flex" }}>
        <FormControl sx={SelectCSS}>
          <InputLabel id="select_web_label">Web</InputLabel>
          <Select
            labelId="select_web_label"
            id="select_web"
            value={webSearch}
            label="Web"
            onChange={(event) => setWebSearch(event.target.value)}
          >
            {Object.keys(webList).map((type) => (
              <MenuItem key={type} value={webList[type as keyof typeof webList]}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {renderSelect("type", typeList)}
        {renderSelect("subject", subjectList)}
        {renderSelect("grade", classList)}
      </Box>

      <Box sx={{ width: "100%" }}>
        <Typography sx={{ display: "flex", justifyContent: "center", fontSize: "1.5rem" }}>Result Search</Typography>
        <Divider />
      </Box>
    </Box>
  );
}
