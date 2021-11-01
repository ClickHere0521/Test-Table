import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';
import { selectColumnData } from '../../store/fileSlice';
import { 
  generateRandomDouble, 
  generateRandomString, 
  generateRandomInt, 
  generateRandomMonth,
  generateRandomDay,
} from '../../utils/generateRandomValues';

const DemoTable = () => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const columnData = useSelector(selectColumnData);

  useEffect(() => {
    convertGridColumn(columnData);
    generateRows(columnData);
  }, [columnData]);
  
  const convertGridColumn = () => {
    let columnsTemp = [];
    Object.keys(columnData).length !== 0 && columnData.fields.length > 0 && columnData.fields.forEach((element) => {
      let elementType;
      if (element.type === 'long' || element.type === 'double') elementType = 'number';
      columnsTemp.push({
        field: element.name,
        headerName: element.name,
        editable: true,
        sortable: true,
        type: elementType,
        width: 130
      });
    })
    setColumns(columnsTemp);
  }

  const generateRows = () => {
    let rowsTemp = [];
    if (Object.keys(columnData).length !== 0) {
      for (let i = 1; i <= 300; i ++ ) {
        let row = {id: i};
        columnData.fields.length > 0 && columnData.fields.forEach((element) => {
          switch (element.name) {
            case "volume": row['volume'] = generateRandomDouble(10, 1000); break;
            case "ts": row['ts'] = generateRandomString(5); break;
            case "symbol": row['symbol'] = generateRandomString(7); break;
            case "year": row['year'] = generateRandomInt(1990, 2021); break;
            case "month": row['month'] = generateRandomMonth(); break;
            case "high": row['high'] = generateRandomDouble(100, 1000); break;
            case "low": row['low'] = generateRandomDouble(10, 100); break;
            case "key": row['key'] = generateRandomString(10); break;
            case "date": row['date'] = generateRandomInt(1, 31); break;
            case "close": row['close'] = generateRandomDouble(10, 100); break;
            case "open": row['open'] = generateRandomDouble(10, 100); break;
            case "day": row['day'] = generateRandomDay(); break;
            default: row[element.name] = generateRandomString(5); break;
          }
        })
        rowsTemp.push(row);
      }
    }
    setRows(rowsTemp);
  }

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={rows}
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