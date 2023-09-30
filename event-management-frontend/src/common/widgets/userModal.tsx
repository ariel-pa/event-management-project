import { Box, useTheme, Modal, Typography, Button, useMediaQuery, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomTheme } from "../../themes";
import { WidgetWrapper } from "../components/WidgetWrapper";
import { Constant } from "../../config";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { setLogin } from "../../state";
import { Formik } from "formik";
import { CreateUsersCRUDType } from "../types/usersCRUDTypes ";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
};

const initialValuesLogin = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
};


export interface UserModalType {
    open: boolean,
    estado: boolean,
    eventId?: number,
    handleClose: () => void
}

export const UserModal = ({ open, estado, eventId, handleClose }: UserModalType) => {

    const [pageType, setPageType] = useState("login");
    const theme: CustomTheme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const main = theme.palette.neutral.main;
    const isNonMobile = useMediaQuery("(min-width:600px)");


    const isLogin = pageType === "login";
    const isRegister = pageType === "register";


    const register = async (values: any, onSubmitProps: any) => {

        const clonedValues = { ...values };
        const jsonData: CreateUsersCRUDType = {
            firstName: clonedValues.firstName,
            lastName: clonedValues.lastName,
            email: clonedValues.email,
            password: clonedValues.password,
            event_id: eventId!,
        };

        const savedUserResponse = await fetch(
            `${Constant.baseUrl}/api/auth/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(jsonData),
            }
        );
        const { error } = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (!error) {
            setPageType("login");
            alert('Usuario Agragado :)');
        } else {
            alert('Elusuario ya tiene cuenata :(');
        }

    };

    const login = async (values: any, onSubmitProps: any) => {
        const loggedInResponse = await fetch(`${Constant.baseUrl}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();

        if (!loggedIn.error) {            
            dispatch(
                setLogin({
                    user: loggedIn.data.user,
                    token: loggedIn.data.token,
                })
            );
            navigate("/mycontent");
        } else {
            alert('Datos incorrectos :(');
        }
    };

    const handleFormSubmit = async (values: any, onSubmitProps: any) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return (
        <WidgetWrapper>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
                        validationSchema={isLogin ? loginSchema : registerSchema}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            resetForm,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                {isLogin ? (<Typography
                                    fontSize="1rem"
                                    color={main}
                                    fontWeight="500"
                                    mb="1rem"
                                >
                                    <h3>LOG IN</h3>
                                </Typography>) : (
                                    <Typography
                                    fontSize="1rem"
                                    color={main}
                                    fontWeight="500"
                                    mb="1rem"
                                >
                                    <h3>SIGN UP</h3>
                                </Typography>
                                )}
                                <Box
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                    sx={{
                                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                    }}
                                >
                                    {isRegister && (
                                        <>
                                            <TextField
                                                label="First Name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.firstName}
                                                name="firstName"
                                                error={
                                                    Boolean(touched.firstName) && Boolean(errors.firstName)
                                                }
                                                helperText={touched.firstName && errors.firstName}
                                                sx={{ gridColumn: "span 2" }}
                                            />

                                            <TextField
                                                label="Last Name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.lastName}
                                                name="lastName"
                                                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                                helperText={touched.lastName && errors.lastName}
                                                sx={{ gridColumn: "span 2" }}
                                            />

                                        </>
                                    )}

                                    <TextField
                                        label="Email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.email}
                                        name="email"
                                        error={Boolean(touched.email) && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                        sx={{ gridColumn: "span 4" }}
                                    />
                                    <TextField
                                        label="Password"
                                        type="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.password}
                                        name="password"
                                        error={Boolean(touched.password) && Boolean(errors.password)}
                                        helperText={touched.password && errors.password}
                                        sx={{ gridColumn: "span 4" }}
                                    />
                                </Box>

                                {/* BUTTONS */}
                                <Box>
                                    <Button
                                        fullWidth
                                        type="submit"
                                        sx={{
                                            m: "2rem 0",
                                            p: "1rem",
                                            backgroundColor: theme.palette.primary.main,
                                            color: theme.palette.background.alt,
                                            "&:hover": { color: theme.palette.primary.main },
                                        }}
                                    >
                                        {isLogin ? "LOGIN" : "REGISTER"}
                                    </Button>
                                    <Typography
                                        onClick={() => {
                                            setPageType(isLogin ? "register" : "login");
                                            resetForm();
                                        }}
                                        sx={{
                                            textDecoration: "underline",
                                            color: theme.palette.primary.main,
                                            "&:hover": {
                                                cursor: "pointer",
                                                color: theme.palette.primary.light,
                                            },
                                        }}
                                    >
                                        {isLogin
                                            ? "Don't have an account? Sign Up here."
                                            : "Already have an account? Login here."}
                                    </Typography>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Box>

            </Modal>
        </WidgetWrapper>
    )
};