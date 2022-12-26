import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { IDataResponse } from "../interfaces/searchTest";

interface PropsItemSearch {
  web: string;
  data: IDataResponse[];
}

export default function ItemResultSearch(props: PropsItemSearch) {
  return (
    <Accordion id={`panel__${props.web}`}>
      <AccordionSummary aria-controls={`panel__content__${props.web}`} id={`panel__header__${props.web}`}>
        <Typography>{props.web}</Typography>
      </AccordionSummary>
      {props.data?.map((item) => (
        <AccordionDetails key={item.link}>
          <Typography>{item.title}</Typography>
          <Typography>{item.date}</Typography>
        </AccordionDetails>
      ))}
    </Accordion>
  );
}
