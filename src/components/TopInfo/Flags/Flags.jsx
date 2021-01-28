import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import styled from 'styled-components';

import InfoButton from '../AbstractInfoButton';
import { FaFlag } from 'react-icons/fa';

const TextWrapper = styled.div`
  margin-left: 10px;
`;

const Flags = () => {
  const { totalFlagsAmount, usedFlagsAmount} = useSelector(state => state.board);

  return (
      <InfoButton>
        <FaFlag/>
        <TextWrapper>
          {`${usedFlagsAmount}/${totalFlagsAmount}`}
        </TextWrapper>
      </InfoButton>
  )
}

export default Flags;