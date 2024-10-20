
import './App.css';
import FileUpload from './components/FileUpload';
import LogIn from './components/LogIn';
import Register from './components/UserRegister';
import {Route, Routes} from 'react-router-dom'
import UserRegister from './components/UserRegister';
import GetFile from './components/FileList';
import DownLoadFile from './components/DownLoadFile';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/login' element={<LogIn/>}/>
        <Route path='/file' element={<FileUpload/>}/>
        <Route path='/getfile' element={<GetFile/>}/>
        <Route path='/download/:fileId' element={<DownLoadFile/>}/>
      </Routes>  
    </div>
  );
}

export default App;
