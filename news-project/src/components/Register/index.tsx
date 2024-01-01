import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import userSlice, { setUsers } from "../../reduxTol0kit/userSlices/usersSlice";
import axios from "axios";
import style from "./index.module.scss";
import Radio from "@mui/material/Radio";
import UserRegister from "./UserRegister";
import PublisherRegister from "./PublisherRegister";
const defaultTheme = createTheme();

export default function Login() {
  console.log("parent render olundu");

  const dispatch = useDispatch(userSlice);
  const users = useSelector((state) => state.user.users);
  const [error, setError] = useState<string | null>(null);

  const [selectedValue, setSelectedValue] = useState("first");

  interface StyledFormControlLabelProps extends FormControlLabelProps {
    checked: boolean;
  }

  const StyledFormControlLabel = styled(
    (props: StyledFormControlLabelProps) => <FormControlLabel {...props} />
  )(({ theme, checked }) => ({
    ".MuiFormControlLabel-label": checked && {
      color: theme.palette.primary.main,
    },
  }));

  function MyFormControlLabel(props: FormControlLabelProps) {
    const radioGroup = useRadioGroup();

    let checked = false;

    if (radioGroup) {
      checked = radioGroup.value === props.value;
    }

    return <StyledFormControlLabel checked={checked} {...props} />;
  }
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users");
        const users = response.data.data;
        console.log("users", users);
        dispatch(setUsers(users));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);


  
  console.log("selectedValue", selectedValue);

  return (
    <div className={style.register}>
      <div className="col-md-6">
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" className="col-md-6" maxWidth="xs">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ margin: "0 auto", width: "29%" }}>
                <svg style={{ fill: "white", height: "32px" }}>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.99999 6.99999H15.7552C17.7458 6.99999 19.2878 7.39887 20.3811 8.19576C21.4741 8.99309 22.021 10.1385 22.021 11.6321C22.021 12.4881 21.8252 13.2308 21.4335 13.8601C21.0419 14.4894 20.4625 14.9891 19.6958 15.358C20.7563 15.7104 21.5682 16.2686 22.1311 17.0321C22.6941 17.796 22.9755 18.7232 22.9755 19.814C22.9755 20.8882 22.7021 21.8114 22.1555 22.5832C21.6087 23.3553 20.8296 23.9513 19.8182 24.3706C18.8062 24.7903 17.5909 25 16.1713 25H8.99999V6.99999ZM0 32H32V0H0V32ZM48.9999 6.99999H55.7551C57.7457 6.99999 59.2877 7.39887 60.3811 8.19576C61.4741 8.99309 62.0209 10.1385 62.0209 11.6321C62.0209 12.4881 61.8251 13.2308 61.4334 13.8601C61.0419 14.4894 60.4624 14.9891 59.6957 15.358C60.7562 15.7104 61.568 16.2686 62.1311 17.0321C62.694 17.796 62.9753 18.7232 62.9753 19.814C62.9753 20.8882 62.7019 21.8114 62.1554 22.5832C61.6087 23.3553 60.8297 23.9513 59.818 24.3706C58.8062 24.7903 57.5908 25 56.1712 25H48.9999V6.99999ZM39.9999 32H71.9999V0H39.9999V32ZM55.8775 17.2209H52.6469V22.0797H55.8286C56.9216 22.0797 57.7622 21.8743 58.3497 21.4629C58.9369 21.0518 59.2308 20.4602 59.2308 19.6881C59.2308 18.0435 58.1128 17.2209 55.8775 17.2209ZM55.4125 9.92026C57.3541 9.92026 58.3252 10.6338 58.3252 12.06C58.3252 12.7988 58.0763 13.3735 57.5787 13.7846C57.0808 14.196 56.3588 14.4014 55.4125 14.4014H52.6469V9.92026H55.4125ZM15.4126 9.92026C17.3542 9.92026 18.3253 10.6338 18.3253 12.06C18.3253 12.7988 18.0763 13.3735 17.5787 13.7846C17.0808 14.196 16.3588 14.4014 15.4126 14.4014H12.6469V9.92026H15.4126ZM15.8776 17.2209H12.6469V22.0797H15.8287C16.9217 22.0797 17.7623 21.8743 18.3497 21.4629C18.937 21.0518 19.2308 20.4602 19.2308 19.6881C19.2308 18.0435 18.1129 17.2209 15.8776 17.2209ZM100.391 24.8338C101.373 24.5956 102.237 24.2706 102.982 23.8592V20.4292C101.407 21.4001 99.6879 21.8851 97.8249 21.8851C96.6052 21.8851 95.5677 21.6549 94.7125 21.1942C93.857 20.7338 93.2048 20.0633 92.7562 19.1831C92.3071 18.3032 92.0829 17.238 92.0829 15.9876C92.0829 14.7377 92.3155 13.6766 92.7814 12.8045C93.2472 11.9327 93.9161 11.2665 94.7887 10.8058C95.6608 10.3454 96.7153 10.1148 97.9519 10.1148C98.8494 10.1148 99.705 10.2343 100.518 10.4726C101.331 10.7113 102.084 11.0609 102.779 11.5212V8.01737C102.017 7.62259 101.191 7.32259 100.302 7.1167C99.4128 6.91126 98.4683 6.80826 97.4691 6.80826C96.0292 6.80826 94.7292 7.02226 93.5691 7.44981C92.4088 7.87781 91.4136 8.4947 90.5839 9.30048C89.7537 10.1067 89.1187 11.0732 88.6783 12.1999C88.2377 13.3269 88.0176 14.5896 88.0176 15.9876C88.0176 17.4188 88.2295 18.7062 88.6529 19.8493C89.0761 20.9929 89.6859 21.9591 90.4822 22.7488C91.2782 23.5383 92.252 24.143 93.404 24.5624C94.5557 24.9819 95.8515 25.1917 97.2912 25.1917C98.375 25.1917 99.4085 25.0721 100.391 24.8338ZM112 32H79.9998V4.44444e-05H112V32Z"
                  ></path>
                </svg>
              </div>
              <Typography
                style={{
                  color: "white",
                }}
                component="h1"
                variant="h5"
              >
                Register
              </Typography>
              <Box
                sx={{ mt: 1 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <RadioGroup
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                    name="use-radio-group"
                    defaultValue="first"
                    value={selectedValue}
                    onChange={(e) => setSelectedValue(e.target.value)}
                  >
                    <MyFormControlLabel
                      style={{
                        color: "white",
                      }}
                      value="first"
                      label="User"
                      control={<Radio />}
                    />
                    <MyFormControlLabel
                      style={{
                        color: "white",
                      }}
                      value="second"
                      label="Publisher"
                      control={<Radio />}
                    />
                  </RadioGroup>
                </div>
                {selectedValue === "first" && (
                  <UserRegister/>
                )}
                {selectedValue === "second" && (
                  <PublisherRegister/>
                )}
                {error && (
                  <Typography variant="body2" color="error">
                    {error}
                  </Typography>
                )}
              
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
      <div className={`${style.image_wrapper}`}>
        <img
          src="https://ichef.bbci.co.uk/images/ic/704xn/p0gpmw0t.png"
          alt=""
        />
      </div>
    </div>
  );
}
