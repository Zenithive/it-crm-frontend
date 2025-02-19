import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import CRMDashboard from '../app/components/Dashboard';
import Dashboard_Title from '../app/components/Dashboard/Dashboard_Title';
import Task from '../app/components/Dashboard/Task';
import Meetings from '../app/components/Dashboard/Meetings';
import MonthlyLead from '../app/components/Dashboard/MonthlyLead';
import UnreadMessages from '../app/components/Dashboard/UnreadMessages';
import TotalLeadLine from '../app/components/Dashboard/TotalLeadLine';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../app/redux/slice/authSlice';



describe('CRMDashboard', () => {

  const mockStore = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: { name: 'Test User', role: 'admin' },
        isAuthenticated: true,
      },
    },
  });
  test('renders main dashboard layout', () => {
    render(
    
    <Provider store={mockStore}><CRMDashboard/></Provider>
    );
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  test('contains all major sections',async() => {
    await act(async () => {
      render(<Provider store={mockStore}><CRMDashboard/></Provider>);
    });
    expect(screen.getByTestId('dashboard-title')).toBeInTheDocument();
    expect(screen.getByTestId('task-section')).toBeInTheDocument();
    expect(screen.getByTestId('meetings-section')).toBeInTheDocument();
    expect(screen.getByTestId('monthly-lead-section')).toBeInTheDocument();
    expect(screen.getByTestId('unread-messages-section')).toBeInTheDocument();
  });
});

describe('Dashboard_Title', () => {

  const mockDashboardTitle = [{ titleName: 'CRM Dashboard' }];

  test('renders dashboard title correctly', async() => {
    await act(async () => {
      
      render(<Dashboard_Title Dashboardtitle={mockDashboardTitle}/>);
    });
   
    expect(screen.getByText(/CRM Dashboard/i)).toBeInTheDocument();
   
  });

  test('displays current time and location', () => {
    render(<Dashboard_Title Dashboardtitle={mockDashboardTitle}/>);
    expect(screen.getByAltText('flag')).toBeInTheDocument();
    expect(screen.getByText(/12:00 PM/)).toBeInTheDocument();
  });

  test('has functional lead button', () => {
    render(<Dashboard_Title  Dashboardtitle={mockDashboardTitle}/>);
    const leadButton = screen.getByText('Lead');
    expect(leadButton).toBeInTheDocument();

  });
});

  describe('Task Component', () => {

    const tasks = [
      { title: 'Test Task 1', dueTime: '2025-02-10 10:00' },
      { title: 'Test Task 2', dueTime: '2025-02-11 12:00' }
    ];
  
    test('renders task checkboxes in today view', () => {
      render(<Task tasks={tasks} />);
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });
  
    test('handles task completion', () => {
      render(<Task tasks={tasks} />);
      const checkbox = screen.getAllByRole('checkbox')[0];
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });
  });

describe('Meetings Component', () => {
  test('toggles between today and recent meetings', async () => {
    render(<Meetings />);
    
   
    expect(screen.getByText('Today')).toHaveClass('border-[#6366F1]');
    
    
    fireEvent.click(screen.getByText('Recent'));
    await waitFor(() => {
      expect(screen.getByText('Recent')).toHaveClass('border-[#6366F1]');
    });
  })

  test('displays join buttons for today\'s meetings', () => {
    render(<Meetings />);
    const joinButtons = screen.getAllByText('Meetings');
    expect(joinButtons.length).toBeGreaterThan(0);
    joinButtons.forEach(button => {
      expect(button).toHaveClass('text-black');
    });
  });
});

describe('MonthlyLead Component', () => {
  test('renders pie chart with correct sections', () => {
    render(<MonthlyLead />);
    expect(screen.getByText('Total Monthly Lead')).toBeInTheDocument();
    expect(screen.getByText('Closed')).toBeInTheDocument();
    expect(screen.getByText('Prospect')).toBeInTheDocument();
    expect(screen.getByText('Lead')).toBeInTheDocument();
  });

})

describe('UnreadMessages Component', () => {
  test('renders unread messages list', () => {
    render(<UnreadMessages />);
    expect(screen.getByText('Unread Messages')).toBeInTheDocument();
  });

  // test('displays message previews correctly', () => {
  //   render(<UnreadMessages />);
  //   const messageImages = screen.getAllByAltText(/^.*$/);
  //   expect(messageImages.length).toBeGreaterThan(0);
  // });
});

describe('TotalLeadLine Component', () => {
  test('renders line chart with correct sources', () => {
    render(<TotalLeadLine />);
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('Upwork')).toBeInTheDocument();
    expect(screen.getByText('Website Form')).toBeInTheDocument();
  });

  test('displays chart legend correctly', () => {
    render(<TotalLeadLine />);
    const sources = ['LinkedIn', 'Upwork', 'Website Form'];
    sources.forEach(source => {
      expect(screen.getByText(source)).toBeInTheDocument();
    });
  });
});