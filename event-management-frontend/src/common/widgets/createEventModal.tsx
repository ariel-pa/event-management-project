import { Box, useTheme, Modal, Typography, Button, useMediaQuery, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomTheme } from "../../themes";
import { WidgetWrapper } from "../components/WidgetWrapper";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Constant } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Formik } from "formik";
import FlexBetween from "../components/FlexBetween";
import Dropzone from "react-dropzone";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
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
    name: yup.string().required("required"),
    description: yup.string().required("required"),
    place: yup.string().required("required"),
    event_date: yup.string().required("required"),
    file: yup.mixed().required("required"),
});

const initialValuesRegister = {
    name: "",
    description: "",
    place: "",
    event_date: "",
    file: "",
};


export interface CreateEventModalType {
    open: boolean,
    estado?: boolean,
    handleClose: () => void
}

interface FormDataValues {
    file: File;
    name: string,
    description: string,
    place: string,
    event_date: string,
}
export const CreateEventModal = ({ open, estado, handleClose }: CreateEventModalType) => {

    const [pageType, setPageType] = useState("register");
    const theme: CustomTheme = useTheme();
    const user = useSelector((state: any) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const main = theme.palette.neutral.main;
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const isRegister = pageType === "register";

    const register = async (values: any, onSubmitProps: any) => {

        const formData = new FormData();
        formData.append(`name`, values.name);
        formData.append(`description`, values.description);
        formData.append(`place`, values.place);
        formData.append(`event_date`, values.event_date);
        formData.append(`user_id`, user.id);
        formData.append(`file`, values.file);

        const savedEventResponse = await fetch(
            `${Constant.baseUrl}/api/events`,
            {
                method: "POST",
                body: formData,
            }
        );
        const savedEvent = await savedEventResponse.json();

        onSubmitProps.resetForm();

        if (savedEvent.message) {
            alert(`${savedEvent.message}`);
        } else {
            alert(`${savedEvent.error}`);
        }

    };


    const handleFormSubmit = async (values: any, onSubmitProps: any) => {
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
                        initialValues={initialValuesRegister}
                        validationSchema={registerSchema}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            setFieldValue,
                            resetForm,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Typography
                                    fontSize="1rem"
                                    color={main}
                                    fontWeight="500"
                                    mb="1rem"
                                >
                                    <h3>Register New Event</h3>
                                </Typography>
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
                                                label="Name event"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.name}
                                                name="name"
                                                error={
                                                    Boolean(touched.name) && Boolean(errors.name)
                                                }
                                                helperText={touched.name && errors.name}
                                                sx={{ gridColumn: "span 4" }}
                                            />

                                            <TextField
                                                label="Description"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.description}
                                                name="description"
                                                error={Boolean(touched.description) && Boolean(errors.description)}
                                                helperText={touched.description && errors.description}
                                                sx={{ gridColumn: "span 4" }}
                                            />
                                            <TextField
                                                label="Place"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.place}
                                                name="place"
                                                error={Boolean(touched.place) && Boolean(errors.place)}
                                                helperText={touched.place && errors.place}
                                                sx={{ gridColumn: "span 4" }}
                                            />
                                            <TextField
                                                label="Event Date"
                                                type="date"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.event_date}
                                                name="event_date"
                                                error={Boolean(touched.event_date) && Boolean(errors.event_date)}
                                                helperText={touched.event_date && errors.event_date}
                                                sx={{ gridColumn: "span 4" }}
                                            />

                                            <Box
                                                gridColumn="span 4"
                                                border={`1px solid ${theme.palette.neutral.medium}`}
                                                borderRadius="5px"
                                                p="1rem"
                                            >
                                                <Dropzone
                                                    multiple={false}
                                                    onDrop={(acceptedFiles) => {
                                                        console.log(acceptedFiles)
                                                        setFieldValue("file", acceptedFiles[0])
                                                    }
                                                    }
                                                >
                                                    {({ getRootProps, getInputProps }) => (
                                                        <Box
                                                            {...getRootProps()}
                                                            border={`2px dashed ${theme.palette.primary.main}`}
                                                            p="1rem"
                                                            sx={{ "&:hover": { cursor: "pointer" } }}
                                                        >
                                                            <input {...getInputProps()} />
                                                            {!values.file ? (
                                                                <p>Add File Here</p>
                                                            ) : (
                                                                <FlexBetween>
                                                                    {/* <Typography>{values.file.name}</Typography> */}
                                                                    <EditOutlinedIcon />
                                                                </FlexBetween>
                                                            )}
                                                        </Box>
                                                    )}
                                                </Dropzone>
                                            </Box>
                                        </>
                                    )}


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
                                        {"REGISTER"}
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Box>

            </Modal>
        </WidgetWrapper>
    )
};