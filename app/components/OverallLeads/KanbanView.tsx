

import React, { useEffect, useState } from "react";
import { fetchFromJSONForKanbanView } from "../../api/jsonService/OverallLeadsJsonService";
import "./overallLeads.css";
import { ColumnForKanbanView } from "./OverallLeadsData";
import ColumnComponent from "./KanbanColComp";

const KanbanView: React.FC = () => {
  const [columns, setColumns] = useState<ColumnForKanbanView[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<ColumnForKanbanView[]>([]);
  const [visibleCards, setVisibleCards] = useState<number>(3);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [availableColumns, setAvailableColumns] = useState<ColumnForKanbanView[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<ColumnForKanbanView[]>([]);
  
  const maxColumns = 5;
  const minColumns = 3;

  useEffect(() => {
    const fetchData = async () => {
      const page = 1;
      const pageSize = 100;
      
      const response = await fetchFromJSONForKanbanView(page, pageSize);
      const data = Array.isArray(response) ? response : response;

      const formattedData = data.map((column, index) => ({
        id: `column-${index}`,
        ...column,
      }));
    
      setColumns(formattedData);
      // Initially show only the first 3 columns
      setVisibleColumns(formattedData.slice(0, minColumns));
      // Set the remaining columns as available
      setAvailableColumns(formattedData.slice(minColumns));
    };

    fetchData();
  }, []);

  // Update visibleCards whenever visibleColumns changes
  useEffect(() => {
    setVisibleCards(visibleColumns.length);
  }, [visibleColumns]);

  const handleAddCard = () => {
    if (visibleCards < maxColumns) {
      setShowPopup(true);
      // Reset selected columns when opening popup
      setSelectedColumns([]);
    }
  };

  // Modified to toggle column selection
  const handleColumnSelection = (selectedColumn: ColumnForKanbanView) => {
    setSelectedColumns(prev => {
      // Check if column is already selected
      const isAlreadySelected = prev.some(col => col.id === selectedColumn.id);
      
      if (isAlreadySelected) {
        // Remove it if already selected
        return prev.filter(col => col.id !== selectedColumn.id);
      } else {
        // Add it if not selected
        return [...prev, selectedColumn];
      }
    });
  };
  
  // New function to handle adding multiple selected columns
  const handleAddSelectedColumns = () => {
    if (selectedColumns.length > 0) {
      // Check if adding these columns would exceed the max
      const newTotal = visibleColumns.length + selectedColumns.length;
      const columnsToAdd = selectedColumns.slice(0, maxColumns - visibleColumns.length);
      
      // Add the selected columns to visible columns
      setVisibleColumns(prev => [...prev, ...columnsToAdd]);
      
      // Remove the selected columns from available columns
      setAvailableColumns(prev => 
        prev.filter(col => !columnsToAdd.some(selected => selected.id === col.id))
      );
      
      // Close the popup
      setShowPopup(false);
    }
  };
  
  // Handle column removal
  const handleColumnRemove = (removedColumn: ColumnForKanbanView) => {
    // Add the removed column back to available columns
    setAvailableColumns(prevAvailable => [...prevAvailable, removedColumn]);
  };
  
  const moveCard = (
    draggedId: string,
    sourceColumnId: string,
    targetColumnId: string
  ) => {
    setColumns((prevColumns) => {
      const sourceColumn = prevColumns.find(
        (col) => col.title === sourceColumnId
      );
      const targetColumn = prevColumns.find(
        (col) => col.title === targetColumnId
      );
      if (!sourceColumn || !targetColumn) return prevColumns;

      const cardToMove = sourceColumn.items.find(
        (item) => item.id === draggedId
      );
      if (!cardToMove) return prevColumns;

      const updatedSource = {
        ...sourceColumn,
        items: sourceColumn.items.filter((item) => item.id !== draggedId),
      };

      const updatedTarget = {
        ...targetColumn,
        items: [...targetColumn.items, cardToMove],
      };

      return prevColumns.map((col) => {
        if (col.title === sourceColumnId) return updatedSource;
        if (col.title === targetColumnId) return updatedTarget;
        return col;
      });
    });
  };

  const cardWidth = `${80 / visibleCards}%`;

  // Check if a column is selected
  const isColumnSelected = (columnId: string) => {
    return selectedColumns.some(col => col.id === columnId);
  };

  return (
    <main className="p-6 rounded-lg relative">
      <div
        className="flex gap-6 rounded-lg justify-center pb-6 w-full overflow-auto scrollbar-none"
        style={{
          width: "100%",
          scrollBehavior: "smooth",
          flexDirection: window.innerWidth < 768 ? "column" : "row", 
          maxHeight: window.innerWidth < 768 ? "80vh" : "auto", 
        }}
      >
      
      {Array.isArray(visibleColumns) && visibleColumns.length > 0 ? (
          visibleColumns.map((column, columnIndex) => (
            <ColumnComponent
              key={columnIndex}
              column={{
                ...column,
                onRemove: handleColumnRemove, // Add callback for column removal
              }}
              moveCard={moveCard}
              cardWidth={cardWidth}
              visibleCards={visibleCards}
              minColumns={minColumns}
              setColumns={setColumns}
              setVisibleCards={setVisibleCards}
              setVisibleColumns={setVisibleColumns} // Pass the setter for visibleColumns
            />
          ))
        ) : (
          <p>No columns available</p>
        )}
      </div>

      {visibleCards < maxColumns && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleAddCard}
            className="plus_icon bg-bg-blue-12 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
            aria-label="Add new item"
          >
            +
          </button>
        </div>
      )}

      {/* Column Selection Popup with Checkboxes */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Add Columns</h3>
              <button 
                onClick={() => setShowPopup(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">Select Stages to add to your view:</p>
            
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {availableColumns.length > 0 ? (
                availableColumns.map((column) => (
                  <label 
                    key={column.id}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors flex items-center"
                  >
                    <input
                      type="checkbox"
                      className="mr-3 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={isColumnSelected(column.id)}
                      onChange={() => handleColumnSelection(column)}
                    />
                   
                    <span className="font-medium text-bg-blue-12">{column.title}</span>
                  </label>
                ))
              ) : (
                <p className="text-gray-500 text-center py-2">No more columns available</p>
              )}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowPopup(false)}
                className="mr-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSelectedColumns}
                className={`px-4 py-2 rounded-lg ${
                  selectedColumns.length > 0 
                    ? "bg-bg-blue-12 text-white hover:bg-blue-700" 
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={selectedColumns.length === 0}
              >
                Add Selected ({selectedColumns.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default KanbanView;