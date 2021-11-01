import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import { readFile } from '../../store/fileSlice';

const FileRead = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    selectedFiles: null,
    message: "",
    isError: false,
  });

  const selectFile = (event) => {
    setState({
      selectedFiles: event.target.files,
    });
  }

  const read = () => {
    const result = dispatch(readFile(state.selectedFiles[0]));
    result.then(res => {
      if (res.meta.requestStatus === 'rejected') {
        setState({ "selectedFiles": undefined, "message": res.error.message, "isError": true });        
      } else {
        setState({ "selectedFiles": undefined, "message": "", "isError": false });        
      }
    });
  }
    
  return (
    <div className="mg20">
      <label htmlFor="btn-upload">
        <input
          id="btn-upload"
          name="btn-upload"
          style={{ display: 'none' }}
          type="file"
          onChange={selectFile} />
        <Button
          className="btn-choose"
          variant="outlined"
          component="span" >
            Choose a File
        </Button>
      </label>
      <div className="file-name">
        {state.selectedFiles && state.selectedFiles.length > 0 ? state.selectedFiles[0].name : null}
      </div>
      <Button
        className="btn-upload"
        color="primary"
        variant="contained"
        component="span"
        disabled={!state.selectedFiles}
        onClick={read}>
        Read
      </Button>
      <Typography variant="subtitle2" className={`upload-message ${state.isError ? "error" : ""}`}>
        {state.message}
      </Typography>
    </div >
  );
}

export default FileRead;