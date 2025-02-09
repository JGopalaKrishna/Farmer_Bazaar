import{React, useEffect, useState } from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import { SiPaytm,SiGooglepay ,SiPhonepe} from "react-icons/si"; 
import { RiDeleteBin6Fill } from "react-icons/ri";
import VanillaTilt from 'vanilla-tilt';
import "./CartPageStyle.css"
  
export const CartDispaly = ()=>{
//  const location = useLocation(); 
//  var UserName = [location.state];
//  var UserName = location.state?.username;
//  UserName = UserName[0];
const savedUser = localStorage.getItem("userData");
var UserName =savedUser ? JSON.parse(savedUser) : null;

 const [CartItems,setCartItems]=useState([]);
 const [ForPageLoad,setForPageLoad]=useState(false);
 var TotalCost=0;
//  const [PayAPP,setPayAPP]=useState("Paytm")

 useEffect(() => {
  const cards = document.querySelectorAll(".CartItemObj");
  cards.forEach((card) => {
    VanillaTilt.init(card, {
      max: 2,
      speed: 400, 
    }); 
  });
});
 useEffect(()=>{
  axios.post("http://localhost:9000/Cart-information-display-api",[UserName])
   .then((res)=>{
    console.log(res.data);
    setCartItems(res.data)
   })
   .catch((err)=>console.log(err))
 },[ForPageLoad]);

 const decreaseQuantity = (username,productid)=>{
  var data={ "UserName": username, "ProductId": productid };
  axios.post("http://localhost:9000/Cart-Quantity-Decrease-api",data)
  .then(()=>{console.log("decreased Quantity");setForPageLoad(!ForPageLoad);})
  .catch((err)=>{alert(err);})
 }

 const increaseQuantity = (username,productid)=>{
  var data={ "UserName": username, "ProductId": productid };
  axios.post("http://localhost:9000/Cart-Quantity-Increase-api",data)
  .then(()=>{console.log("Increased Quantity");setForPageLoad(!ForPageLoad);})
  .catch((err)=>{alert(err);})
 }

 const Deleteitem = (username,productid)=>{
  var data={ "UserName": username, "ProductId": productid };
  axios.post("http://localhost:9000/Cart-Prodect-Delete-api",data)
  .then(()=>{console.log("Removed sucessfully");setForPageLoad(!ForPageLoad);})
  .catch((err)=>alert(err))
 }

 const[BuyButton,setBuyButton]=useState("PURCHASE");
 const SendMailToUser = ()=>{
  if(UserName==null)return alert("signup first");
  setBuyButton("Loading...");
  axios.post("http://localhost:9000/mail-sender-api",[UserName])
  .then((res)=>{
    alert("Check your Mail");
    setBuyButton("Completed");
    axios.post("http://localhost:9000/Order-ToTake-api",[UserName])
    .then((res)=> setBuyButton("PURCHASE"))
    .catch((err)=>alert(err))
  })
  .catch((err)=>alert(err.message))


 }


 return(
  <>
   <main className="TotalCartPage">
    <section className="CartItemsShow">
     <div className="CartHeading">Order Summary</div>
     <div className="CartItemsList">
      {
        CartItems.map((cartItem)=>{
          TotalCost+=cartItem.ProductTotal;
         return(
          <div key={cartItem.ProductId} className="CartItemObj">
           <div className="CartItemImg"><img src={cartItem.ProductImage} /></div>
           <div className="CartItemDetils">
            <div className="CartItemDetilsName">{cartItem.ProductName}</div>
            <div className="CartItemDetilsPrize">₹{cartItem.ProductPrice}/- PerKg</div>
           </div>
           <div className="CartItemCount">
            <div className="CartItemCountNegative" onClick={()=>decreaseQuantity(UserName,cartItem.ProductId)}>–</div>
            <div className="CartItemCountNumber">{cartItem.ProductQuantity}</div>
            <div className="CartItemCountPositive" onClick={()=>increaseQuantity(UserName,cartItem.ProductId)}>+</div>
           </div>
           <div className="CartItemTotalCost">₹{cartItem.ProductTotal}/-</div>
           <div className="CartItemRemove" onClick={()=>Deleteitem(UserName,cartItem.ProductId)}><RiDeleteBin6Fill/></div>
          </div>
         )
        })
      }
     </div>
    </section>

    <section className="CartItemsPay">
     {/* <div className="CartPayHeading">Payment Method</div> */}
     <div className="CartPayHeading">BILL</div>
     <div className="CartBillpart"> 
      {/* <div className="CartPaySideHeading">Bill</div> */}
      <table className="TableCost"><tbody>
        <tr><th className="TableHead">Total Cost Of Items</th>:<td className="tableData">₹{TotalCost}/-</td></tr><br/>
        <tr><th className="TableHead">Discount</th>:<td className="tableData">0.0</td></tr><br/>
        <tr><th className="TableHead">GST</th>:<td className="tableData">0.0</td></tr><br/>
        <tr><th className="TableHead"><hr/></th><td className="tableData"><hr/></td><td className="tableData"><hr/></td></tr><br/>
        <tr><th className="TableHead">TOTAL</th>=<td className="tableData">&nbsp;&nbsp;₹{TotalCost}/-</td></tr>
      </tbody></table>
     </div>
     {/* <div className="CartPaymentIcons">
      <SiPaytm style={{color:'#0546ae'}} onClick={()=>setPayAPP("Paytm")}/>
      <SiGooglepay style={{ color: 'blue'}} onClick={()=>setPayAPP("Googlepay")}/>
      <SiPhonepe style={{ color: 'purple'}} onClick={()=>setPayAPP("Phonepe")}/>
     </div> */}
     {/* <div className="CartPaymentQR"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoXgnU7FduTcy0Z7GyoXnMnCqLBwMwAXdiFw&s" /></div> */}
     {/* <div className="CartBuyButton" onClick={()=>{alert("Payment Applications is Not Available in Your Devise")}}>Pay Securely with {PayAPP}</div> */}
     <div className="CartBuyButton" onClick={SendMailToUser}>{BuyButton}</div>
    </section>
   </main>
   <br/>
  </>
 )
}