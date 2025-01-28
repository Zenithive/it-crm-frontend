
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Login from '.././app/components/Login';
import '@testing-library/jest-dom';
import { act } from 'react';


test('should render login component', () => {
  render(<Login />);
  
  const usernameInput = screen.getByTestId('login-1');
  expect(usernameInput).toBeInTheDocument();


 
 
});

test('should render email input', () => {
  render(<Login />);
  
  const usernameInput = screen.getByTestId('email');
  expect(usernameInput).toBeInTheDocument();


 
 
});

test('should render password input', () => {
  render(<Login />);
  
  const usernameInput = screen.getByTestId('pass');
  expect(usernameInput).toBeInTheDocument();
 

 
 
});

test('should render Next button', () => {
  render(<Login />);
  
  const usernameInput = screen.getByTestId('nextButton');
  expect(usernameInput).toBeInTheDocument();
 

 
 
});


 


