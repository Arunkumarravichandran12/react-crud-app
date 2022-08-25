import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import"./Home.css";
import axios from "axios";
import { FaRegEdit,FaSearch} from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTrashCan,faUserPen,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'



const Home= () =>{
    const [data,setData]= useState([]);

    const loadData = async () =>{
   const response=await axios.get("http://localhost:3001/collect");
    setData(response.data)
    console.log(setData);
    };

    useEffect(() => {
        loadData();
    },[]);
    const deleteCon =(id) =>{
        if(window.confirm("Are you sure you wanna delete?")){
            axios.delete(`http://localhost:3001/erase/${id}`)
            
        }
            
            setTimeout(() => {
                loadData();
            }, 500);
        }
      const[searchTerm,setsearchTerm]= useState("");
    return(
        <div>
            <h1>Student management system</h1>
           
            <input type="text" placeholder='Search' className='i1' onChange={(e)=>setsearchTerm(e.target.value)}/>  
            <FontAwesomeIcon icon={faMagnifyingGlass} className="s1"/>
            <Link to="/add">
                <button className='b2'>ADD</button>
           </Link>
           <br></br>
           <br></br>
           <script src="https://kit.fontawesome.com/7c50005047.js" crossorigin="anonymous"></script>
           <table>
                    <thead>
                    
                    <tr>
                        <th>ID</th>
                        <th>firstName</th>
                        <th>LastName</th>
                        <th>Location</th>
                        <th>email</th>
                        <th>DOB</th>
                        <th>Education</th>
                        <th>Action</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
           {data.filter((val)=>val.firstName.toLowerCase().includes(searchTerm.toLowerCase())
              
              ).map((val,key)=>{
            return(
                
              
                    
                    
           
                    <tr key={val.ID}>
                        
                    <td>{val.ID}</td>
                    <td>{val.firstName}</td>
                    <td>{val.lastName}</td>
                    <td>{val.location}</td>
                    <td>{val.email}</td>
                    <td>{val.dob}</td>
                    <td>{val.education}</td>
                    <td>
                        <Link to={`/update/${val.ID}`}>
                        <a style={{color:"black", textDecoration:"none"}}><FontAwesomeIcon icon={faUserPen} color="black"/>Edit</a>
                        </Link>
                    </td>
                    <td>
                        
                        <a onClick={()=>deleteCon(val.ID)} style={{cursor:"pointer"}}><FontAwesomeIcon icon={faTrashCan} color="black"/>Delete</a>
                        
                    </td>
                    
                    </tr>
                 )
                })} 
                    
                </tbody>
                </table>
           
                
            
          
           
            {/* <tabel>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>firstName</th>
                        <th>LastName</th>
                        <th>Location</th>
                        <th>email</th>
                        <th>DOB</th>
                        <th>Education</th>
                        <th>Action</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {
            data.map((item, index)=>{
                return(
                    <tr key={item.ID}>
                        <th scope='row'>{index +1}</th>
                    
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.location}</td>
                    <td>{item.email}</td>
                    <td>{item.dob}</td>
                    <td>{item.education}</td>
                    <td>
                        <Link to={`/update/${item.ID}`}>
                        <button>Edit</button>
                        </Link>
                    </td>
                    <td>
                        
                        <button onClick={()=>deleteCon(item.ID)}>Delete</button>
                        
                    </td>
                    
                    </tr>
                )
            })
           }
                    
                </tbody>
            </tabel>  */}
           
        </div>
                
    )
                
}

export default Home;