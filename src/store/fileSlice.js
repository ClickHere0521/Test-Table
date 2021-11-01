import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  columnData : {},
};

export const readFile = createAsyncThunk(
  'file/read',
  async (data, {dispatch}) => new Promise(async(resolve, reject)=>{
    let reader = new FileReader();
    let avscFile = /avsc.*/;
    let re = /(?:\.([^.]+))?$/;      
    if (re.exec(data.name)[1].match(avscFile)) {
      try {
        await reader.readAsText(data);
        reader.onloadend = () => {
          const obj = JSON.parse(reader.result);
          dispatch(setColumnData(obj));
          resolve();
        }
      } catch (e) {
        reject("Could not read file, please try again.");
      }
    } else {
      reject("File type mismatch, please try with .avsc file.");
    }      
  })
);

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setColumnData: (state, action) => {
      state.columnData = action.payload;
    },
  },
});

export const selectColumnData = (state) => state.table.columnData;

export const { 
  setColumnData,
} = fileSlice.actions;

export default fileSlice.reducer;