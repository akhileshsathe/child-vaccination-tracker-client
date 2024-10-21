
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { useReducer,createContext } from 'react';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SignUp2 from './pages/SignUp2';
import ParentHome from './pages/ParentHome';
import SecretTest from './pages/SecretTest';
import NotFound from './pages/NotFound';
import AddChild from './pages/AddChild';
import VcSignUp from './pages/Vcsignup';
import VCDash from './pages/VCDash';
import AdminDash from './pages/AdminDash';
import AdminSignup from './pages/AdminSignup';
import VaccineEdior from './components/VaccineEditor';
import AManageVaccines from './pages/AManageVaccines';
import VCChooser from './pages/VCChooser';
import TimeSlotChooser from './pages/TimeSlotChooser';
import VCSettings from './pages/VCSettings';
import BookAppointment from './pages/BookAppointment';
import PAppointments from './pages/PAppointments';
import VCppointments from './pages/VCppointments';


import AManageVC from './pages/AManageVC';
import { initialState,reducer } from './pages/useReducer';
import { ToastContainer } from "react-toastify";
import NavBar from './components/NavBar';
import { notifyToast } from "./functions/notifyToast";
import VCManageVaccines from './pages/VCManageVaccines';



export const UserContext = createContext();
function App() {

const [state,dispatch]=useReducer(reducer,initialState);
  
    
  return (
      <UserContext.Provider value={{ state, dispatch }}>
    <Router>
      <div className='App'>
      <NavBar className="topnavbar" />
      <Routes>
      

        <Route exact path='/' element={<Home />} />
        <Route exact path='/Login' element={<Login />} />
        <Route exact path='/Signup2' element={<SignUp2 />} />
        <Route exact path='/VcReg' element={<VcSignUp />} />
        <Route exact path='/Signup' element={<SignUp2 />} />
        <Route exact path='/ParentHome' element={<ParentHome />} />
        <Route exact path='/SecretTest' element={<SecretTest />} />
        <Route exact path='/AddChild' element={<AddChild />} />
        <Route exact path='/VCDash' element={<VCDash />} />
        <Route exact path='/AdminDash' element={<AdminDash />} />
        <Route exact path='/AManageVaccines' element={<AManageVaccines />} />
        <Route exact path='/VaccineEditor' element={<VaccineEdior />} />
        <Route exact path='/VCManageVaccines' element={<VCManageVaccines />} />
        <Route exact path='/AManageVC' element={<AManageVC />} />
        <Route exact path='/VCChooser' element={<VCChooser />} />
        <Route exact path='/TimeSlotChooser' element={<TimeSlotChooser />} />
        <Route exact path='/VCSettings' element={<VCSettings />} />

        <Route exact path='/BookAppointment' element={<BookAppointment />} />



        <Route exact path='/AdminSignUp' element={<AdminSignup />} />
        <Route exact path='/parentAppointments' element={<PAppointments />} />
        <Route exact path='/VCAppointments' element={<VCppointments />} />




        

        <Route exact path='*' element={<NotFound />} />

        
        
      </Routes>
      
      <ToastContainer />
 
      </div>

    </Router>

      </UserContext.Provider>
  );
}

export default App;
