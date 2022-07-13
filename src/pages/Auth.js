import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { Button } from "@mui/material";
import "./auth.css";
import { createTheme, ThemeProvider } from "@mui/material";

const Auth = () => {
  const [register, setRegister] = useState(true);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#34469c",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <>
        <div className="bg-image">
          {register ? <Register /> : <Login />}

          <div className="button">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setRegister(!register);
              }}
            >
              {register ? "Switch to Login" : "Switch to Register"}
            </Button>
          </div>
        </div>
      </>
    </ThemeProvider>
  );
};

export default Auth;
