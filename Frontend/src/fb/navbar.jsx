import React, { useState, useRef } from 'react';
import styles from './navbar.module.css';
import img from '/farmer Bazaar Logo.jpeg';
import { CiSearch } from "react-icons/ci";
import { IoIosHome } from "react-icons/io";
import { MdOutlineShoppingBag } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { IoCartOutline, IoMenu } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { SlLogout } from "react-icons/sl";
import { SlLogin } from "react-icons/sl"; 

export const Navbar = () => {
  // const location = useLocation(); 
  // var username = [location.state];
  // console.log(username);
  // localStorage.setItem("userData", JSON.stringify(username));
  const savedUser = localStorage.getItem("userData");
  var username =savedUser ? JSON.parse(savedUser) : null;
  const [change, setChange] = useState('');
  const [menuOpen, setMenuOpen] = useState(false); 
  const mobileMenuRef = useRef(null);

  const iconnone = (val) => {
    setChange(val);
  };

  const togglemenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

//mycode
const navigate = useNavigate();
const ForGocart=()=>{
  console.log("Forcart");
  console.log(username);
  navigate("/CartPage", { state:  username  });
}
const [InPage,setPage]=useState(true);

const ChangeColor_NavHome=()=>{
console.log("ChangeColor_NavHome")
setPage(true);
navigate("/", { state:  username  });
}
const ChangeColor_NavProdect=()=>{
  console.log("ChangeColor_NavProdect")
  setPage(false);
  navigate("/ProdectPage", { state:  username  });
}
const BecomeAfarmer=()=>{
  console.log("ChangeColor_NavProdect")
  setPage(false);
  navigate("/FarmerOnePage", { state:  "Register / Login"  });
  localStorage.removeItem("userData");
}

  return (
    <div className={styles.main}>
      <div className={styles.logo}> 
        <img src={img} alt='farmers bazaar logo' />
        <span>Farmers Bazaar</span>
      </div>
      {/* <div className={styles.searchWrapper}>
        <CiSearch className={styles.seicon} id="seicon" style={{ display: change.length === 0 ? 'block' : 'none' }}/>
        <input
          type='text'
          placeholder='      search...'
          className={styles.search}
          onChange={(event) => iconnone(event.target.value)}
        /> 
      </div> */}
      <div className={styles.navoptions}>

        <div onClick={ChangeColor_NavHome} style={{color: InPage ? "green" : "white" }}>
        <IoIosHome className={styles.home} />
        <span className={styles.txthome}>Home</span>
        </div>

        <div onClick={ChangeColor_NavProdect} style={{color: InPage ? "white" :"green"}} >
        <MdOutlineShoppingBag className={styles.bag} />
        <span className={styles.products}>Products</span>
        </div>

        <div className={styles.becomeseller} onClick={BecomeAfarmer}>
          <GrUserManager className={styles.seller} />
          <span className={styles.becomeaseller}>
            <strong>Become a Seller</strong>
          </span>
        </div>

        <div className={styles.card} onClick={ForGocart}>
          <IoCartOutline className={styles.iconcard} />
          <span className={styles.txtcard}>
            <strong>Cart</strong>
          </span>
        </div>
        <div className={styles.login}>
          {/* <FaRegUser className={styles.iconlogin} /> */}
          {username ==null ? <SlLogin className={styles.iconlogin} onClick={()=>{navigate('/LogIn_signup')}} />: <SlLogout className={styles.iconlogin} onClick={()=>{localStorage.removeItem("userData");ChangeColor_NavHome();window.location.reload();}}/>}
          
          <span className={styles.txtlogin}>
          <strong>
            {username ==null ? <b onClick={()=>{navigate('/LogIn_signup')}}>Signup</b> :  <b onClick={()=>{localStorage.removeItem("userData");ChangeColor_NavHome();window.location.reload();}}>Logout</b>}
            </strong>
          </span>
        </div>
      </div>
      <IoMenu className={styles.mobileicon} onClick={togglemenu} />

      {/* Mobile menu options */}
      <div
        className={styles.mobilemenu}
        ref={mobileMenuRef}
        style={{ width: menuOpen ? '150px' : '0px' }}
      >
        
       <div onClick={ChangeColor_NavHome} style={{color: InPage ? "green" : "black" }}>
        <IoIosHome className={styles.mbhome} />
        <span className={styles.mbtxthome}>Home</span>
        </div>
        <div onClick={ChangeColor_NavProdect} style={{color: InPage ? "black" :"green"}} >
        <MdOutlineShoppingBag className={styles.mbbag} />
        <span className={styles.mbproducts}>Products</span>
        </div>
        <div className={styles.mbbecomeseller} onClick={BecomeAfarmer}>
          <GrUserManager className={styles.mbseller} />
          <span className={styles.mbbecomeaseller}>
            <strong>Become a<br /> Seller</strong>
          </span>
        </div>
        <div className={styles.mbcard} onClick={ForGocart}>
          <IoCartOutline className={styles.mbiconcard} />
          <span className={styles.mbtxtcard}>
            <strong>Card</strong>
          </span>
        </div>
        <div className={styles.mblogin}>
          <FaRegUser className={styles.mbiconlogin} />
          <span className={styles.mbtxtlogin}>
            <strong onClick={()=>{navigate('/LogIn_signup');localStorage.removeItem("userData");}}>{username ==null ? "Signup" :"Logout"}</strong>
          </span>
        </div>
        <FaXmark className={styles.wrong} onClick={closeMenu} />
      </div>
    </div>
    
  );
};
