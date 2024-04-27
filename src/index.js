import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { SidebarProvider } from './context/sidebarContext';
import { MealProvider } from './context/mealContext';

ReactDOM.render(
  <SidebarProvider>
    <MealProvider>
      <App />
    </MealProvider>
  </SidebarProvider>,
  document.getElementById('root')
);
