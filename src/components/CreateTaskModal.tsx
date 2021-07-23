import { makeStyles, Modal, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { TaskAPI } from "../api/task.api";
import { TaskDto } from "../api/dto/tasks.dto";

interface Props {
  open: boolean;
  handleClose: () => void;
  onTaskCreated: (task: TaskDto) => void;
}

function getModalStyle() {
  const top = 25;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const CreateTaskModal = (props: Props) => {
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    textField: {
      width: "100%",
      marginBottom: "5px",
    },
    createBtn: {
      width: "inherit",
      marginTop: "10px",
      padding: "10px 0",
    },
  }));
  const [modalStyle] = React.useState(getModalStyle);
  //const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const [uname, setUname] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  const createTask = async () => {
    const res = await TaskAPI.createTask({
      uname,
      description,
      user: email,
    });
    props.onTaskCreated(res);
    props.handleClose();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title" style={{ textAlign: "center" }}>
        Create a Service
      </h2>
      <TextField
        placeholder="User"
        variant="filled"
        className={classes.textField}
        onChange={(e) => setUname(e.target.value)}
      />
      <TextField
        placeholder="Designation"
        variant="filled"
        className={classes.textField}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        placeholder="Email"
        variant="filled"
        className={classes.textField}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        size="small"
        variant="contained"
        color="primary"
        className={classes.createBtn}
        onClick={createTask}
      >
        Create New Service
      </Button>
    </div>
  );
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default CreateTaskModal;
