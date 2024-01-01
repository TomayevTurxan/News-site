import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

interface User {
  username: string;
  password: string;
  fullName: string;
  profilImg: string;
  email: string;
}
const PublisherRegister = () => {
  const [userInput, setUserInput] = useState<User>({
    username: "",
    password: "",
    fullName: "",
    profilImg: "",
    email: "",
  });
  return (
    <>
      <TextField
        value={userInput.username}
        onChange={(e) =>
          setUserInput({ ...userInput, username: e.target.value })
        }
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        style={{
          backgroundColor: "white",
        }}
      />
      <TextField
        value={userInput.fullName}
        onChange={(e) =>
          setUserInput({ ...userInput, fullName: e.target.value })
        }
        margin="normal"
        required
        fullWidth
        id="fullName"
        label="fullName"
        name="fullName"
        autoComplete="fullName"
        style={{
          backgroundColor: "white",
        }}
      />

      <TextField
        value={userInput.email}
        onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
        margin="normal"
        required
        fullWidth
        id="email"
        label="email"
        name="email"
        autoComplete="email"
        style={{
          backgroundColor: "white",
        }}
      />
      <TextField
        value={userInput.password}
        onChange={(e) =>
          setUserInput({ ...userInput, password: e.target.value })
        }
        margin="normal"
        required
        fullWidth
        id="password"
        label="password"
        name="password"
        autoComplete="password"
        style={{
          backgroundColor: "white",
        }}
      />
      <Button type="submit" fullWidth variant="contained">
        Sign In
      </Button>
    </>
  );
};

export default PublisherRegister;
