import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import HomePage from './HomePages/HomePage';

function App() {
  return (
    <div >
    
    <Router>
    <Routes>
     <Route path='/' element={<HomePage/>}/>
     {/* <Route path='/home' element={<UserPage/>}/> */}
    </Routes>
    </Router>

    </div>
    
  );
}

export default App;
