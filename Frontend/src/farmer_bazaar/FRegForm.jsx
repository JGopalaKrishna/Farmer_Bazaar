import React, { useState } from "react";
import axios from 'axios';
import './FRegForm.css';
import { useNavigate } from "react-router-dom";
import FarmerLogo from '/farmer Bazaar Logo.jpeg';

export const Registration = () => {
 const navigate = useNavigate();
 
    const [formData, setFormData] = useState({ 
        RegisterId: 'R002',
        Name: '',
        PhoneNumber: '',
        Email: '',
        Password: '',
        Address: '',
        ProduceType: '',
        Experience: ''
    });

    const [loginData, setLoginData] = useState({
        Email: '',
        Password: ''
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [isLoginVisible, setIsLoginVisible] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLoginInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const validate = () => {
        let tempErrors = {}; 

        if (!/^\d{10}$/.test(formData.PhoneNumber)) {
            tempErrors.PhoneNumber = "Phone number must be exactly 10 digits.";
        }

        if (Object.values(formData).some(field => field.length > 100)) {
            tempErrors.general = "Fields should not exceed 100 characters.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    // Handle Registration
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (validate()) {
            try {
                const response = await axios.post('http://localhost:9000/Adding-Farmer-Deatil-api', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 201) {
                    setMessage('Registration successful!');
                // navigate("/FarmerOnePage", { state:  formData.Email[0] });
                // navigate("/MyFarmerProfile", { state:  formData.Email });
                setIsLoginVisible(true);

                } else {
                    setMessage(response.data.message || 'Failed to register');
                }
            } catch (error) {
                setMessage(error.response?.data?.message || 'An error occurred during registration');
            }
        } else {
            setMessage('Please correct the errors before submitting.');
        }
    };

    // Handle Login
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await axios.post('http://localhost:9000/Cheking-Farmer-Deatil-api', loginData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                setMessage('You are successfully logged in!');
                // navigate("/FarmerProfilepage", { state:  loginData.Email });
                localStorage.setItem('email', loginData.Email);
                navigate("/FarmerProfilepage");

            } else {
                setMessage(response.data.message || 'Failed to login');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred during login');
        }
    };

    const toggleLogin = () => {
        setIsLoginVisible(!isLoginVisible);
    };

    return (
        <>
        <div className="loginHeader">
            <div className="loginHeaderImg" ><img src={FarmerLogo}/></div>
            <div  className="loginHeaderCont" >FARMER BAZAAR</div>
        </div>
        <div className="Fbase daj">
            <div className="Center daj">
                <form className="Rmain daj" onSubmit={!isLoginVisible ? handleSubmit : handleLoginSubmit}>
                    <div className="curves">
                        <div className="c1"></div>
                        <div className="c2"></div>
                        <div className="c3"></div>
                        <div className="c4"></div>
                    </div>
                    {!isLoginVisible && (
                        <div className="Rcenter daj">

                            <div className="row daj" style={{background: 'linear-gradient(to bottom right, #eaef5d, #4BAE74)',color:'white'}}>Registration</div>
                            {['Name', 'PhoneNumber', 'Email', 'Password', 'Address', 'ProduceType', 'Experience'].map((field, idx) => (
                                <div className="row" key={idx}>
                                    <div className="dname daj">{field.charAt(0).toUpperCase() + field.slice(1)}</div>
                                    <div className="dcolon daj">:</div>
                                    <div className="detail daj">
                                        <input
                                            type={field === 'Password' ? 'password' : (field === 'PhoneNumber' ? 'number' : 'text')}
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleInputChange}
                                            maxLength="100"
                                            required
                                            className="inputField"
                                        />
                                    </div>
                                </div>
                            ))}
                            {errors.general && <p className="error">{errors.general}</p>}
                            {errors.phone && <p className="error">{errors.phone}</p>}
                            {message && <p className="message">{message}</p>}
                            <div className="buttonsforSignup">
                                <button type="submit" className="buttonsSIGNUP">Registration</button>
                                <div>
                                    <b>Already have an Account? </b>
                                    <b className="" onClick={toggleLogin} style={{ cursor: 'pointer', color: 'blue' }}> Login</b>
                                </div>
                            </div>
                        </div>
                    )}

                    {isLoginVisible && (
                        <div className="Rcenter1 daj">
                            <div className="row daj" style={{background: 'linear-gradient(to bottom right, #eaef5d, #4BAE74)',color:'white' }}>LOGIN</div>
                            {['Email', 'Password'].map((field, idx) => (
                                <div className="row" key={idx}>
                                    <div className="dname daj">{field.charAt(0).toUpperCase() + field.slice(1)}</div>
                                    <div className="dcolon daj">:</div>
                                    <div className="detail daj">
                                        <input
                                            type={field === 'Password' ? 'password' : 'text'}
                                            name={field}
                                            value={loginData[field]}
                                            onChange={handleLoginInputChange}
                                            required
                                            className="inputField"
                                        />
                                    </div>
                                </div>
                            ))}
                            {message && <p className="message">{message}</p>}
                            <div className="buttonsforSignup">
                                <button type="submit" className="buttonsSIGNUP">LOGIN</button>
                                <div>
                                    <b>Not a Member? </b>
                                    <b className="" onClick={toggleLogin} style={{ cursor: 'pointer', color: 'blue' }}> Registration</b>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    </>

    );
};