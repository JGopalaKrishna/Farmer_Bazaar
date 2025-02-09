
import React, { useState } from "react";
import axios from 'axios'; // You need axios for making HTTP requests
import { useLocation, useNavigate } from "react-router-dom";
import FarmerLogo from '/farmer Bazaar Logo.jpeg';
import { VscCheck } from "react-icons/vsc";
import { GiConsoleController } from "react-icons/gi";



export const FarmersellingProdect = () => {
  const optionValues = ["Cucumbers","Pumpkins","Tomatoes","Eggplants","Bell peppers","Chili peppers","Potatoes","Sweet potatoes","Carrots","Beets","Turnips","Radishes","Onions","Garlic","Lettuce","Swiss chard","Cabbage","Broccoli","Cauliflower","Mushrooms","Sugarcane","Hemp","Ridge gourd","Bottle gourd","Drum stick","Gherkin","Okra","Bitter gourd","Spinach","Sorrel","Coriander","Amaranthus","Wheat","Corn","Barley","Rice","Oats","Millet","Quinoa","Soybeans","Chickpeas","Lentils","Black beans","Green gram","Tamarind","Groundnuts","Almonds","Walnuts","Cashews","Peanuts","Bananas","Oranges","Lemons","Apples","Pears","Plums","Peaches","Grapes","Cherries","Blueberries","Raspberries","Strawberries","Blackberries","Cranberries","Mangoes","Papayas","Pineapples","Watermelons","Sapota","Guava"];
  const navigate = useNavigate();
  const location = useLocation(); 
  var Email = [location.state];
  Email=Email[0];

  const [FarmersellData, setFarmersellData] = useState({
    Email:Email,
    ProductName:'',
    ProductQuantity:''
  });
  const [errors, setError] = useState('');
  const [message, setMessage] = useState('');
  const [ChangeButton, setChangeButton] = useState(true);
  const [CostOfprodt, setCostOfprodt] = useState();
  const [animate, setanimate] = useState(false);
  const [conform, setconform] = useState(false);

  const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFarmersellData({ ...FarmersellData, [name]: value });
  };

  const ChackingValues = (value) => {
    value=value.trim()
    console.log(value);
    if (!optionValues.includes(value)) {
      setError('This item is not allowed. Please select a valid option.');
      return false;
    } else {
      return true;
    }
  };




  // Handle Registration
  const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage('');
      var conform =ChackingValues(FarmersellData.ProductName);
        console.log(errors)
      if (conform) {
          try {
            console.log("i am gin gto db");

            axios.post("http://localhost:9000/ConformationOf-CostProdect-api",{ "Email": FarmersellData.Email, "ProductName": FarmersellData.ProductName})
            .then((res)=>{
              if(res.status==206)setMessage(res.data.message || 'Already existed Item ');
              else{
                console.log(res.data);
                setCostOfprodt(res.data);
              setChangeButton(false);
              }
            })
            .catch((err)=>console.log(err))
          } catch (error) {
              setMessage(error.response?.data?.message || 'An error occurred during registration');
          }
      } else {
          setMessage('Please correct the errors before Okay.',errors);
      }
  };

  const AddProdectToSale=()=>{
    try {
      console.log("i am gin gto db");

      axios.post("http://localhost:9000/Adding-Prodect-Sale-api",FarmersellData)
      .then((res)=>{
        setMessage("Added Successfully");
        setanimate(true)
        setTimeout(() => {navigate('/FarmerProfilepage',{ state: Email }); }, 2000); 
      })
      .catch((err)=>console.log(err))
    }catch (error) {
      setMessage('An error occurred during Adding Sale prodect');
    }
}

  return (
      <>
      <div className="loginHeader">
          <div className="loginHeaderImg" ><img src={FarmerLogo}/></div>
          <div  className="loginHeaderCont" >FARMER BAZAAR</div>
      </div>
      <div className="Fbase daj">
          <div className="Center daj">
              <form className="Rmain daj" onSubmit={handleSubmit}>
                  <div className="curves">
                      <div className="c1"></div>
                      <div className="c2"></div>
                      <div className="c3"></div>
                      <div className="c4"></div>
                  </div>
                      <div className="Rcenter daj">
                          <div className="row daj" style={{background: 'linear-gradient(to bottom right, #eaef5d, #4BAE74)',color:'white'}}>Mention the details of an item...</div>
                          {['ProductName','ProductQuantity'].map((field, idx) => (
                              <div className="row" key={idx}>
                                  <div className="dname daj">{field.charAt(0).toUpperCase() + field.slice(1)}</div>
                                  <div className="dcolon daj">:</div>
                                  <div className="detail daj">
                                      <input
                                          list={field === 'ProductQuantity' ?  '' : "options"}
                                          type={field === 'ProductQuantity' ?  'number' : 'text'}
                                          name={field}
                                          value={FarmersellData[field]}
                                          onChange={handleInputChange}
                                          maxLength="100"
                                          required
                                          className="inputField"
                                      />
                                  </div>
                              </div>
                          ))}
                            
                            <datalist id="options">{optionValues.map((value, index) => (<option key={index} value={value} />))}</datalist>
                            {CostOfprodt && <b className="message" style={{fontSize:"20px"}}>Total Cost Of Product : <b style={{color:"red"}}>₹{CostOfprodt * FarmersellData.ProductQuantity} /-</b></b>}

                            {errors && <p className="error">{errors}</p>}
                            {message && <p className="message">{message}</p>}
                          <div className="buttonsforSignup">
                            {ChangeButton?
                                <button type="submit" className="buttonsSIGNUP">Okay</button>
                                :
                                <button className={animate ? 'button_animate_Succe buttonsSubmit' : 'buttonsSubmit'} onClick={AddProdectToSale}>
                                    {animate ? <VscCheck style={{fontSize:"40px",fontWeight:"bolder"}}/>: "Submit"}
                                    {/* Submit */}
                                    </button>
                            }
                          </div>
                      </div>
              </form>
          </div>
      </div>
  </>

  );
}
