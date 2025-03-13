import React from 'react';
import ResourceLayout from './ResourceManagment/ResourceLayout';

interface ResourceManagmentProps {
  ResourceId: string;
}

const ResourceManagment: React.FC<ResourceManagmentProps> = ({ ResourceId }) => {
  
  return (
    <div>
      <ResourceLayout ResourceId={ResourceId} children={undefined} />
    </div>
  );
}

export default ResourceManagment;
