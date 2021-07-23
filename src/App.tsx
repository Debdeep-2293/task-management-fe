import React, { useEffect, useState } from "react";
import "./App.css";
import { TaskAPI } from "./api/task.api";
import { TaskDto } from "./api/dto/tasks.dto";
import { Grid } from "@material-ui/core";
import { Task } from "./components/Task";
import TaskNav from "./components/TaskNav";
import CreateTaskModal from "./components/CreateTaskModal";
import Button from "@material-ui/core/Button";
import EditTaskModal from "./components/EditTaskModal";

function App() {
  const [tasks, updateTasks] = useState<TaskDto[]>([]);
  const [createTaskModalOpen, setcreateTaskModalOpen] = useState(false);
  const [updateTaskModalOpen, setupdateTaskModalOpen] = useState(false);
  const [taskEdit, setTaskEdit] = useState<undefined | TaskDto>(undefined);

  const addTask = (task: TaskDto) => {
    updateTasks([...tasks, task]);
  };

  const deleteTask = (id: string) => {
    updateTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (task: TaskDto) => {
    updateTasks(
      tasks.map((x) => {
        if (x.id === task.id) return task;
        return x;
      })
    );
  };

  //const onTaskEditBtnClick = (task: TaskDto) => {};
  useEffect(() => {
    async function fetchAll() {
      const res = await TaskAPI.getAll();

      updateTasks(res);
    }

    fetchAll();
  }, []);
  return (
    <div className="App">
      <TaskNav />
      <CreateTaskModal
        open={createTaskModalOpen}
        handleClose={() => setcreateTaskModalOpen(false)}
        onTaskCreated={addTask}
      />
      <EditTaskModal
        data={taskEdit}
        open={updateTaskModalOpen}
        handleClose={() => setupdateTaskModalOpen(false)}
        onTaskUpdate={updateTask}
      />
      <Grid container spacing={1}>
        {tasks.map((task) => {
          return (
            <Grid item xs={3} key={task.id}>
              <Task
                data={task}
                onDelete={deleteTask}
                onTaskUpdate={(task: TaskDto) => {
                  setTaskEdit(task);
                  setupdateTaskModalOpen(true);
                }}
              />
            </Grid>
          );
        })}
      </Grid>
      <div>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
          onClick={() => setcreateTaskModalOpen(true)}
        >
          Create New
        </Button>
      </div>
    </div>
  );
}

export default App;
