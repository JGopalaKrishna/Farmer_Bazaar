import {React, useEffect, useState } from "react";
import axios from "axios";
import VanillaTilt from 'vanilla-tilt';
import "./ProdectPageCss.css"
 
export const Category =(props)=>{ 
  const Category=props.Category;
  // const UserName=props.username;
  // console.log("UserName,cata",UserName)
  const savedUser = localStorage.getItem("userData");
  var UserName =savedUser ? JSON.parse(savedUser) : null;
  const [ProdectItems,setProdectItems]=useState([]);

  
  const AddProdectToCart=(product_id)=>{
    console.log("AddProdectToCart");
    if(UserName!=null){
    var data={"UserName":UserName, "ProductId":product_id};
    console.log(data);
    axios.post("http://localhost:9000/Cart-Prodect-Adding-api",data)
    .then((res)=>{console.log("res",res)})
    .catch((err)=>console.log(err))
    }
    const updatedItems = ProdectItems.map((product) => {
      if (product.ProductId === product_id) {
        return { ...product, ProductAddToCart: true }; // Spread operator to avoid mutation
      }
      return product;
    });
    console.log("updatedItems",updatedItems);
    setProdectItems(updatedItems);

  }
  
  const ToRemoveProdectFromCart=(product_id)=>{
    if(UserName!=null){
    var data={"UserName":UserName, "ProductId":product_id};
    axios.post("http://localhost:9000/Cart-Prodect-Delete-api",data)
    .then((res)=>{console.log("res",res)})
    .catch((err)=>console.log(err))
    }
    const updatedItems = ProdectItems.map((product) => {
      if (product.ProductId === product_id) {
        return { ...product, ProductAddToCart: false }; // Spread operator to avoid mutation
      }
      return product;
    });
    console.log("updatedItems",updatedItems);
    setProdectItems(updatedItems);
  }
  useEffect(() => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      VanillaTilt.init(card, {
        max: 4,
        speed: 400,
      });
    });
  });

  useEffect(()=>{
    axios.post("http://localhost:9000/getRandom-ProductsBy-Category-api",{"UserName":UserName,"Category":Category})
     .then((res)=>{
      // console.log(res.data);
      setProdectItems(res.data)
     })
     .catch((err)=>console.log(err))
   },[]);
   
  return(
    <>
    <main className="CategoryDisplay">
    <div className="CategorySideHeading">{Category}</div>
      <section className="ProdectsCategoryDisplayArea">
        {
          ProdectItems.map((Prodect)=>{
            return(
              <div key={Prodect.ProductId} className="card">
               {Prodect.ProductQuantity==1 ? <div className="OutofStockProdect"><p className="OutofStockProdectTextRorate">Out of Stock</p></div> :<></>}
               <div className="itemImg"><img src={Prodect.ProductImage} alt="https://i.pinimg.com/474x/47/ec/e9/47ece9d66364baa9c686c5ce5ff6299d.jpg"/></div>
               <div className="ItemDeatils">
                <div className="itemName">{Prodect.ProductName}</div>
                <div className="itemcost">₹{Prodect.ProductPrice}/- Per kg</div>
               </div>
               <div className="ItemDeatils2">
                <div className="Description">{Prodect.ProductDescription}</div>
               </div>
               <div className="Rx3d">
                <div id="dimension1" style={{transform: Prodect.ProductAddToCart ? 'rotateX(0deg)' : 'rotateX(-90deg)',bottom: Prodect.ProductAddToCart ? '0%' : '60%',}} onClick={()=>{ToRemoveProdectFromCart(Prodect.ProductId)}}>In Cart</div>
                <div id="dimension2" style={{transform: Prodect.ProductAddToCart ? 'rotateX(-90deg)' : 'rotateX(0deg)',top: Prodect.ProductAddToCart ? '60%' : '0%',}} onClick={()=>{AddProdectToCart(Prodect.ProductId)}}>Add to Cart</div>
               </div>
              </div>
            )
          })
        }
      </section>
    </main>
    </>
  )
}