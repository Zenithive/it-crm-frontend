


interface ColumnDef {
  headerName: string;
  field: string;
  sortable: boolean;
  filter: boolean;
  flex: number;
  cellRenderer: string;
}





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


