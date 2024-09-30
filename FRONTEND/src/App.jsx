import { useState, useEffect } from 'react' ;
import axios from 'axios' ; 
import './App.css' ;

function App() {
  useEffect(()=>{
    checkAuth() ; 
  },[]);


  // BY DEAFULT CHECKING THE AUTHENTICATION OF THE PAGE : also include the route for server side verification localhost:5500/verify like this
  // Helper function to update visibility of elements
  const updateUIForAuth = (isLoggedIn) => {
    if (isLoggedIn) {
      // Show logged-in UI
      document.querySelector('.SIGNUP').classList.add('display_button_hidden');
      document.querySelector('.LOGIN').classList.add('display_button_hidden');
      document.querySelector('.LOGOUT').classList.remove('display_button_hidden');
      document.querySelector('.box1').classList.add('display_box_hidden');
      document.querySelector('.box2').classList.remove('display_box_hidden');
      document.querySelector('.child1').classList.add('display_box_hidden');
      document.querySelector('.child2').classList.add('display_box_hidden');

      document.querySelector('.DOM').classList.add("height_DOM_increase") ;
      document.querySelector('.DOM').classList.remove("height_DOM_decrease");
      //
      if(cityData.name){
        document.querySelector('.DOM').classList.add("increase-height");
        document.querySelector('.DOM').classList.remove("decrease-height");
      }
      else{
        document.querySelector('.DOM').classList.remove("increase-height");
        document.querySelector('.DOM').classList.add("decrease-height");
      }

    } 
    else {
      // Show logged-out UI
      document.querySelector('.SIGNUP').classList.remove('display_button_hidden');
      document.querySelector('.LOGIN').classList.remove('display_button_hidden');
      document.querySelector('.LOGOUT').classList.add('display_button_hidden');
      document.querySelector('.box1').classList.remove('display_box_hidden');
      document.querySelector('.box2').classList.add('display_box_hidden');
      document.querySelector('.child1').classList.add('display_box_hidden');
      document.querySelector('.child2').classList.add('display_box_hidden');

      document.querySelector('.DOM').classList.add("height_DOM_decrease") ;
      document.querySelector('.DOM').classList.remove("height_DOM_increase") ;
      //
      // document.querySelector('.DOM').classList.add("increase-height") ;
      if(cityData.name){
        document.querySelector('.DOM').classList.add("increase-height");
        document.querySelector('.DOM').classList.remove("decrease-height");
      }
      else{
        document.querySelector('.DOM').classList.remove("increase-height");
        document.querySelector('.DOM').classList.add("decrease-height");
      }


    }
  };
    const checkAuth = async () => {
      const token = JSON.parse(localStorage.getItem('login'))?.token ; 
      if(!token){ 
        updateUIForAuth(false) ;  // i.e token is null
      }
      else{
        try {
          const response = await axios.get("http://localhost:5500/verify", {
            headers: {Authorization:`Bearer ${token}`},
          });
          if(response.data.valid){
            updateUIForAuth(true) ; // Token is valid, show logged-in UI
          }
          else{ 
            updateUIForAuth(false) ; // not valid login
          }
        } catch(err) {
          console.error(`ERROR : ${err.message}`) ; 
          updateUIForAuth(false); // On error, treat as not logged in
        }
      }
    };



  // HANDLE CITY
  // make a variable here along with its usestate that will con
   // Handle city data and forecast
   const [city, setCity] = useState('');
   const [cityData, setCityData] = useState({});
   const [forecastData, setForecastData] = useState([]);
 
   const handleCity = async (e) => {
     e.preventDefault();
     const obj = { city };
     try {
       const response = await axios.post("http://localhost:5500/get", obj);
       if (response.data) {
         const { current, forecast } = response.data;
 
         // Process current weather data
         const currentWeather = {
           name: current.name,
           temp: `${(current.main.temp - 273.15).toFixed(2)}°C`,
           weather: `${current.weather[0].description}`,
           date: `${new Date(current.dt * 1000).toLocaleDateString()}`
         };
         setCityData(currentWeather);
 
         // Process forecast data
         const forecastList = forecast.map(item => {
           const date = new Date(item.dt * 1000).toLocaleDateString();
           return {
             temp: `${(item.main.temp - 273.15).toFixed(2)}°C`,
             weather: `${item.weather[0].description}`,
             date
           };
         });
         setForecastData(forecastList);
       } 
       else {
         setCityData('NOTHING TO DISPLAY');
         setForecastData([]);
       }
     } catch (error) {
       console.error('Error fetching weather data:', error.message);
       alert(`PLEASE ENTER A VALID CITY OR COUNTRY NAME ,\n${error.message}`);
       setCityData('NOTHING TO DISPLAY');
       setForecastData([]);
     }
   };
  



  // SIGNUP 
  const [name,set_S_Name] = useState('') ; 
  const [email,set_S_Email] = useState('') ; 
  const [password,set_S_Password] = useState('') ;
  const handleSignupSubmit = async (e) => {
    e.preventDefault() ; 
    const obj = {name,email,password} ; 
    try {
      const response = await axios.post("http://localhost:5500/signup", obj);
      if(response.data.bool){
        // alert box : 
        alert("USER CREATED SUCCESSFULLY ! PLEASE LOGIN");
        checkAuth();
      } else {
        // User already exists
        alert("USER ALREADY EXISTS! PLEASE LOGIN");
      }
    } catch(err) {
      console.log(`ERROR: ${err.message}`) ; 
    }
  }

  // LOGIN
  const [email_L,set_L_Email] = useState('') ; 
  const [password_L,set_L_Password] = useState('') ;
  const handleLoginSubmit = async (e) => {
    e.preventDefault() ; 
    const obj = {email:email_L,password:password_L} ; 
    try {
      const response = await axios.post("http://localhost:5500/login", obj) ; 
      if(response.data.bool){
        alert(response.data.explanation) ; 
        // create token in frontend IN LOCALSTORAGE : 
        localStorage.setItem('login',JSON.stringify({ // HERE : key = 'login' , value = ' "login";"true","token";"aksjakjnc.....etc" '
          login: true , 
          token: response.data.token 
        }));
        //-------------------------
        checkAuth();
      }
      else{
        alert(response.data.explanation) ; 
      }
    } catch (error) {
      console.log(`ERROR: ${err.message}`) ; 
    }
  }

  // LOGOUT 
  const handleLogout = async (e) => {
    try {
      axios.post("http://localhost:5500/logout", {}, {
        headers: {
          Authorization : `Bearer ${JSON.parse(localStorage.getItem('login'))?.token}`
        }
      });
      console.log('LOGOUT REQUEST SENT TO SERVER') ;  
    } catch (error) {
      console.error(`EROR: ${err.message}`) ; 
    } finally{
      localStorage.removeItem('login') ;
      checkAuth() ;
    }
  }


  const clickHome = () => {
    document.querySelector('.child1').classList.add('display_box_hidden');
    document.querySelector('.child2').classList.add('display_box_hidden') ;
    checkAuth() ;
  }

  const clickSignup = () => {
    document.querySelector('.box1').classList.add('display_box_hidden') ; 
    document.querySelector('.child1').classList.remove('display_box_hidden') ; 
    document.querySelector('.child2').classList.add('display_box_hidden') ;


    // Adjust DOM height based on the visibility of box1
    document.querySelector('.DOM').classList.add('decrease-height');
    document.querySelector('.DOM').classList.remove('increase-height');
  }
  const clickLogin = () => {
    document.querySelector('.box1').classList.add('display_box_hidden') ; 
    document.querySelector('.child1').classList.add('display_box_hidden') ; 
    document.querySelector('.child2').classList.remove('display_box_hidden') ;

    // Adjust DOM height based on the visibility of box1
    document.querySelector('.DOM').classList.add('decrease-height');
    document.querySelector('.DOM').classList.remove('increase-height');
  }




  return (
    <>
      <div className="navigation">
        <h1 onClick={clickHome} className='Title'>WEATHER APP</h1>
        <div className="button"><button className='SIGNUP' onClick={clickSignup}>SIGNUP</button> <button className='LOGIN' onClick={clickLogin}>LOGIN</button> <button className='LOGOUT' onClick={handleLogout}>LOGOUT</button></div>
      </div>
      


      <div className={`DOM ${ document.querySelector('.box1') &&  cityData.name ? 'increase-height' : 'decrease-height'}`}>
        <div className="box1">
          <form onSubmit={handleCity} className='form1'>
            <input type="text" className='input1' value={city} onChange={(e) => setCity(e.target.value)}  placeholder="Enter city/country name" />
            <button type='submit' className='button1'>SUBMIT</button>
          </form>
          <div className="items_singular">
                 {/* image here  */}
            <h3>{cityData.name}</h3>
            <h3>{cityData.temp}</h3>
            <h3>{cityData.weather}</h3>
            <h3>{cityData.date}</h3>
          </div>
          {/* Conditionally display "HELLO" only if cityData is empty */}
          {!cityData.name && !cityData.temp && !cityData.weather && !cityData.date ? (
            <div className='X'><h2>NOTHING TO DISPLAY !</h2></div>
          ) : (
            <div className='X'><h2>PLEASE LOGIN !</h2><h3>To access the weather forecast for the next 5 days, please log in to your account. Stay informed about the weather and plan your activities accordingly!</h3>
            </div>
          )}
        </div>

        <div className="box2">
          <form onSubmit={handleCity} className='form2'>
            <input type="text"className='input1' value={city} onChange={(e) => setCity(e.target.value)}  placeholder="Enter city/country name" />
            <button className='button1' type='submit'>SUBMIT</button>
          </form>
          {forecastData.length > 0 && (
            <div className='days'>
              {forecastData.map((item, index) => (
                <div className="items_multiple" key={index}>
                  {/* image here  */}
                  <h3>{item.temp}</h3>
                  <h3>{item.weather}</h3>
                  <h3>{item.date}</h3>
                </div>
              ))}
            </div>
          )}
        </div>


        <div className="child1">
          <form onSubmit={handleSignupSubmit} className='form_child1'>
            <h2>SIGN UP </h2>
            <div><label><h3>NAME </h3></label>  <input type="text" value={name} onChange={(e)=> set_S_Name(e.target.value)}/><br /><br /> </div>
            <div><label><h3>EMAIL </h3></label>  <input type="email" value={email} onChange={(e)=> set_S_Email(e.target.value)}/><br /><br /></div>
            <div><label><h3>PASSWORD </h3></label>  <input type="password" value={password} onChange={(e)=> set_S_Password(e.target.value)}/><br /><br /></div>
            <button className='button1' type='submit'>SUBMIT</button>
          </form>
        </div>
        <div className="child2">
        <form onSubmit={handleLoginSubmit} className='form_child2'>
            <h2>LOGIN FORM </h2>
            <div><label><h3>EMAIL </h3></label>  <input type="email" value={email_L} onChange={(e)=>set_L_Email(e.target.value)} /><br /><br /></div>
            <div><label><h3>PASSWORD </h3></label>  <input type="password" value={password_L} onChange={(e)=>set_L_Password(e.target.value)} /><br /><br /></div>
            <button className='button1' type='submit'>SUBMIT</button>
          </form>
        </div>
      </div>
    </>
  )
}


export default App ;
