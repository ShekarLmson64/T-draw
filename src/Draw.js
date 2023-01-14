import {
  TextField,
  Box,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Snackbar,
  Button,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import CancelIcon from "@mui/icons-material/Cancel";
import WheelComponent from "react-wheel-of-prizes";
import teaLogo from "./Tea.jpg";

function Draw() {
  const getStoredCandids = () => {
    return JSON.parse(localStorage.getItem("storedCandids")) || [];
  };
  const [candids, setCandids] = useState(getStoredCandids());
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = React.useState(false);
  const [winner, setWinner] = useState("");
  const [showList, setShowList] = useState(true);
  const handleCandids = () => {
    //Adding Candids to list
    if (inputValue?.length > 3 && !candids?.includes(inputValue)) {
      setCandids([...candids, inputValue]);
      localStorage.setItem(
        "storedCandids",
        JSON.stringify([...candids, inputValue])
      );
      setInputValue("");
      setShow(false);
      setShowList(true);
    }
    //candid already existed in list
    if (candids?.includes(inputValue)) {
      handleClick();
      setInputValue("");
      setShowList(true);
    }
  };
  //Removing Candids from list
  const removeCandid = (cname) => {
    const newCandids = candids.filter((candid) => candid !== cname);
    setCandids(newCandids);
    localStorage.setItem("storedCandids", JSON.stringify(newCandids));
    setShow(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CancelIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  const segColors = [
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#f4324F",
    "#F9AA1F",
    "#EC3F3F",
    "#FF9000",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
  ];
  const onFinished = (w) => {
    setWinner(w);
  };

  return (
    <Box p={4}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Already exists in list"
        action={action}
      />
      <Stack
        gap={"8px"}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
        <h1>T SPIN</h1>
        <img
          src={teaLogo}
          style={{ width: "50px", marginBottom: "10px" }}
          alt="c"
        ></img>
      </Stack>
      <Stack
        gap="20px"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e?.key === "Enter" && handleCandids()}
          value={inputValue}
        />
        <PersonAddAlt1Icon
          sx={{ cursor: "pointer" }}
          onClick={handleCandids}
          color={inputValue?.length <= 3 ? "disabled" : "primary"}
        />
      </Stack>
      <Stack py={2} justifyContent="center" alignItems="center">
        <Stack
          py={2}
          gap="20px"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <Button variant="outlined" onClick={() => setCandids([])}>
            Clear All
          </Button>
          {candids?.length > 1 && !show && (
            <Button
              onClick={() => [setShow(true), setShowList(false), setWinner("")]}
              variant="contained"
            >
              Load Spinner
            </Button>
          )}
        </Stack>
        <Typography variant="h6" component="h6">
          {candids?.length} {candids?.length == 1 ? "Member" : "Members"}
        </Typography>
      </Stack>
      {candids?.length > 1 && show && (
        <Box>
          <h1>{winner}</h1>
          <WheelComponent
            segments={candids}
            segColors={segColors}
            onFinished={(winner) => onFinished(winner)}
            onStart={() => setWinner(" ")}
            primaryColor="black"
            contrastColor="white"
            buttonText="Spin"
            size={190}
            upDuration={100}
            isOnlyOnce={false}
            downDuration={1000}
            fontFamily="Arial"
          />
        </Box>
      )}
      {showList && (
        <Box width={"300px"} m={"0 auto"}>
          <List>
            {candids?.map((candid) => (
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={candid} />
                  <CancelIcon onClick={() => removeCandid(candid)} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}

export default Draw;
