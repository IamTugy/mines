import React from 'react';
import styled from 'styled-components';

import TopInfo from './index';

export default {
  title: 'Components/TopInfo/TopInfo',
  component: TopInfo
};

const Wrapper = styled.div`
  height: auto;
  width: 100%;
`;

const Template = (args) => (<Wrapper><TopInfo {...args} /></Wrapper>);

export const Base = Template.bind({});
