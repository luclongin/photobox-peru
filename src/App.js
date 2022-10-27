import './App.css';
import React, {createContext} from 'react';
import ManageOrder from './components/manageOrder/manageOrder.component';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
      <Provider store={store}>
        <div className="App">
          <ManageOrder />
        </div>
      </Provider>
  );
}

export default App;
