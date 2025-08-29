"use client";
import React, { useEffect, useState } from "react";
import {
  useAddTodo,
  useCompleteTodo,
  useDeleteTodo,
  useGetTodos,
} from "../hooks/todo/useTodo";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Button,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
function TodoList() {
  const { data, refetch } = useGetTodos();
  const [task, setTask] = useState("");
  const { mutate: addTodo, isSuccess: addSuccess } = useAddTodo();
  const { mutate: deleteTodo, isSuccess: deleteSuccess } = useDeleteTodo();
  const { mutate: completeTodo, isSuccess: completeSuccess } =
    useCompleteTodo();
  useEffect(() => {
    refetch();
  }, [addSuccess, deleteSuccess, completeSuccess, refetch]);
  if (data?.length === 0) {
    return (
      <div className=" flex flex-col gap-5 items-center">
        <h1>Henüz hiç görev eklenmemiş</h1>
        <div className="flex gap-5">
          <TextField
            label="Yeni görev"
            variant="outlined"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              addTodo(task);
              setTask("");
            }}
          >
            Ekle
          </Button>
        </div>
      </div>
    );
  } else if (data) {
    return (
      <TableContainer
        component={Paper}
        style={{ maxWidth: 800, margin: "2rem auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Görev</TableCell>
              <TableCell align="center">Tamamlandı</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((todo: any) => (
              <TableRow key={todo.id}>
                <TableCell>{todo.task}</TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={todo.isCompleted}
                    onChange={() => completeTodo(todo.id)}
                    color="primary"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton color="error" onClick={() => deleteTodo(todo.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <TextField
                  label="Yeni görev"
                  variant="outlined"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    addTodo(task);
                    setTask("");
                  }}
                >
                  Ekle
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  return <div>Loading...</div>;
}

export default TodoList;
