import React, { useState } from "react";
import {
    auth,
    createUserProfileDocument,
} from "../../firebase/firebase.utils.js";
import { Box } from "@mui/system";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Tab, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { LoadingButton } from "@mui/lab";
import './sign.css'

const useStyles = makeStyles({
    root: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FF7878",
            color: "#FF7878"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FF7878",
            color: "#FF7878"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FF7878",
            color: "#FF7878"
        },
        "& .css-cx131x-MuiButtonBase-root-MuiTab-root .Mui-selected":{
            color: "#FF7878"
        }
    }
});

const SignUp = () => {
    const classes = useStyles();
    const [displayName, setdisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [currentTab, setCurrentTab] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleSignIn = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await auth.signInWithEmailAndPassword(email, password);
            setEmail("");
            setPassword("");
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            setLoading(false);
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(
                email,
                password
            );
            await createUserProfileDocument(user, { displayName });

            setConfirmPassword("");
            setEmail("");
            setPassword("");
            setdisplayName("");
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };
    return (
        <Box sx={{ width: "30%", typography: "body1", marginLeft: "30%" }}>
            <TabContext value={currentTab}>
                <Box>
                    <TabList
                        onChange={(e, v) => {
                            setCurrentTab(v);
                        }}
                        centered
                    >
                        <Tab label="Sign Up" value={1} sx={{ color: "#FF7878" }} />
                        <Tab label="Sign In" value={2} sx={{ color: "#FF7878" }} />
                    </TabList>
                </Box>
                <TabPanel
                    value={1}
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    <TextField
                        className={classes.root}
                        variant="outlined"
                        placeholder="Display Name"
                        onChange={(e) => {
                            setdisplayName(e.target.value);
                        }}
                        style={{ margin: "20px" }}
                    />
                    <TextField
                        className={classes.root}
                        variant="outlined"
                        placeholder="Email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        style={{ margin: "20px" }}
                    />
                    <TextField
                        className={classes.root}
                        variant="outlined"
                        placeholder="Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        style={{ margin: "20px" }}
                    />
                    <TextField
                        className={classes.root}
                        variant="outlined"
                        placeholder="Confirm Password"
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                        style={{ margin: "20px" }}
                    />
                    <LoadingButton
                        loading={loading}
                        variant="contained"
                        onClick={handleSignUp}
                        style={{ backgroundColor: "#FF7878", margin: "20px" }}
                    >
                        SIGN UP
                    </LoadingButton>
                </TabPanel>
                <TabPanel
                    value={2}
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    <TextField
                        className={classes.root}
                        variant="outlined"
                        placeholder="Email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        style={{ margin: "20px" }}
                    />
                    <TextField
                        className={classes.root}
                        variant="outlined"
                        placeholder="Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        style={{ margin: "20px" }}
                    />
                    <LoadingButton
                        loading={loading}
                        variant="contained"
                        onClick={handleSignIn}
                        style={{ backgroundColor: "#FF7878", margin: "20px" }}
                        load
                    >
                        SIGN IN
                    </LoadingButton>
                </TabPanel>
            </TabContext>
        </Box>
    );
};

export default SignUp;
