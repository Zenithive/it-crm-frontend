export type LeadCardDnDProps = {
  id: string;
  title: string;
  subtitle: string;
  data: {
    
    firstName: string;
    lastName: string;
    linkedIn: string;
    country: string;
    phone: string;
    leadNotes:string;
    leadType:string;
    leadSource: string;
    initialContactDate: string;
    leadAssignedTo: string;
    leadPriority: string;
    organizationID: string;
    campaignID: string;
  };
  index: number;
  columnId: string;
  moveCard: (
    draggedId: string,
    sourceColumnId: string,
    targetColumnId: string
  ) => void;
};
interface FilterPayload {
  filter: {
    [key: string]: string | undefined; // Dynamic filter keys
  };
  pagination: {
    page: number;
    pageSize: number;
  };
  sort: {
    field: string;
    order: string;
  };
}
interface ColumnDefForListTabel {
  headerName: string;
  field: string;
  sortable: boolean;
  filter: boolean;
  flex: number;
  cellRenderer: string;
}

export const columnDefs: ColumnDefForListTabel[] = [
  {
    headerName: "Name",
    field: "name",
    sortable: true,
    filter: true,
    cellRenderer: "customCellRenderer",
    flex: 1,
  },
  {
    headerName: "Company",
    field: "company",
    sortable: true,
    filter: true,
    flex: 1,
    cellRenderer: "customCellRenderer",
  },
  {
    headerName: "Stage",
    field: "stage",
    sortable: true,
    filter: true,
    cellRenderer: "stageCellRenderer",
    flex: 1,
  },
  {
    headerName: "Owner",
    field: "owner",
    sortable: true,
    filter: true,
    flex: 1,
    cellRenderer: "customCellRenderer",
  },
  {
    headerName: "Source",
    field: "source",
    sortable: true,
    filter: true,
    flex: 1,
    cellRenderer: "customCellRenderer",
  },
  {
    headerName: "Type",
    field: "type",
    sortable: true,
    filter: true,
    flex: 1,
    cellRenderer: "customCellRenderer",
  },
  {
    headerName: "Campaign",
    field: "campaign",
    sortable: true,
    filter: true,
    flex: 1,
    cellRenderer: "customCellRenderer",
  },
  {
    headerName: "Last Activity",
    field: "last_activity",
    sortable: true,
    filter: true,
    flex: 1,
    cellRenderer: "customCellRenderer",
  },
];

interface DataforHeaderComp {
  title?: string;
  Listlogo?: string;
  Kanbanlogo?: string;
  searchText?: string;
}

export type ViewType = "list" | "kanban";

export type HeaderProps = {
  data: DataforHeaderComp;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onAddLead?: () => void;
  // onFilter?: () => void;
  onFilter?: (payload: FilterPayload) => void;
  onViewChange?: (view: ViewType) => void;
  
};

type ItemForKanbanView = {
  id: string;
  title: string;
  subtitle: string;
};
export interface ColumnForKanbanView {
  id: string;
  title: string;
  number: number;
  items: {
    id: string;
    title: string;
    subtitle: string;
  }[];
}

export type ColumnPropsForKanban = {
  column: ColumnForKanbanView;
  moveCard: (
    draggedId: string,
    sourceColumnId: string,
    targetColumnId: string
  ) => void;
  cardWidth: string;
  visibleCards: number;
  minColumns: number;
  setColumns: React.Dispatch<React.SetStateAction<ColumnForKanbanView[]>>;
  setVisibleCards: React.Dispatch<React.SetStateAction<number>>;  
 
};
