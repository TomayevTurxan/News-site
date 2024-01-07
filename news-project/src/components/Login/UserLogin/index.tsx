import React from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { setUser } from "../../../reduxTol0kit/userSlice/userSlice";
import { setUsers } from "../../../reduxTol0kit/userSlices/usersSlice";
import * as Yup from "yup";

interface User {
  _id: string;
  username: string;
  password: string;
  fullName: string;
  profilImg: string;
  email: string;
}

const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.users);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      handleLogin(values.username, values.password);
      console.log("values",values);
      formik.resetForm();
    },
  });

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users");
        const fetchedUsers = response.data.data;
        console.log("users", fetchedUsers);
        dispatch(setUsers(fetchedUsers));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handleLogin = (username: string, password: string) => {
    const foundUser = users.find(
      (user: User) => user.username === username && user.password === password
    );
    console.log("foundUser", foundUser);
    if (foundUser) {
      alert("XOS GELDINIZ " + foundUser.username);
      localStorage.setItem("user", JSON.stringify(foundUser));
      dispatch(setUser(foundUser));
      navigate("/user/Home");
    } else {
      alert( "BELE BIR ISTIFADECI YOXDUR.");
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        margin="normal"
        fullWidth
        id="username"
        label="Username"
        autoComplete="username"
        autoFocus
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.username}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
        style={{
          backgroundColor: "white",
        }}
      />
      <TextField
        margin="normal"
        fullWidth
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        style={{
          backgroundColor: "white",
        }}
      />
      <Button type="submit" fullWidth variant="contained">
        Login
      </Button>
    </form>
  );
};

export default UserLogin;
