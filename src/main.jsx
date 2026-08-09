import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router';
import "./index.css"
import App from './App.jsx'
import Login from './component/Login.jsx';
import Register from './component/Register.jsx';
import UpdateUser from './component/UpdateUser.jsx';
import ForgetPass from './component/ForgetPass.jsx';
import SendEmail from './component/SendEmail.jsx';
import Search from './component/Search.jsx';
import DetailPage from './component/DetailPage.jsx';
import { Toaster } from 'react-hot-toast';

// if(import.meta.env.PROD){
//    console.log = () => {}
//   console.info = () => {}
//   console.debug = () => {}
// }

createRoot(document.getElementById('root')).render(

    <>
      <Toaster position='top-center' toastOptions={{duration:3000}}/>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/update" element={<UpdateUser/>}/>
          <Route path="forget_password" element={<ForgetPass/>}/>
          <Route path="/sending_mail" element={<SendEmail/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/detail' element={<DetailPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
)
