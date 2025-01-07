import React from "react";

import { Header,HomeImage,CardSection } from "./Farmer_Home_Page";
import { Slideshow } from "./Slideshow";
import Footer from "./footer";
import { useLocation } from "react-router-dom";
export const FarmerOnePage=()=>{
  const location = useLocation();
 var Register = [location.state];
  return(
    <>
      <Header Register={Register}/><br/>
      <Slideshow/><br/>
      <CardSection/>      
      <HomeImage/>      
      <Footer/>      
    </>
  )
}