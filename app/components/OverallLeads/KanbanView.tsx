


import { LeadCard } from "../../microComponents/LeadCard";
import { columns } from "./data";

 
  
  export default function KanbanView() {
    return (
      <main className="p-6 rounded-lg">
        <div className="flex flex-col md:flex-row gap-6 o rounded-lg ">
          {columns.map((column, columnIndex) => (
            
            <div 
              key={`column-${columnIndex}`}
              className="flex-1 w-[300px] h-auto bg-gray-50 rounded-lg shadow-custom mx-2"
            >
              <h2 className="text-xl font-semibold mb-4 text-white bg-indigo-500 p-3 rounded-t-lg border">
                {column.title}
              </h2>
              <div className="space-y-2 px-4 py-2 rounded-lg z-100 relative">
                {column.items.map((item) => (
                  <LeadCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    subtitle={item.subtitle}
                
                  />
                ))}
              </div>
            </div>
           
          ))}
        </div>
        <button 
          className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-600 flex items-center justify-center text-2xl"
          aria-label="Add new item"
        >
          +
        </button>
      </main>
    );
  }