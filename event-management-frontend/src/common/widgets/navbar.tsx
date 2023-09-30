
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../components/FlexBetween";
import { setLogout, setMode } from "../../state";
import {
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
    Box,
} from "@mui/material";
import {
    Search,
    DarkMode,
    LightMode,
    Menu,
    Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { CustomTheme } from "../../themes";
import { UserModal } from "./userModal";
;

export const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState<Boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");


    const theme: CustomTheme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;
    const medium = theme.palette.neutral.medium;
    const [openUser, setOpenUser] = useState(false);

    const fullName = user ? `${user.firstName} ${user.lastName}` : `public page`;

    const handleOpenUser = async () => {
        setOpenUser(true);
    }

    const handleCloseUser = () => setOpenUser(false);

    const logoutUser = () => {
        dispatch(setLogout())
        navigate("/");
    }

    return (
        <FlexBetween padding="1rem 6%" sx={{ backgroundColor: alt }}>
            <FlexBetween gap="1.75rem">
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color="primary"
                    sx={{
                        "&:hover": {
                            color: primaryLight,
                            cursor: "pointer",
                        },
                    }}
                >
                    Events
                </Typography>
                {isNonMobileScreens && (
                    <FlexBetween
                        sx={{ backgroundColor: neutralLight }}
                        borderRadius="9px"
                        gap="3rem"
                        padding="0.1rem 1.5rem"
                    >
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>

            {/* DESKTOP NAV */}
            {isNonMobileScreens ? (
                <FlexBetween gap="2rem">
                    <UserModal
                        open={openUser}
                        estado={false}
                        handleClose={handleCloseUser}
                    />
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightMode sx={{ color: dark, fontSize: "25px" }} />
                        )}
                    </IconButton>
                    <FormControl variant="standard">
                        <Select
                            value={fullName}
                            sx={{
                                backgroundColor: neutralLight,
                                width: "150px",
                                borderRadius: "0.25rem",
                                p: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25rem",
                                    width: "3rem",
                                },
                                "& .MuiSelect-select:focus": {
                                    backgroundColor: neutralLight,
                                },
                            }}
                            input={<InputBase />}
                        >
                            {user ? (
                                <>
                                    {user.role === 'admin' ? (
                                        <>
                                            <MenuItem onClick={() => navigate("/eventslist")}>
                                                <Typography
                                                    color="primary"
                                                >
                                                    ADMIN
                                                </Typography>
                                            </MenuItem>
                                            <MenuItem onClick={() => navigate("/mycontent")}>Events</MenuItem>
                                            <MenuItem onClick={() => logoutUser()} >Log Out</MenuItem>
                                        </>

                                    ) : (
                                        <>
                                            <MenuItem onClick={() => navigate("/mycontent")}>Events</MenuItem>
                                            <MenuItem onClick={() => navigate("/myevents")} >My events</MenuItem>
                                            <MenuItem onClick={() => logoutUser()} >Log Out</MenuItem>
                                        </>
                                    )}

                                </>
                            )
                                : (<MenuItem onClick={() => handleOpenUser()} value={fullName}>Log In</MenuItem>)}
                        </Select>
                    </FormControl>
                </FlexBetween>
            ) : (
                <IconButton
                    onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                >
                    <Menu />
                </IconButton>
            )}
            {/* MOBILE NAV */}
            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box
                    position="fixed"
                    right="0"
                    bottom="0"
                    height="100%"
                    zIndex="10"
                    maxWidth="500px"
                    minWidth="300px"
                    sx={{ backgroundColor: background }}
                >
                    {/* CLOSE ICON */}
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton
                            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                        >
                            <Close />
                        </IconButton>
                    </Box>

                    {/* MENU ITEMS */}
                    <FlexBetween
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        gap="3rem"
                    >
                        <IconButton
                            onClick={() => dispatch(setMode())}
                            sx={{ fontSize: "25px" }}
                        >
                            {theme.palette.mode === "dark" ? (
                                <DarkMode sx={{ fontSize: "25px" }} />
                            ) : (
                                <LightMode sx={{ color: dark, fontSize: "25px" }} />
                            )}
                        </IconButton>
                        <FormControl variant="standard">
                            <Select
                                value={fullName}
                                sx={{
                                    backgroundColor: neutralLight,
                                    width: "150px",
                                    borderRadius: "0.25rem",
                                    p: "0.25rem 1rem",
                                    "& .MuiSvgIcon-root": {
                                        pr: "0.25rem",
                                        width: "3rem",
                                    },
                                    "& .MuiSelect-select:focus": {
                                        backgroundColor: neutralLight,
                                    },
                                }}
                                input={<InputBase />}
                            >
                                {user ? (<MenuItem onClick={() => dispatch(setLogout())} value={fullName}>Log Out</MenuItem>)
                                    : (<MenuItem onClick={() => dispatch(setLogout())} value={fullName}>Log In</MenuItem>)}

                            </Select>
                        </FormControl>
                    </FlexBetween>
                </Box>
            )}
        </FlexBetween>
    );
};
