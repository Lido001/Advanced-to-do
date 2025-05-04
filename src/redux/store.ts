import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '@/redux/taskSlice';

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export default store;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// import { configureStore } from '@reduxjs/toolkit';
// import taskReducer from '@/redux/taskSlice';

// const store = configureStore({
//   reducer: {
//     task: taskReducer, // ✅ use singular to match state.task
//   },
// });

// export default store;

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
