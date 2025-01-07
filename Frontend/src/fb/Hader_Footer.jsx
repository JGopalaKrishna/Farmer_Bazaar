import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Navbar } from "./navbar";
import Footer from "./footer";

export const HeaderAndFooter=()=>{
  return(
    <>
    <Navbar/><br></br>
    <Outlet/> 
    <Footer/>
    </>
  )
}
