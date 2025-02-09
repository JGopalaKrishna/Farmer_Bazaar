import React from "react";
import { Category } from "./CategoryProdects";
import { Slideshow } from "./Slideshow";
export function HomePage1(){
  const savedUser = localStorage.getItem("userData");
  var username =savedUser ? JSON.parse(savedUser) : null;
  // console.log(username);
 return(
  <>  
   <div>
    <Slideshow/><br/><br/>
    <Category Category="Vegetables"  username={username} />
    <Category Category="Leafyvegetables" username={username} />
    <Category Category="Grains" username={username} />
    <Category Category="Legumes" username={username} />
    <Category Category="Nuts" username={username} />
    <Category Category="Fruits" username={username} />
   </div>
  </>
 )
} 