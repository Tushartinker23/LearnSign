import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, signupUser } from '../redux/authSlice.js';
import './css/loginForm.css';
import styled from "styled-components";
import learnSignLogo from "../../src/assets/images/learnSignLogo.png";
const StyledAppBar = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0 16px 0;
  @media only screen and (max-width: 768px) {
    align-items: flex-start;
  }
`;
const StyledIntro = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px;
`;
const StyledLogo = styled.img`
 height:4rem;
  padding: 0;
  margin-left: 2rem;
  @media only screen and (max-width: 768px) {
    // width: 10px;
  }
`;
const StyledLink = styled(Link)`
  padding-left: 20px;
  padding-right: 20px;
  font-size: 13px;
  font-weight: 400;
  color: black;
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { email: formData.email, password: formData.password };
    if (isSignUp) {
      dispatch(signupUser({ ...payload, name: formData.name }));
    } else {
      dispatch(loginUser(payload));
    }
  };

  useEffect(() => {
    if (user && !loading && !error) {
      history.push('/');
    } else {
      history.push('/login');
    }
  }, [user, loading, error, history]);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const collapseNav = () => setIsNavCollapsed(true);
  return (
    <>
     <StyledAppBar onBlur={collapseNav}>
          <StyledIntro>
            <StyledLogo src={learnSignLogo} alt="V Sign" />
          </StyledIntro>
        </StyledAppBar>
    <div className="containerForm">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {isSignUp ? (
            <div className="sign-up">
              <h1 className="heading">Hello, friend!</h1>
              <div className="text">
                <img src="https://i.postimg.cc/1zgS8WTF/user.png" alt="icon" height="20" />
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Name" 
                  onChange={handleChange} 
                  value={formData.name}
                  required 
                />
              </div>
              <div className="text">
                <img src="https://i.postimg.cc/DZBPRgvC/email.png" alt="icon" height="12" />
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  onChange={handleChange} 
                  value={formData.email}
                  required 
                />
              </div>
              <div className="text">
                <img src="https://i.postimg.cc/Nj5SDK4q/password.png" alt="icon" height="20" />
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Password" 
                  onChange={handleChange} 
                  value={formData.password}
                  required 
                />
              </div>
              <button type="submit" className="loginButton" disabled={loading}>
                {loading ? 'Processing...' : (isSignUp ? 'CREATE ACCOUNT' : 'LOGIN')}
              </button>
              <p className="conditions" style={{color:"black"}}>
                Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsSignUp(false); }}>Sign in</a>
              </p>
            </div>
          ) : (
            <div className="login">
              <h1 className="heading">Welcome Back!</h1>
              <div className="text">
                <img src="https://i.postimg.cc/DZBPRgvC/email.png" alt="icon" height="12" />
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  onChange={handleChange} 
                  value={formData.email}
                  required 
                />
              </div>
              <div className="text">
                <img src="https://i.postimg.cc/Nj5SDK4q/password.png" alt="icon" height="20" />
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Password" 
                  onChange={handleChange} 
                  value={formData.password}
                  required 
                />
              </div>
              <button type="submit" className="loginButton" disabled={loading}>
                {loading ? 'Processing...' : (isSignUp ? 'CREATE ACCOUNT' : 'LOGIN')}
              </button>
              <p className="conditions" style={{color:"black"}}>
                Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsSignUp(true); }}>Sign up</a>
              </p>
            </div>
          )}
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
      <div className="text-containerForm">
        <h1 style={{color:"black"}}>{isSignUp ? 'Glad to see you!' : 'Welcome Back!'}</h1>
        <p style={{color:"black"}}>{isSignUp ? 'Fill in the details to create an account.' : 'Enter your credentials to log in.'}</p>
      </div>
    </div>
    </>
  );
}