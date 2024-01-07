import React from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {  useFormik } from "formik";
import { setPublishers } from "../../../reduxTol0kit/publisherSlices/publishersSlice";
import { setPublisher } from "../../../reduxTol0kit/publisherSlice/publisherSlice";
import { loginPublisher } from "../../../api/publishers";
import * as Yup from "yup";
import Swal from "sweetalert2"
import {jwtDecode} from "jwt-decode"
import {setCookie} from "../../../../helpers/setCookie"
import { RootState } from "../../../reduxTol0kit/store";

const PublisherLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const publishers = useSelector((state: RootState) => state.publishers.publishers);
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/publishers");
        const publishers = response.data.data;
        console.log("publishers", publishers);
        dispatch(setPublishers(publishers));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [dispatch]);
  const formik = useFormik({
    initialValues: {
      publisherName: "",
      password: "",
    },
    validationSchema: Yup.object({
      publisherName: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      handleLogin(values.publisherName, values.password);
      formik.resetForm();
    }
  });

  const handleLogin = async (publisherName: string, password: string) => {
    try {
      const response = await loginPublisher({ publisherName, password });
      console.log(response);
      if (response && response.status === 200) {
        setCookie("token",response.token,"7d")
        const decode = jwtDecode(response.token as string)
        console.log(decode);
        Swal.fire({
          icon: 'success',
          title: 'Welcome!',
          text: `XOS GELDINIZ ${publisherName}`,
        });
  
        localStorage.setItem('publisher', JSON.stringify(decode));
        dispatch(setPublisher(decode));
        navigate('/user/Home');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response && response.message ? response.message : 'An error occurred while logging in.',
        });
      }
    } catch (error) {
      console.error("Login function error:", error);
  
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while logging in.',
      });
    }
  };

  return (
      <form onSubmit={formik.handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="publisherName"
          label="PublisherName"
          autoComplete="publisherName"
          autoFocus
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.publisherName}
          error={formik.touched.publisherName && Boolean(formik.errors.publisherName)}
          helperText={formik.touched.publisherName && formik.errors.publisherName}
          style={{
            backgroundColor: "white",
          }}
        />
        <TextField
          margin="normal"
          required
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

export default PublisherLogin;
