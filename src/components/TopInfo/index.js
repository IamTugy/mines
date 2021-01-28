import React from 'react';
import styled from 'styled-components';

import Flags from './Flags/Flags'
import Timer from './Timer/Timer'
import SupermanMode from './SupermanMode/SupermanMode'

const TopInfoBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  width: 100%;
`;

export const TopInfoBar = () => {
  return (
    <TopInfoBarWrapper>
      <Timer/>
      <Flags/>
      <SupermanMode/>
    </TopInfoBarWrapper>
  )
}

export default TopInfoBar;