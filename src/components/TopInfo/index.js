import React from 'react';
import styled from 'styled-components';

import Flags from './Flags/Flags'
import Timer from './Timer/Timer'
import SupermanMode from './SupermanMode/SupermanMode'
import RePlay from './RePlay/RePlay'

const TopInfoBarWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

export const TopInfoBar = () => {
  return (
    <TopInfoBarWrapper>
      <SupermanMode/>
      <Timer/>
      <Flags/>
      <RePlay/>
    </TopInfoBarWrapper>
  )
}

export default TopInfoBar;