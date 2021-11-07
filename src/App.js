import Provider from 'react-redux/es/components/Provider';
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistStore } from 'redux-persist';
import { StyledEngineProvider } from '@mui/material/styles';
import { store } from './store';
import DemoTable from './app/DemoTable';
import FileRead from './app/FileRead';
import './App.css';

const App = () => {
  // let persistor = persistStore(store);
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}>*/}
        <StyledEngineProvider injectFirst>   
          <FileRead />   
          <DemoTable />
        </StyledEngineProvider>
      {/* </PersistGate>*/}
    </Provider>
  );   
}

export default App;
