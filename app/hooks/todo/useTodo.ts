import { toast } from "react-toastify";
import request from "@/app/api/request";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAddTodo = () => {
  return useMutation({
    mutationFn: (task: string) => request.Todo.addTodo({ task }),
    onSuccess: () => {
      toast.success("Todo Eklendi");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Todo eklenemedi");
    },
  });
};

export const useUpdateTodo = () => {
  return useMutation({
    mutationFn: ({ id, values }: { id: number; values: any }) =>
      request.Todo.updateTodo(id, values),
    onSuccess: () => {
      toast.success("Todo Güncellendi");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Todo güncellenemedi");
    },
  });
};

export const useGetTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: () => request.Todo.getTodos(),
  });
};
export const useDeleteTodo = () => {
  return useMutation({
    mutationFn: (id: number) => request.Todo.deleteTodo(id),
    onSuccess: () => {
      toast.success("Todo Silindi");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Todo silinemedi");
    },
  });
};
export const useCompleteTodo = () => {
  return useMutation({
    mutationFn: (id: number) => request.Todo.completeTodo(id),
    onSuccess: () => {
      toast.success("Todo Tamamlandı");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Todo tamamlanamadı");
    },
  });
};
