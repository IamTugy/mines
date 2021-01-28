import React from 'react';
import styled from 'styled-components';

import SupermanMode from './SupermanMode';

export default {
  title: 'Components/TopInfo/SupermanMode',
  component: SupermanMode
};

const Wrapper = styled.div`
  height: auto;
  width: 300px;
`;

const Template = (args) => (<Wrapper><SupermanMode {...args} /></Wrapper>);

export const Base = Template.bind({});
