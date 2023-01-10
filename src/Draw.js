import {
  TextField,
  Box,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Button,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import CancelIcon from "@mui/icons-material/Cancel";

function Draw() {
  const [candids, setCandids] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleCandids = () => {
    if (inputValue?.length > 3 && !candids?.includes(inputValue)) {
      setCandids([...candids, inputValue]);
      setInputValue("");
    }
    //candid already existed in list
    if (candids?.includes(inputValue)) {
      handleClick();
      setInputValue("");
    }
  };
  const removeCandid = (cname) => {
    setCandids(candids.filter((candid) => candid !== cname));
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
  return (
    <Box p={10}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Already exists in list"
        action={action}
      />
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
          value={inputValue}
        />
        <PersonAddAlt1Icon
          sx={{ cursor: "pointer" }}
          onClick={handleCandids}
          color={inputValue?.length <= 3 ? "disabled" : "primary"}
        />
      </Stack>
      <Stack
        py={4}
        gap="20px"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography>{candids?.length} Members</Typography>
        <Button variant="outlined" onClick={() => setCandids([])}>
          Clear All
        </Button>
      </Stack>
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
    </Box>
  );
}

export default Draw;
