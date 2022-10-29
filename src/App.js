import './App.css';
import React, {createContext} from 'react';
import ManageOrder from './components/manageOrder/manageOrder.component';
import { Provider } from 'react-redux';
import store from './store/store';
import NavBar from './components/navbar/navbar.component';
import { ThemeProvider } from '@mui/material';
import theme from './utils/theme';

function App() {
  return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
        <div className="App">
          <NavBar />
          <ManageOrder />
        </div>
        </ThemeProvider>
      </Provider>
  );
}

export default App;
