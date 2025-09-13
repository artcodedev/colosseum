

import './App.css'
import { Route, Routes } from 'react-router-dom';
import Index from './Page/Index.page'
import Contacts from './Page/Contacts';
import Successful from './Page/Successful';
import Login from './Page/Login.pages';
import Failed from './Page/Failed';

const App = () => {

  return (
    <>
      <Routes>

        <Route path="/" element={<Index />} />

        <Route path="/contacts" element={<Contacts />} />

        <Route path="/successful" element={<Successful />} />

        <Route path="/failed" element={<Failed />} />

        <Route path="/admin" element={<Login />} />

      </Routes>
    </>
  )
}

export default App
