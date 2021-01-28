import React from 'react';
import styled from 'styled-components';

import Cell, {Flag, Bomb, Number, Empty} from './Cell';

export default {
  title: 'Components/Cell/Cell',
  component: Cell,
  argTypes: {
    type: {
      control: {
        type: 'inline-radio',
        options: [Flag, Bomb, Number, Empty],
      }
    }
  }
};

const Wrapper = styled.div`
  height: auto;
  width: 300px;
`;

const Template = (args) => (<Wrapper><Cell {...args} /></Wrapper>);

export const Base = Template.bind({});


Base.args = {
  isSelected: false,
  isSupermanMode: false,
  number: 1,
};