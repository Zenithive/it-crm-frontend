
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Login from '../app/components/Login';
import '@testing-library/jest-dom';

import userEvent from "@testing-library/user-event";
import { useRouter } from 'next/navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import authReducer from '../app/redux/slice/authSlice';
import { useLoginUser } from "../graphQl/functions/login.function";

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));


const mockStore = createStore(authReducer);
 

jest.mock("../graphQl/functions/login.function", () => ({
  useLoginUser: jest.fn().mockReturnValue({
    loginUser: jest.fn(),
    error: null,
    reset: jest.fn(),})
  }));

test('renders login form and components', () => {

  render(
    <Provider store={mockStore}>
      <Login />
    </Provider>
  );
  // render(<Login />);

  
 

 

 
  expect(screen.getByText('Email')).toBeInTheDocument();
  expect(screen.getByText('Password')).toBeInTheDocument();

  expect(screen.getByText('Next')).toBeInTheDocument();
  expect(screen.getByText('Login with Google')).toBeInTheDocument();
  expect(screen.getByText('Login with LinkedIn')).toBeInTheDocument();
});


test('displays email validation error on invalid email', async () => {
  
  const mockPush = jest.fn();
  mockImplementation(() => ({ push: mockPush }));

  render(
    <Provider store={mockStore}>
      <Login />
    </Provider>
  );

  

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
  const mockPush = jest.fn();
  useRouter.mockImplementation(() => ({ push: mockPush }));
  render(
    <Provider store={mockStore}>
      <Login />
    </Provider>
  );




  const emailInput = screen.getByTestId('email');
  await userEvent.type(emailInput, 'a@gmail.com');  

 
  const passwordInput = screen.getByTestId('pass');
  await userEvent.type(passwordInput, "a");

 
  const nextButton = screen.getByTestId('nextButton');
  fireEvent.click(nextButton); 


 

  await waitFor(() => {
    expect(screen.getByTestId("errorPass")).toHaveTextContent(/Should be at least 6 characters/i);
  });



  await userEvent.type(passwordInput, "abcdef");
    
  
    fireEvent.click(nextButton); 
  
   
    await waitFor(() => {

      expect(screen.getByTestId("errorPass")).toHaveTextContent(
        /Must contain 6 characters, one uppercase, one lowercase, one number, and one special character/i
      );
    });
});






test('redirects to the dashboard on valid form submission', async () => {
  const push = jest.fn(); 


  useRouter.mockReturnValue({ push });

 
 const mockLoginUser = jest.fn().mockResolvedValue({
  token: 'mockToken123',
  user: { email: 'test@example.com' },
});


useLoginUser.mockReturnValue({
  loginUser: mockLoginUser,
  data: null,
  loading: false,
  error: null,
  reset: jest.fn(),
});

render(
  <Provider store={mockStore}>
    <Login />
  </Provider>
);

const emailInput = screen.getByTestId('email');
const passwordInput = screen.getByTestId('pass');
const loginButton = screen.getByTestId('nextButton');

await userEvent.type(emailInput, 'yys@example.com');
await userEvent.type(passwordInput, 'Valid123!');
fireEvent.click(loginButton);


await waitFor(() => expect(mockLoginUser).toHaveBeenCalledWith('yys@example.com', 'Valid123!'));

await waitFor(() => {
  expect(push).toHaveBeenCalledWith('/dashboard');
});
});