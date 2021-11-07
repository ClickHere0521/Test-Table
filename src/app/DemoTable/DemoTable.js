import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';
import { selectColumnData, selectRowData } from '../../store/fileSlice';
// import { 
//   generateRandomDouble, 
//   generateRandomString, 
//   generateRandomInt, 
//   generateRandomMonth,
//   generateRandomDay,
// } from '../../utils/generateRandomValues';

const DemoTable = () => {
  const [columns, setColumns] = useState([]);
  const columnData = useSelector(selectColumnData);
  const rowData = useSelector(selectRowData);

  useEffect(() => {
    convertGridColumn(columnData);
  }, [columnData]);
  
  const convertGridColumn = () => {
    let columnsTemp = [];
    Object.keys(columnData).length !== 0 && columnData.fields.length > 0 && columnData.fields.forEach((element) => {
      let elementType, width;
      elementType = element.type === 'LongType' || element.type === 'DoubleType' || element.type === 'IntType' ? 'number' : 'string';
      width = element.name === 'ts' || element.name === 'key' ? 170 : 130;
      columnsTemp.push({
        field: element.name,
        headerName: element.name,
        editable: true,
        sortable: true,
        type: elementType,
        minWidth: width,
      });
    })
    setColumns(columnsTemp);
  }

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={rowData}
        columns={columns}
        pageSize={25}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

export default DemoTable;