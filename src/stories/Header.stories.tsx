import type { Meta, StoryObj } from '@storybook/react';
import Header from '../components/Header/Header';
import'../styles/App.scss';
import { Provider } from "react-redux";
import { store } from '../store';

import { BrowserRouter} from "react-router-dom";

const meta: Meta<typeof Header> = {
    title: 'Components/Header/Header',
    component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
    render: (args) => (
      <BrowserRouter >
        <Provider store={store}> 
          <div style={
                {
                    'backgroundColor': '#100e19', 
                    'width': '1400px' 
                }
            }>
                    <Header />  
          </div>
        </Provider> 
      </BrowserRouter>
    ),
    args: {
    }
  };