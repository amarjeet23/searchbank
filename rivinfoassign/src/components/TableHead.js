import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    maxWidth: 1200,
  },
});

export default function Head() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ width: 240 }} align="left">
              Bank Name
            </StyledTableCell>
            <StyledTableCell style={{ width: 160 }} align="left">
              IFSC
            </StyledTableCell>
            <StyledTableCell style={{ width: 160 }} align="left">
              Branch
            </StyledTableCell>
            <StyledTableCell style={{ width: 160 }} align="left">
              District
            </StyledTableCell>
            <StyledTableCell style={{ width: 160 }} align="left">
              City
            </StyledTableCell>
            <StyledTableCell style={{ width: 160 }} align="left">
              Details
            </StyledTableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}
