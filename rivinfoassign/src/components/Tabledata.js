import React, { useEffect, useState } from "react";
import "../App.css";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
import Modals from "./Modals";
import { Button } from "@material-ui/core";
import TableHead from "./TableHead";
import Header from "./Header";
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(5),
    minWidth: 280,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    maxWidth: 1200,
  },
});

export default function Tabledata() {
  const classes = useStyles2();
  const classesf = useStyles();
  const [currentcity, setCurrentCity] = useState("DELHI");
  const [branch, setBranch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    axios
      .get(`https://vast-shore-74260.herokuapp.com/banks?city=${currentcity}`)
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentcity]);

  const searchBranch = (event) => {
    setBranch(event.target.value);
  };

  return (
    <Header>
      <FormControl variant="outlined" className={classesf.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          Select City
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={currentcity}
          onChange={(e) => setCurrentCity(e.target.value)}
          label="City"
        >
          <MenuItem value="DELHI">Delhi</MenuItem>
          <MenuItem value="MUMBAI">Mumbai</MenuItem>
          <MenuItem value="GURGAON">Gurgaon</MenuItem>
          <MenuItem value="PUNE">Pune</MenuItem>
        </Select>
      </FormControl>
      <input
        type="text"
        placeholder="Enter Branch name to filter"
        value={branch}
        onChange={(e) => searchBranch(e)}
      />

      <div className="tablerepresentation">
        <TableHead />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="custom pagination table">
            <TableBody>
              {(rowsPerPage > 0
                ? data.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data
              )

                .filter((filtereddata) => {
                  if (branch == "") {
                    return filtereddata;
                  } else if (
                    filtereddata.branch
                      .toUpperCase()
                      .includes(branch.toUpperCase())
                  ) {
                    return filtereddata;
                  }
                })
                .map((row, index) => (
                  <TableRow key={index} style={{ height: 40 }}>
                    <TableCell style={{ width: 240 }} align="left">
                      {row.bank_name}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      {row.ifsc}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      {row.branch}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      {row.district}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      {row.city}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="left">
                      <Modals data={row} />
                    </TableCell>
                  </TableRow>
                ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={3} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </Header>
  );
}
