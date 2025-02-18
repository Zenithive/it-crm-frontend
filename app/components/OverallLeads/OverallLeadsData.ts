// types.ts
interface ColumnItem {
  id: string;
  title: string;
  subtitle: string;
}

interface Column {
  title: string;
  number: number;
  items: ColumnItem[];
}

interface ColumnDef {
  headerName: string;
  field: string;
  sortable: boolean;
  filter: boolean;
  flex: number;
  cellRenderer: string;
}

interface Data {
  name: string;
  company: string;
  stage: string;
  owner: string;
  source: string;
  type: string;
  campaign: string;
  profileImage: string;
  last_activity: string;
}


export const columns: Column[] = [
  {
    title: 'New Lead',
    number: 20,
    items: Array.from({ length: 10 }, (_, i) => ({
      id: `new-${i + 1}`,
      title: 'Aryan K',
      subtitle: 'Tech Corp',
    })),
  },
  {
    title: 'Qualified',
    number: 60,
    items: Array.from({ length: 3 }, (_, i) => ({
      id: `qualified-${i + 1}`,
      title: 'Aryan K',
      subtitle: 'Tech Corp',
    })),
  },
  {
    title: 'Negotiation',
    number: 40,
    items: Array.from({ length: 5 }, (_, i) => ({
      id: `negotiation-${i + 1}`,
      title: 'Aryan K',
      subtitle: 'Tech Corp',
    })),
  },
  {
    title: 'Closed Win',
    number: 10,
    items: Array.from({ length: 5 }, (_, i) => ({
      id: `closed-win-${i + 1}`,
      title: 'Aryan K',
      subtitle: 'Tech Corp',
    })),
  },
  {
    title: 'Lost',
    number: 9,
    items: Array.from({ length: 5 }, (_, i) => ({
      id: `lost-${i + 1}`,
      title: 'Aryan K',
      subtitle: 'Tech Corp',
    })),
  },
];

export const columnDefs: ColumnDef[] = [
  { headerName: 'Name', field: 'name', sortable: true, filter: true, cellRenderer: 'customCellRenderer', flex: 1 },
  { headerName: 'Company', field: 'company', sortable: true, filter: true, flex: 1, cellRenderer: 'customCellRenderer' },
  { headerName: 'Stage', field: 'stage', sortable: true, filter: true, cellRenderer: 'stageCellRenderer', flex: 1 },
  { headerName: 'Owner', field: 'owner', sortable: true, filter: true, flex: 1, cellRenderer: 'customCellRenderer' },
  { headerName: 'Source', field: 'source', sortable: true, filter: true, flex: 1, cellRenderer: 'customCellRenderer' },
  { headerName: 'Type', field: 'type', sortable: true, filter: true, flex: 1, cellRenderer: 'customCellRenderer' },
  { headerName: 'Campaign', field: 'campaign', sortable: true, filter: true, flex: 1, cellRenderer: 'customCellRenderer' },
  { headerName: 'Last Activity', field: 'last_activity', sortable: true, filter: true, flex: 1, cellRenderer: 'customCellRenderer' },
];

export const dataOf: Data[] = [
  {
    name: 'Aryan K',
    company: 'TechCorp',
    stage: 'Qualified',
    owner: 'Zenithive',
    source: 'Website',
    type: 'Enterprise',
    campaign: 'Xyz',
    profileImage: 'profileLogo.svg',
    last_activity: 'gmail|12/05/2022',
  },
];
