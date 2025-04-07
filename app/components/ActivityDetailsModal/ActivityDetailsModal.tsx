import React, { useState, useEffect } from 'react';

interface ChangeDetail {
  field: string;
  oldValue: any;
  newValue: any;
}

interface ActivityDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  oldData?: string;
  newData?: string;
  title?: string;
}

const ActivityDetailsModal: React.FC<ActivityDetailsModalProps> = ({
  isOpen,
  onClose,
  oldData,
  newData,
  title = "Activity Details"
}) => {
  const [changes, setChanges] = useState<ChangeDetail[]>([]);

  useEffect(() => {
    if (oldData && newData) {
      try {
        const oldDataObj = JSON.parse(oldData);
        const newDataObj = JSON.parse(newData);
        
        const changesArray = compareObjects(oldDataObj, newDataObj);
        setChanges(changesArray);
      } catch (error) {
        console.error("Error parsing data:", error);
        setChanges([]);
      }
    }
  }, [oldData, newData]);

  // Function to compare two objects and return an array of differences
  const compareObjects = (oldObj: any, newObj: any, prefix = ""): ChangeDetail[] => {
    const changes: ChangeDetail[] = [];
    
    // Skip comparison for certain fields
    const skipFields = ["activities", "creator", "assignee", "organization", "campaign"];
    
    // Check all keys in the new object
    for (const key in newObj) {
      // Skip specific fields and nested objects
      if (skipFields.includes(key) || typeof newObj[key] === 'object' && newObj[key] !== null) {
        continue;
      }
      
      const fieldName = prefix ? `${prefix}.${key}` : key;
      
      // Check if the key exists in both objects and has different values
      if (oldObj.hasOwnProperty(key) && oldObj[key] !== newObj[key]) {
        changes.push({
          field: formatFieldName(fieldName),
          oldValue: oldObj[key],
          newValue: newObj[key]
        });
      }
    }
    
    return changes;
  };
  
  // Function to format field names for display
  const formatFieldName = (field: string): string => {
    // Convert camelCase to Title Case with spaces
    return field
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  // Format date values
  const formatValue = (value: any): string => {
    if (typeof value === 'string' && value.includes('T00:00:00Z')) {
      // Format date strings
      return new Date(value).toLocaleDateString();
    }
    return String(value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-semibold text-bg-blue-12">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 max-h-96 overflow-y-auto">
          {changes.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2 text-left">Field</th>
                  <th className="p-2 text-left">Previous Value</th>
                  <th className="p-2 text-left">New Value</th>
                </tr>
              </thead>
              <tbody>
                {changes.map((change, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-2 border-t">{change.field}</td>
                    <td className="p-2 border-t text-red-500">{formatValue(change.oldValue)}</td>
                    <td className="p-2 border-t text-green-500">{formatValue(change.newValue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500 py-4">No changes detected or data could not be parsed.</p>
          )}
        </div>
        
        <div className="p-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailsModal;