
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Login from '.././app/components/Login';
import '@testing-library/jest-dom';

import userEvent from "@testing-library/user-event";
import { useRouter } from 'next/navigation';


jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));



 


test('renders login form and components', () => {
  render(<Login />);

  
 

 

 
  expect(screen.getByText('Email')).toBeInTheDocument();
  expect(screen.getByText('Password')).toBeInTheDocument();

  expect(screen.getByText('Next')).toBeInTheDocument();
  expect(screen.getByText('Login with Google')).toBeInTheDocument();
  expect(screen.getByText('Login with LinkedIn')).toBeInTheDocument();
});


test('displays email validation error on invalid email', async () => {
  render(<Login />);

  

  const emailInput = screen.getByTestId('email');
  await userEvent.type(emailInput, 'a');  

 
  const passwordInput = screen.getByTestId('pass');
  await userEvent.type(passwordInput, 'Valid123!');

 
  const nextButton = screen.getByTestId('nextButton');
  fireEvent.click(nextButton); 

  
  await waitFor(() => {
    expect(screen.getByTestId("errorEmail")).toHaveTextContent(/Enter Valid Email ID/i);
  });
  

  await userEvent.type(emailInput, 'a@h');
  await waitFor(() => {
    expect(screen.getByTestId("errorEmail")).toHaveTextContent("Please provide a valid email address (example@domain.com)");
  });
   
  
});

test('displays password validation error on invalid password', async () => {
  render(<Login />);



  const emailInput = screen.getByTestId('email');
  await userEvent.type(emailInput, 'a@gmail.com');  

 
  const passwordInput = screen.getByTestId('pass');
  await userEvent.type(passwordInput, "a");

 
  const nextButton = screen.getByTestId('nextButton');
  fireEvent.click(nextButton); 


 

  await waitFor(() => {
    expect(screen.getByTestId("errorPass")).toHaveTextContent(/Should be at least 6 characters/i);
  });



    
    fireEvent.change(passwordInput, { target: { value: "abcdef" } }); 
    fireEvent.click(nextButton); 
  
   
    await waitFor(() => {

      expect(screen.getByTestId("errorPass")).toHaveTextContent(
        /Must contain 6 characters, one uppercase, one lowercase, one number, and one special character/i
      );
    });
});






test('redirects to the dashboard on valid form submission', async () => {
  const mockPush = jest.fn();
  useRouter.mockImplementation(() => ({ push: mockPush }));

  render(<Login />);

  const emailInput = screen.getByTestId("email");
  await userEvent.type(emailInput, 'arati@gmail.com'); 

  const passwordInput = screen.getByTestId("pass");
  await userEvent.type(passwordInput, 'Valid123!'); 

  const nextButton = screen.getByTestId('nextButton');
  fireEvent.click(nextButton); 

  
  await waitFor(() => {
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });
});