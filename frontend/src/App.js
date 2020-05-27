import React, { useEffect } from 'react';

//Use Redux
import { Provider } from 'react-redux'
import store from './store'

import SearchBar from './components/layout/SearchBar'
import AddBtn from './components/layout/AddBtn'
import Logs from './components/logs/Logs'
import AddLogModal from './components/logs/AddLogModal'
import EditLogModal from './components/logs/EditLogModal'
import AddTechModal from './components/techs/AddTechModal'
import TechListModal from './components/techs/TechListModal'
import AboutModal from './components/layout/AboutModal'

import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'
import './App.css';

function App() {

  useEffect(() => {
    //Initialize Materialize JS
    M.AutoInit()
  })

  return (
    <Provider store={store}>
      <SearchBar />
      <div className="container">
        <AddBtn />
        <AddLogModal />
        <EditLogModal />
        <AddTechModal />
        <TechListModal />
        <AboutModal />
        <Logs />
      </div>
    </Provider>
  );
}

export default App;
