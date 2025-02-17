
  
export const columns = [
  {
    title: 'New Lead',
    items: Array.from({ length: 10 }, (_, i) => ({
      id: `new-${i + 1}`,
      title: 'Aryan K',
      subtitle: 'Tech Corp'
    }))
  },
  {
    title: 'Qualified',
    items: Array.from({ length: 3 }, (_, i) => ({
      id: `qualified-${i + 1}`,
      title: 'Aryan K',
      subtitle: 'Tech Corp'
    }))
  },
  {
    title: 'Negotiation',
    items: Array.from({ length: 5 }, (_, i) => ({
      id: `negotiation-${i + 1}`,
      title: 'Aryan K',
      subtitle: 'Tech Corp'
    }))
  }
];


export const columnDefs = [
  { headerName: 'Name', field: 'name', sortable: true, filter: true, cellRenderer: 'customCellRenderer',flex:1 },
  { headerName: 'Company', field: 'company', sortable: true, filter: true,flex:1, cellRenderer: 'customCellRenderer' },
  { headerName: 'Stage', field: 'stage', sortable: true, filter: true, cellRenderer: 'stageCellRenderer',flex:1 },
  { headerName: 'Owner', field: 'owner', sortable: true, filter: true,flex:1, cellRenderer: 'customCellRenderer'  },
  { headerName: 'Source', field: 'source', sortable: true, filter: true,flex:1, cellRenderer: 'customCellRenderer'  },
  { headerName: 'Type', field: 'type', sortable: true, filter: true,flex:1, cellRenderer: 'customCellRenderer'  },
  { headerName: 'Campaign', field: 'campaign', sortable: true, filter: true,flex:1 , cellRenderer: 'customCellRenderer' }
];

export const dataOf = [
  {
    name: 'Aryan K',
    company: 'TechCorp',
    stage: 'New Lead',
    // stage: 'Qualified',
    // stage: 'negotiator',
    owner: 'Zenithive',
    source: 'Website',
    type: 'Enterprise',
    campaign: 'Xyz',
    profileImage: 'profileLogo.svg'
  }
];