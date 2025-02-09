import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";

import { UserLogIn_signup } from "./Login_signUpUser";

import { HeaderAndFooter } from "./Hader_Footer";
import { HomePage1 } from "./HomePage1";
import { CartDispaly } from "./Cart_Page";
import { Products_dispaly_Page } from "./ProductPage";

import { FarmerOnePage } from "./farmerone";
import { Registration } from "./FRegForm";
import { FarmerProfilepage } from "./FarmerProfilePage";
import {FarmersellingProdect} from "./ToSell";

export function RouterFunfb(){  
    return(
      <>
       
      <BrowserRouter>
        <Routes> 
          <Route path="/LogIn_signup" element={<UserLogIn_signup/>} />
          
          <Route path="/FarmerOnePage" element={<FarmerOnePage/>} />
          <Route path="/Registration" element={<Registration/>} />
          <Route path="/FarmerProfilepage" element={<FarmerProfilepage/>} />
          <Route path="/FarmersellingProdect" element={<FarmersellingProdect/>} />

          <Route path="/" element={<HeaderAndFooter/>}>
            <Route index element={<HomePage1 />} />
            <Route path="/CartPage" element={<CartDispaly/>} />
            <Route path="/ProductPage" element={<Products_dispaly_Page/>} />
          </Route>

        </Routes> 
      </BrowserRouter> 
      </>
    )
  }