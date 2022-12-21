import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Grid, Typography} from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: 700,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  id: number,
  subject: string,
  name: string,
  date: string,
  point: number,
) {
  return { id, subject, name, date, point };
}

const rows = [
  createData(1 , 'Math', 'Đề thi giữa kỳ', '17/11/2022', 9),
  createData(2 , 'Physic', 'Đề thi giữa kỳ' , '19/11/2022' , 9.5),
  createData(3 , 'Chemistry', 'Đề thi giữa kỳ' , '21/11/2022', 9)
];

export default function HistoryTest() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Typography variant="h4" component="h2" color="#072d94" align="left" sx={{ fontWeight: 700 }}>
          Test History
        </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell align="left">SUBJECT</StyledTableCell>
                <StyledTableCell align="left">NAME</StyledTableCell>
                <StyledTableCell align="left">DATE</StyledTableCell>
                <StyledTableCell align="left">POINT</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.subject}</StyledTableCell>
                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="left">{row.date}</StyledTableCell>
                  <StyledTableCell align="left">{row.point}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
