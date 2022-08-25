import React,{useState,useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import "./AddEdit.css";
import axios from 'axios';


const AddEdit = () =>{
    const [firstName,setfirstName]= useState("");
    const [lastName,setlastName]= useState("");
    const [location,setlocation]= useState("");
    const [email,setemail]= useState("");
    
    const [date,setdate]= useState(0);
    const [month,setmonth]= useState(0);
    const [year,setyear]= useState(0);
  
    const [education,seteducation]= useState("");
    const [about,setabout]= useState("");
    const Navicate =useNavigate();

    const {id} = useParams();
    useEffect(()=>{
      axios.get(`http://localhost:3001/collect/${id}`)
      .then(
      
        (resp) =>setfirstName(resp.data[0].firstName,
          setlastName(resp.data[0].lastName),
           setlocation(resp.data[0].location),
           setemail(resp.data[0].email),
           setdate(resp.data[0].dob.split("/")[0]) ,
           setmonth(resp.data[0].dob.split("/")[1] ),
           setyear(resp.data[0].dob.split("/")[2]),
           seteducation(resp.data[0].education),)
        
        )
        
      
    },[id])
   

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!id){
          axios.post("http://localhost:3001/create",{
          firstName:firstName,
          lastName:lastName,
          location:location,
          email:email,
          date:date,
          month:month,
          year:year,
          education:education,
          about:about
         
    })
        }else{
          axios.put(`http://localhost:3001/update/${id}`,{
          firstName:firstName,
          lastName:lastName,
          location:location,
          email:email,
          date:date,
          month:month,
          year:year,
          education:education,
          about:about
         
    })
        }
        
        
    setTimeout(()=>Navicate("/"),500);

      
      }
    
  
    return(
        <div className="tab">
             <h1 >WELCOME {firstName}!</h1>
      <form onSubmit={handleSubmit}>
         <label>First Name&nbsp;:</label>
          <input type="text"  name='firstName' onChange={(e)=> setfirstName(e.target.value)} value={firstName || ""} required/>
          
          <label style={{textAlign:'right',width:'200px'}}>LastName &nbsp;:</label> 
          <input type="text" style={{height:'25px',flex:'0 0 200px',marginLeft:'20px'}} name='lastName' onChange={(e)=> setlastName(e.target.value)} value={lastName || ""} required/>
           <br></br>
           <br></br>
          <label>Location&nbsp;&nbsp;&nbsp;&nbsp;:</label>
           <input type="text" name='location' onChange={(e)=> setlocation(e.target.value)} value={location || ""} required/>
          <br></br>
          <br></br>
          <label>Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :</label> 
          <input type="email" name='email' onChange={(e)=> setemail(e.target.value)} value={email || ""} required/>
          <br></br>
          <br></br>
          
          
           <div type="number" name="dob">
          <label>DOB&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</label>
          <input type="number"  placeholder='DD' name='date' style={{width:'40px',textAlign:'right'}} maxLength={2}  onChange={(e)=>
             {const limit=2; setdate(e.target.value.slice(0,limit));}} value={date || ""} required/>
          <input type="number" placeholder='MM' name='month'  style={{width:'40px',marginLeft:'20px',textAlign:'right'}} maxLength={2} onChange={(e)=>
            {const limit=2; setmonth(e.target.value.slice(0,limit));}} required value={month || ""}/>
          <input type="number" placeholder='YY' name='year'  style={{width:'40px',marginLeft:'20px',textAlign:'right'}} maxLength={4} onChange={(e)=>
            {const limit=4; setyear(e.target.value.slice(0,limit));} } value={year || ""}required/>
          
        </div> 
          
          <br></br>
          <br></br>
          <label>Education&nbsp;&nbsp;&nbsp;:</label>
          <input type="text" name='education' onChange={(e)=> seteducation(e.target.value)} value={education || ""} required />
          <br></br>
          <br></br>
          <label>About&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</label>
          <input type="text" name='about' style={{height:'100px'}} onChange={(e)=> setabout(e.target.value)}/> 
          <br></br>
          <br></br>
           <input className="b1" type="submit" value={id? "update" : "submit"}/>
           
      </form>
        </div>
    )
}
export default AddEdit;