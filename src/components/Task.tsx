import React from "react";
import { TaskDto } from "../api/dto/tasks.dto";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { TaskAPI } from "../api/task.api";

interface Props {
  data: TaskDto;
  onDelete: (id: string) => void;
  onTaskUpdate: (task: TaskDto) => void;
}

export const Task = ({ data, onDelete, onTaskUpdate }: Props) => {
  const deleteTask = async () => {
    await TaskAPI.deleteTask(data.id);
    onDelete(data.id);
  };

  return (
    <Card>
      <CardContent onClick={() => onTaskUpdate(data)}>
        <Typography color="textSecondary" gutterBottom>
          {data.uname}
        </Typography>
        <Typography color="textSecondary">{data.description}</Typography>
        <Typography variant="body2" component="p">
          {data.user}
        </Typography>
      </CardContent>
      <CardActions>
        <Container>
          <Button
            size="small"
            color="primary"
            onClick={() => onTaskUpdate(data)}
          >
            Edit
          </Button>
          <Button size="small" color="secondary" onClick={deleteTask}>
            Delete
          </Button>
        </Container>
      </CardActions>
    </Card>
  );
};
