import React from 'react';
import styled from 'styled-components';

const InfoButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  height: 100px;
  min-width: 250px;
  border-radius: 20px;
  font-size: 40px;
  background-color: #c2c2c2;

  margin: 20px;
  padding-right: 15px; 
  padding-left: 15px;
`;

export const InfoButton = ({ onClick, children }) => {
  return (
    <InfoButtonWrapper onClick={onClick}>
      {children}
    </InfoButtonWrapper>
  )
};

export default InfoButton;