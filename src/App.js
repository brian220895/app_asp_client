import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import HomePage from './HomePages/HomePage';
import UserPage from './HomePages/UserPage';

function App() {
  return (
    <div >
    
    <Router>
    <Routes>
     <Route path='/home' element={<HomePage/>}/>
     <Route path='/' element={<UserPage/>}/>
    </Routes>
    </Router>

    </div>
    
  );
}

export default App;
