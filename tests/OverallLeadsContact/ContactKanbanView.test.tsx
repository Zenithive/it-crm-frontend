import { render, screen } from '@testing-library/react';
import KanbanView from '../../app/components/OverallLeads/KanbanView';

describe('kanbanView', () => {

    
    test('renders main kanbanview layout', () => {
      render(
      
  <KanbanView/>
      );
      expect(screen.getByRole('main')).toBeInTheDocument();
    });
  
    // test('contains all major sections',async() => {
    //   await act(async () => {
    //     render(<Provider store={mockStore}><CRMDashboard/></Provider>);
    //   });
    //   expect(screen.getByTestId('dashboard-title')).toBeInTheDocument();
    //   expect(screen.getByTestId('task-section')).toBeInTheDocument();
    //   expect(screen.getByTestId('meetings-section')).toBeInTheDocument();
    //   expect(screen.getByTestId('monthly-lead-section')).toBeInTheDocument();
    //   expect(screen.getByTestId('unread-messages-section')).toBeInTheDocument();
    // });
  });
  