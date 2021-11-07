import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const avro = require('avsc')

const initialState = {
  columnData : [],
  rowData : [],
};

export const readFile = createAsyncThunk(
  'file/read',
  async (data, {dispatch}) => new Promise(async(resolve, reject)=>{
    let avscFile = /avro.*/;
    let re = /(?:\.([^.]+))?$/;      
    if (re.exec(data.name)[1].match(avscFile)) {
      try {
        let metadata = null;
        let rows = [];
        avro
          .createBlobDecoder(data)
          .on("metadata", type => {
            metadata = type;
          })
          .on("data", val => {            
            rows.push(val);
          })
          .on("end", () => {
            if (rows && rows.length !== 0) {
              rows = rows.map((element, index) => {
                return { ...element, id: index + 1 };
              });
              dispatch(setColumnData(metadata));
              dispatch(setRowData(rows));
              resolve();              
            } else {
              reject("Empty file, please try again with another file.");
            }  
          });      
      } catch (e) {
        console.log(e);
        reject("Could not read file, please try again.");
      }
    } else {
      reject("File type mismatch, please try with .avro file.");
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
    setRowData: (state, action) => {
      state.rowData = action.payload;
    }
  },
});

export const selectColumnData = (state) => state.table.columnData;
export const selectRowData = (state) => state.table.rowData;

export const { 
  setColumnData,
  setRowData,
} = fileSlice.actions;

export default fileSlice.reducer;