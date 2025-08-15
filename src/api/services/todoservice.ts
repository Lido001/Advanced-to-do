import axiosInstance from './axiosinstance';
import { API } from './endpoints';

// export const createTodo = async (task:{data:string, priority:string,assign:string,status:string,from:any,to:any,completed:boolean}) => {
//   const response = await axiosInstance.post(API.POSTS.CREATE_POST, task);
//   return response.data;
// };
// // export const updateTodo = async (newtask:{id:string,data:string, priority:string,assign:string,status:string,from:any,to:any,completed:boolean}) =>{
// //   const response = await axiosInstance.put(`/todos/${newtask.id}`,newtask);
// //   return response.data;
// // };
// export const updateTodo = async (newtask: {
//   id: string,
//   data: string,
//   priority: string,
//   assign: string,
//   status: string,
//   from: any,
//   to: any,
//   completed: boolean
// }) => {
//   const { id, ...updateData } = newtask;
//   const response = await axiosInstance.put(`/todos/${id}`, updateData);
//   return response.data;
// };

// export const patchTodoCompleted = async (id: string, completed: boolean) => {
//   const response = await axiosInstance.patch(`/todos/${id}`, { completed });
//   return response.data;
// };
// export const patchTodosCompletedBulk = async (ids: string[], completed: boolean) => {
//   await Promise.all(ids.map(id => patchTodoCompleted(id, completed)));
// };

// export const getTodos = async () => {
//   const response = await axiosInstance.get(API.POSTS.GET_POSTS);
//   return response.data;
// };
// export const deleteTodo = async (id: string) => {
//   const response = await axiosInstance.delete(`/todos/${id}`);
//   return response.data;
// };


export const createTodo = async (task: {
  data: string;
  priority: string;
  assign: string;
  status: string;
  from: string;
  to: string;
  completed: boolean;
}) => {
  const response = await axiosInstance.post(API.POSTS.CREATE_POST, task);
  return response.data;
};

export const updateTodo = async (newtask: {
  _id: string;
  data: string;
  priority: string;
  assign: string;
  status: string;
  from: string;
  to: string;
  completed: boolean;
}) => {
  const { _id, ...updateData } = newtask;
  const response = await axiosInstance.put(`/todos/${_id}`, updateData);
  return response.data;
};

export const patchTodoCompleted = async (id: string, completed: boolean) => {
  const response = await axiosInstance.patch(`/todos/${id}`, { completed });
  return response.data;
};

export const patchTodosCompletedBulk = async (ids: string[], completed: boolean) => {
  await Promise.all(ids.map((id) => patchTodoCompleted(id, completed)));
};

export const getTodos = async () => {
  const response = await axiosInstance.get(API.POSTS.GET_POSTS);
  return response.data;
};

export const deleteTodo = async (id: string) => {
  const response = await axiosInstance.delete(`/todos/${id}`);
  return response.data;
};





