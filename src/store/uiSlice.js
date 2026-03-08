import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    search: '',
    viewProduct: null,
    chatUser: null,
    orderUser: null,
    notifications: [],
    notificationOpen: false,
    messageOpen: false,
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setViewProduct(state, action) {
      state.viewProduct = action.payload;
    },
    setChatUser(state, action) {
      state.chatUser = action.payload;
    },
    setOrderUser(state, action) {
      state.orderUser = action.payload;
    },
    addNotification(state, action) {
      state.notifications.push(action.payload);
    },
    setNotificationOpen(state, action) {
      state.notificationOpen = action.payload;
    },
    setMessageOpen(state, action) {
      state.messageOpen = action.payload;
    },
    clearNotifications(state) {
      state.notifications = [];
    },
  },
});

export const {
  setSearch,
  setViewProduct,
  setChatUser,
  setOrderUser,
  addNotification,
  setNotificationOpen,
  setMessageOpen,
  clearNotifications,
} = uiSlice.actions;

export default uiSlice.reducer;
