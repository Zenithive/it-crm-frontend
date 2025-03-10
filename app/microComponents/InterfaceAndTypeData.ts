

export interface CardPropsForLeadCard {
    id: string;
    title: string;
    subtitle: string;
    className?: string;
  }
  
  export interface PaginationProps {
    totalItems: number;
    initialItemsPerPage?: number;
    onPageChange?: (page: number) => void;
    onItemsPerPageChange?: (itemsPerPage: number) => void;
  }
  
  interface ColumnDefForListViewTabel {
      field: string;
      headerName: string;
      cellRenderer?: string;
  }
  
 export interface MicroTablePropsForListView {
      rowData: any[];
      columnDefs: ColumnDefForListViewTabel[];
  }
  