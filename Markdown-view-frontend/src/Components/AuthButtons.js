import React from 'react'
import { Link } from 'react-router-dom';
import { AuthenticationButtonContainerStyles } from '../CustomStyles';
import styled from 'styled-components';

export default function AuthButtons() {
  return (
    <div style = {AuthenticationButtonContainerStyles}>
        <Link to = "/login"><Button>Log In</Button></Link>
        <Link to = "/signup"><Button>Sign Up</Button></Link>
    </div>
  )
}

const Button = styled.button`
  padding: 20px;
  font-size: 15px;
  background: 00#FFFFFF;
  color: #1F51FF;
  border: 1px solid #A7C7E7;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  width: 100px;

  &:hover {
    background: #1F51FF; 
    color: #fff;
  }
`;