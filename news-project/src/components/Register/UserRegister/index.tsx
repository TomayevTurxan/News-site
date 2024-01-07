import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
interface User {
  username: string;
  password: string;
  imgUrl:string;
  fullName: string;
  email: string;
}

const UserRegister = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      fullName: "",
      imgUrl:"",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      fullName: Yup.string().required("Required"),
      imgUrl: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log("values", values);
      try {
        const res = await axios.post("http://localhost:8080/api/users", {
          username: values.username,
          fullName: values.fullName,
          imgUrl: values.imgUrl,
          email: values.email,
          password: values.password,
        });
        console.log("response", res.data);
        if (res) {
          alert("ugurlu oldu")
          resetForm()
        }else{
          alert("uhgursuz")
        }
      } catch (error) {
        console.error("PROBLEM VAR BRAT", error);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="username"
          name="username"
          label="Username"
          fullWidth
          margin="normal"
          variant="outlined"
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
          id="fullName"
          name="fullName"
          label="fullName"
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
          id="imgUrl"
          name="imgUrl"
          label="imgUrl"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.imgUrl}
          error={formik.touched.imgUrl && Boolean(formik.errors.imgUrl)}
          helperText={formik.touched.imgUrl && formik.errors.imgUrl}
          style={{
            backgroundColor: "white",
          }}
        />
        <TextField
          id="email"
          name="email"
          label="email"
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
        <Button type="submit" fullWidth variant="contained">
          Sign In
        </Button>
      </form>
    </>
  );
};

export default UserRegister;
