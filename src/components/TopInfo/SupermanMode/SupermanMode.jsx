import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setSupermanMode } from '../../../features/additionalData/additionalInfoSlice'
import InfoButton from '../AbstractInfoButton';
import { FaMask } from 'react-icons/fa';


const SupermanMode = () => {
  const isSupermanMode = useSelector(state => state.additionalData.isSupermanMode)
  const dispatch = useDispatch();

  return (
      <InfoButton 
        onClick={() => dispatch(setSupermanMode({ isSupermanMode: !isSupermanMode }))}
      >
        <FaMask style={{ 
          color: isSupermanMode && "red",
          fontSize: "80px"}}
        />
      </InfoButton>
  )
}

export default SupermanMode;