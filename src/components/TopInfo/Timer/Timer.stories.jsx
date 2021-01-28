import React from 'react';
import styled from 'styled-components';

import Timer from './Timer';

export default {
  title: 'Components/TopInfo/Timer',
  component: Timer
};

const Wrapper = styled.div`
  height: auto;
  width: 300px;
`;

const Template = (args) => (<Wrapper><Timer {...args} /></Wrapper>);

export const Base = Template.bind({});
