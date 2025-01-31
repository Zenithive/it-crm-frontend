
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Login from '.././app/components/Login';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router'; 


jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));



 


test('renders login form and components', () => {
  render(<Login />);

  
 

 

 
  expect(screen.getByLabelText('Email')).toBeInTheDocument();
  expect(screen.getByLabelText('Password')).toBeInTheDocument();

  expect(screen.getByText('Next')).toBeInTheDocument();
  expect(screen.getByText('Login with Google')).toBeInTheDocument();
  expect(screen.getByText('Login with LinkedIn')).toBeInTheDocument();
});


test('displays email validation error on invalid email', async () => {
  render(<Login />);

  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalidemail' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Valid123!' } });
  fireEvent.click(screen.getByText(/next/i));

  
  await waitFor(() => {
    expect(screen.getByText('Please provide a valid email address (example@domain.com)')).toBeInTheDocument();
  });
});

test('displays password validation error on invalid password', async () => {
  render(<Login />);

  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@domain.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
  fireEvent.click(screen.getByText(/next/i));


  await waitFor(() => {
    expect(screen.getByText('Must contain 6 characters, one uppercase, one lowercase, one number, and one special character')).toBeInTheDocument();
  });
});






test('redirects to the dashboard on valid form submission', async () => {
  const mockPush = jest.fn();
  useRouter.mockImplementation(() => ({ push: mockPush }));

  render(<Login />);

  
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@domain.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Valid123!' } });
  fireEvent.click(screen.getByText(/next/i));

  
  await waitFor(() => {
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });
});