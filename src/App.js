import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import HomePage from './HomePages/HomePage';
// import Update from './HomePage/components/Update';

function App() {
  return (
    <div >
    
    <Router>
    <Routes>
     <Route path='/' element={<HomePage/>}/>
      {/* <Route path='/home' element={<HomePage/>}/> */}
      {/* <Route path='/update/:id' element={<Update/>}/> */}
    </Routes>
    </Router>

    </div>
    
  );
}

export default App;
