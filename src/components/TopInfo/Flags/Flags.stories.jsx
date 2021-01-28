import React from 'react';
import styled from 'styled-components';

import Flags from './Flags';

export default {
  title: 'Components/TopInfo/Flags',
  component: Flags
};

const Wrapper = styled.div`
  height: auto;
  width: 300px;
`;

const Template = (args) => (<Wrapper><Flags {...args} /></Wrapper>);

export const Base = Template.bind({});
