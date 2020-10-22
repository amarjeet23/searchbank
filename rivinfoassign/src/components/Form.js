import React, { useState } from "react";
import "../App.css";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 500,
    textAlign: "center",
    backgroundColor: "#fff",
    color: "red",
    fontSize: "13px",
  },
  form: {
    width: "20rem",
    textAlign: "center",
  },

  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
const style = {
  color: "red",
  fontSize: "12px",
};

const Form = () => {
  const classes = useStyles();
  let history = useHistory();
  const [error, setError] = useState({
    nameError: "",
    lnameError: "",
    genderError: "",
    phoneError: "",
    accError: "",
    ifscError: "",
    emailError: "",
  });

  const [values, setValues] = useState({
    name: "",
    lname: "",
    gender: "",
    phone: "",
    acc: "",
    ifsc: "",
    email: "",
    textarea: "textArea",
  });
  const { name, lname, gender, phone, acc, ifsc, email, textarea } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
    setError({
      ...error,
      nameError: "",
      lnameError: "",
      genderError: "",
      phoneError: "",
      accError: "",
      ifscError: "",
      emailError: "",
    });
  };

  const valid = () => {
    if (name.length < 3) {
      return setError({ ...error, nameError: "name is required" });
    } else if (lname.length < 3) {
      return setError({ ...error, lnameError: "Last name is required" });
    } else if (gender == "") {
      return setError({ ...error, genderError: "pls select gender" });
    } else if (phone.length > 10) {
      return setError({ ...error, phoneError: "not more than 10 digit" });
    } else if (!acc.match(/^\d[0-9]+$/)) {
      return setError({ ...error, accError: "pls enter valid acc no" });
    } else if (!ifsc.match(/^[A-Za-z]{4}[0-9]{6,7}$/)) {
      return setError({ ...error, ifscError: "invalid ifsc" });
    }
    // .match(/^[0-9a-z]+$/)
    else if (!email.includes("@")) {
      return setError({ ...error, emailError: "please enter valid email" });
    }
    return true;
  };
  const submit = (e) => {
    e.preventDefault();
    if (valid()) {
      console.log("submitted");
      // console.log(name, lname, gender, phone, acc, ifsc, email);
      console.log(values);
      setValues({
        ...values,
        name: "",
        lname: "",
        gender: "",
        phone: "",
        acc: "",
        ifsc: "",
        email: "",
        textarea: "",
      });
      setError("");
      history.push("/table");
    } else {
      console.log("error! Try Again");
    }
  };
  return (
    <Header>
      <div className="App">
        <Card className={classes.root}>
          <CardContent>
            <h4>information</h4>
            <form noValidate autoComplete="off">
              <TextField
                className={classes.form}
                id="outlined-basic"
                label="*first Name"
                variant="outlined"
                value={name}
                onChange={handleChange("name")}
              />
              <br />
              {error.nameError}
              <br />
              <TextField
                className={classes.form}
                id="outlined-basic"
                label="*Last Name"
                variant="outlined"
                value={lname}
                onChange={handleChange("lname")}
              />
              <br />
              {error.lnameError}
              <br />

              <select
                style={{
                  width: "20rem",
                  height: "3.3rem",
                  borderRadius: "4px",
                }}
                onChange={handleChange("gender")}
              >
                <option value="gender">Gender</option>
                <option value={"male"}>Male</option>
                <option value={"female"}>Female</option>
              </select>
              <br />
              {error.genderError}
              <br />
              <TextField
                className={classes.form}
                id="outlined-basic"
                label="Account No"
                variant="outlined"
                value={acc}
                onChange={handleChange("acc")}
              />
              <br />
              {error.accError}
              <br />
              <TextField
                style={{ width: "10rem", marginTop: "10px" }}
                id="outlined-basic"
                label="IFSC"
                variant="outlined"
                value={ifsc}
                onChange={handleChange("ifsc")}
              />
              <TextField
                style={{ width: "10rem", marginTop: "10px" }}
                id="outlined-basic"
                label="phone(optional)"
                variant="outlined"
                value={phone}
                onChange={handleChange("phone")}
              />
              <br />
              {error.ifscError}
              {error.phoneError}
              <br />
              <TextField
                className={classes.form}
                id="outlined-basic"
                label="*email"
                variant="outlined"
                value={email}
                onChange={handleChange("email")}
              />
              <br />
              {error.emailError}
              <br />
              <TextareaAutosize
                style={{ minWidth: "19rem", height: "3rem", marginTop: "0px" }}
                rowsMax={4}
                aria-label="maximum height"
                label="Notes..."
                placeholder="textArea"
                value={textarea}
                onChange={handleChange("textarea")}
              />
              <Button
                style={{
                  width: "20rem",
                  marginBottom: "1rem",
                  marginTop: "1rem",
                }}
                variant="contained"
                color="primary"
                onClick={(e) => submit(e)}
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Header>
  );
};

export default Form;
