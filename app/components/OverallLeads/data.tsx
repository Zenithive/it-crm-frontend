
  
export const columns = [
  {
    title: 'New Lead',
    items: Array.from({ length: 5 }, (_, i) => ({
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

