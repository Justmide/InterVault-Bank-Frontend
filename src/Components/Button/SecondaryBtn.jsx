import React from 'react';
import styled from 'styled-components';

const SecondaryBtn = ({ text }) => {
  return (
    <StyledWrapper>
      <button className="btn2" >
        <span className="spn2">{text}</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .btn2 {
    position: relative;
    display: inline-block;
    padding: 15px 30px;
    border: 2px solid #fefefe;
    text-transform: uppercase;
    color: #fefefe;
    text-decoration: none;
    font-weight: 600;
    font-size: 20px;
    transition: 0.3s;
    background: transparent;
    cursor: pointer;
  }

  .btn2::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    width: calc(100% + 4px);
    height: calc(100% - -2px);
    background-color: rgb(177 29 9);
    transition: 0.3s ease-out;
    transform: scaleY(1);
  }

  .btn2::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    width: calc(100% + 4px);
    height: calc(100% - 50px);
    background-color: rgb(177 29 9);
    transition: 0.3s ease-out;
    transform: scaleY(1);
  }

  .btn2:hover::before {
    transform: translateY(-25px);
    height: 0;
  }

  .btn2:hover::after {
    transform: scaleX(0);
    transition-delay: 0.15s;
  }

  .btn2:hover {
    border: 2px solid rgb(177 29 9);
    color: rgb(177 29 9);
  }

  .btn2 span {
    position: relative;
    z-index: 3;
  }

  button {
    text-decoration: none;
    border: none;
    background-color: transparent;
  }
`;


export default SecondaryBtn;
