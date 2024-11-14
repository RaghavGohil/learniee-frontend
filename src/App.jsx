import { createContext } from 'react'
import Chats from './Chats'
import Login from './Login'
import ProtectedRoute from './ProtectedRoute'
import Signup from './Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/chats' element={
                        <ProtectedRoute><Chats/></ProtectedRoute>
                    }/>
                </Routes>
            </BrowserRouter>
        </>
    ) 
}

export default App;

