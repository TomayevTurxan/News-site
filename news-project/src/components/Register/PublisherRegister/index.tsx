import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";

const PublisherRegister = () => {
  const [file, setFile] = useState<File | null>(null);
  const formik = useFormik({
    initialValues: {
      publisherName: "",
      password: "",
      fullName: "", 
      email: "",
      isVerify: false,
      file: null,
    },
    validationSchema: Yup.object({
      publisherName: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
      fullName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log("Form errors:", formik.errors);
      console.log("file:", file);
      console.log("values:", formik.values);
      try {
        const formData = new FormData();

        formData.append("file", file);
        formData.append("publisherName", values.publisherName);
        formData.append("password", values.password);
        formData.append("fullName", values.fullName);
        formData.append("email", values.email);
        formData.append("isVerify", values.isVerify);

        const formSend =  {
          file: formData.get("file"),
          publisherName: formData.get("publisherName"),
          password: formData.get("password"),
          fullName: formData.get("fullName"),
          email: formData.get("email"),
          isVerify: formData.get("isVerify")
        }
        console.log("formSend", formSend);

        const res = await axios.post(
          "http://localhost:8080/api/publishers",
          formSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
          );

        // console.log("Response", res.data);

        if (res.status === 201) {
          alert("Registration successful!");
          resetForm();
        } else {
          alert("Registration failed");
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    },
  });

  return (
    <>
      <form
        method="post"
        encType="multipart/form-data"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          id="publisherName"
          name="publisherName"
          label="Publisher Name"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.publisherName}
          error={
            formik.touched.publisherName && Boolean(formik.errors.publisherName)
          }
          helperText={
            formik.touched.publisherName && formik.errors.publisherName
          }
          style={{
            backgroundColor: "white",
          }}
        />
        <TextField
          id="fullName"
          name="fullName"
          label="Full Name"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fullName}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
          style={{
            backgroundColor: "white",
          }}
        />
        <TextField
          id="email"
          name="email"
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          style={{
            backgroundColor: "white",
          }}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          style={{
            backgroundColor: "white",
          }}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          name="file"
        />
        <Button type="submit" fullWidth variant="contained">
          Register
        </Button>
      </form>
    </>
  );
};

export default PublisherRegister;
