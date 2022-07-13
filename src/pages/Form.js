import { useState, useEffect } from "react";
import * as React from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "./form.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import formbg from "../assets/formbg.jpg";
import { blue } from "@mui/material/colors";

const Form = () => {
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [dropdown1, setDropdown1] = useState("");
  const [dropdown2, setDropdown2] = useState("");
  const [messages, setMessages] = useState([{}]);

  const handleSubmit = async () => {
    if (
      files.length < 1 &&
      value1.length < 1 &&
      value2.length < 1 &&
      value3.length < 1 &&
      dropdown1.length < 1 &&
      dropdown2.length < 1
    ) {
      setMessages([...messages, { msg: "Form cannot be blank." }]);
      setTimeout(() => {
        setMessages([]);
      }, 1500);
    } else {
      let formData = new FormData();
      formData.append("value1", value1);
      formData.append("value2", value2);
      formData.append("value3", value3);
      formData.append("dropdown1", dropdown1);
      formData.append("dropdown2", dropdown2);
      formData.append("id", user.user.id);
      formData.append("email", user.user.email);
      formData.append("firstName", user.user.firstName);
      formData.append("company", user.user.company);
      if (files.length > 0) {
        for (const file of files) {
          formData.append(`pdfs`, file, file.name);
        }
      }

      await axios
        .post("http://127.0.0.1:5000/api/user/upload", formData)
        .then((response) => {
          setMessages([...messages, response.data.msg]);
          console.log(response);
          setTimeout(() => {
            setMessages([]);
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          setMessages([...messages, error.response.data]);
          setTimeout(() => {
            setMessages([]);
          }, 2000);
        });
    }
  };

  let navigate = useNavigate();
  useEffect(() => {
    let info = localStorage.getItem("info");
    info = JSON.parse(info);

    if (!info) {
      navigate("/");
    } else {
      setUser(info);
    }
  }, []); // eslint-disable-line

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [values, setValue] = React.useState("");

  const handleChanges = (event) => {
    setValue(event.target.value);
  };
  return (
    <Box
      class="formbg"
      style={{
        backgroundImage: `url(${formbg})`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Header />
      <div>
        <div className="formSectionOne">
          <Stack spacing={3}>
            <div className="stars">
              <TextField
                onChange={(e) => {
                  setValue1(e.target.value);
                }}
                type="text"
                id="value1"
                name="value1"
                placeholder="Stars #"
                htmlFor="starsNumber"
                variant="standard"
              />
            </div>
            <div>
              <TextField
                onChange={(e) => {
                  setValue2(e.target.value);
                }}
                type="text"
                id="value2"
                name="value2"
                placeholder="Project Name"
                htmlFor="projectName"
                variant="standard"
              />
            </div>
          </Stack>
          <br></br>
          <br></br>

          {/* here is where to start the dropdown divs for two columns CREATE NEW DIV HERE */}
          <div className="row">
            <div class="column">
              <div className="selections">
                <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="typeOfBid">Type</InputLabel>
                  <Select
                    labelId="typeOfBid"
                    id="typeOfBid"
                    value={age}
                    onChange={handleChange}
                    label="Age"
                  >
                    <MenuItem value={1}>Budget</MenuItem>
                    <MenuItem value={2}>Firm Bid</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="selections">
                <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="quotationSelection">
                    Quotation Selection
                  </InputLabel>
                  <Select
                    labelId="quotationSelection"
                    id="quotationSelection"
                    value={values}
                    onChange={handleChanges}
                    label="quotationSelection"
                  >
                    <MenuItem value={1}>Pump Selections Only</MenuItem>
                    <MenuItem value={2}>Pump Quotation</MenuItem>
                    <MenuItem value={3}>
                      {" "}
                      Pump Quotation Including Motors
                    </MenuItem>
                    <MenuItem value={4}>Motor Quotation Only</MenuItem>
                    <MenuItem value={5}>Motor Quotation Only</MenuItem>
                    <MenuItem value={6}>
                      Review STARS file and advise price on RFQ's
                    </MenuItem>
                    <MenuItem value={7}>
                      Other(Be descriptive in the comments below)
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="textbox">
                <TextField
                  style={{ marginTop: 20, width: 600 }}
                  id="standard-multiline-static"
                  label="Other Comments"
                  multiline
                  rows={8}
                  variant="standard"
                />
              </div>
              <div>
                <Stack spacing={3}>
                  <div class="buttoncolumn">
                    <Button variant="contained" component="label">
                      Upload File(s)
                      <input
                        type="file"
                        hidden
                        onChange={(e) => {
                          setFiles(e.target.files);
                        }}
                        id="file"
                        name="file"
                        accept="application/pdf"
                        multiple
                      />
                    </Button>
                  </div>

                  <div class="buttoncolumn">
                    <Button
                      id="submission"
                      variant="contained"
                      onClick={handleSubmit}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
      <div>
        {messages.map((message) => {
          return <p key={message.msg}>{message.msg}</p>;
        })}
      </div>
    </Box>
  );
};

export default Form;
