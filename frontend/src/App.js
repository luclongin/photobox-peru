import './App.css';
import React from 'react';
import ManageOrder from './components/manageOrder/manageOrder.component';
import { Provider } from 'react-redux';
import store from './store/store';
import NavBar from './components/navbar/navbar.component';
import { ThemeProvider } from '@mui/material';
import theme from './utils/theme';
import {Box} from '@mui/material';
import HomePage from './components/homepage/homepage.component';

function App() {
  return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
        <Box className="App" display="flex" height="100vh" flexDirection="column">
          <NavBar/>
          <HomePage />
        </Box>
        </ThemeProvider>
      </Provider>
  );
}

export default App;
