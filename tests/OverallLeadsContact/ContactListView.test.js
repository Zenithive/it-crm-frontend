import { render, screen } from '@testing-library/react';
import Contact from '../../app/components/OverallLeads/Contact'

describe('listView', () => {

    
    test('renders main contact layout for testing', () => {
      render(
       
           <Contact/>
      );
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });
  
    
  });
  