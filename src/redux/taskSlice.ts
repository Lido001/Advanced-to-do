import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTodos } from "@/api/services/todoservice";

export interface Task {
  _id: string;
  data: string;
  priority: string;
  assign: string;
  status: string;
  from: string;
  to: string;
  completed: boolean;
}

interface UserState {
  list: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk("user/fetchTodos", async () => {
  return await getTodos();
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default userSlice.reducer;



