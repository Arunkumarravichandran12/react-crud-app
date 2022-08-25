import{BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css';
import AddEdit from "./views/AddEdit";
import Home from "./views/Home";

function App() {
  return (
    
      <BrowserRouter>
      <div className="App">
        <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/add" element={<AddEdit />}/> 
        <Route path="/update/:id" element={< AddEdit />}/>
        
        </Routes>
       
      
      </div>
      </BrowserRouter>
      
   
  );
}

export default App;
