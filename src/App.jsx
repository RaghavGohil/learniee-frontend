import Chats from './Chats'
import Login from './Login'
import Signup from './Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/chats' element={<Chats />} />
                </Routes>
            </BrowserRouter>
        </>
    ) 
}

export default App;

