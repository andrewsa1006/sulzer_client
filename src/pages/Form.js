import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Form = () => {
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [dropdown1, setDropdown1] = useState("");
  const [dropdown2, setDropdown2] = useState("");
  const [messages, setMessages] = useState([{ msg: "Here is a test" }]);

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
  return (
    <div className="Form">
      <h1>This is the form page</h1>

      <label htmlFor="value1">value1:</label>
      <input
        onChange={(e) => {
          setValue1(e.target.value);
        }}
        type="text"
        id="value1"
        name="value1"
        placeholder="value1"
      ></input>

      <label htmlFor="value2">value2:</label>
      <input
        onChange={(e) => {
          setValue2(e.target.value);
        }}
        type="text"
        id="value2"
        name="value2"
        placeholder="value2"
      ></input>

      <label htmlFor="value3">value3:</label>
      <input
        onChange={(e) => {
          setValue3(e.target.value);
        }}
        type="text"
        id="value3"
        name="value3"
        placeholder="value3"
      ></input>

      <label htmlFor="dropdown1">dropdown1:</label>
      <select
        onChange={(e) => {
          setDropdown1(e.target.value);
        }}
        name="dropdown1"
        id="dropdown1"
      >
        <option>Select...</option>
        <option>The quick brown fox</option>
        <option>Jumped over the lazy cat</option>
        <option>This is some more text</option>
        <option>Just to fill the empty space</option>
      </select>

      <label htmlFor="dropdown2">dropdown1:</label>
      <select
        onChange={(e) => {
          setDropdown2(e.target.value);
        }}
        name="dropdown2"
        id="dropdown2"
      >
        <option>Select...</option>
        <option>Jumped over the lazy cat</option>
        <option>This is some more text</option>
        <option>Just to fill the empty space</option>
      </select>

      <br />

      <label htmlFor="file">Upload PDF:</label>
      <input
        onChange={(e) => {
          setFiles(e.target.files);
        }}
        type="file"
        id="file"
        name="file"
        accept="application/pdf"
        multiple
      />
      <br />
      <button onClick={handleSubmit} type="submit">
        Submit
      </button>
      <br />
      <br />
      <div>
        {messages.map((message) => {
          return <p key={message.msg}>{message.msg}</p>;
        })}
      </div>
    </div>
  );
};

export default Form;
