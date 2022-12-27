import {Typography, Link , Box, Divider} from "@mui/material";
import { IDataResponse } from "../interfaces/searchTest";

interface PropsItemSearch {
  web: string;
  data: IDataResponse[];
}

export default function ItemResultSearch(props: PropsItemSearch) {
  return (
    <Box>
      {props.data?.map((item) => (
        <Box key={item.link} sx={{padding: 1.5}}>
          <Link href={item.link} target="_blank">
            {item.title}
          </Link>
          <Typography>{item.date}</Typography>
          <Typography>{item.source}</Typography>
          <Divider sx={{marginTop: 1}}/>
        </Box>
      ))}
    </Box>
  );
  
}
