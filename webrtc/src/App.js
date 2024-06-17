import React from 'react';

import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom';
import VideoPage from './components/VideoPage';
import Login from './components/Login';
import { useContext } from 'react';
import store from './redux-store/store'
import {Provider} from 'react-redux'
import { AuthContext } from './context/AuthContext';
function App() {

const {currentUser}=useContext(AuthContext)

const RequireAuth=({children})=>{
   return currentUser?children:<Navigate to="/"/>
}



  return (
    <div className="App">
    <Provider store={store}>
      <BrowserRouter>
      <Routes>

     <Route path="/video" element={<RequireAuth><VideoPage/></RequireAuth>}/>
      <Route path="/" element={<Login/>}/>
      

      </Routes>
      
      
      
      
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
