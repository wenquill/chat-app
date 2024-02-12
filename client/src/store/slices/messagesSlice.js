import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from '../../api';

const MESSAGES_SLICE_NAME = 'messages';

export const getMessagesThunk = createAsyncThunk(
  `${MESSAGES_SLICE_NAME}/get`,
  async (payload, thunkAPI) => {
    try {
      const response = await API.getMessages(payload);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ message: err.message });
    }
  }
);

const initialState = {
  messages: [],
  isFetching: false,
  error: null,
  limit: 10,
};

const messagesSlice = createSlice({
  name: MESSAGES_SLICE_NAME,
  initialState,

  reducers: {
    newMessageSuccess: (state, { payload }) => {
      if (state.messages.length >= state.limit) {
        state.messages.splice(0, 1);
      }
      state.messages.push(payload);
    },
  },

  extraReducers: builder => {
    builder.addCase(getMessagesThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getMessagesThunk.fulfilled, (state, { payload }) => {
      state.messages = [];
      state.isFetching = false;
      state.messages.push(...payload.reverse());
    });
    builder.addCase(getMessagesThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
  },
});

const { reducer, actions } = messagesSlice;

export const { newMessageSuccess } = actions;

export default reducer;
