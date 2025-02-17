


import { LeadCard } from "../../microComponents/LeadCard";
import Pagination from "../../microComponents/Pagination";
import { columns } from "./data";

 
  
  export default function KanbanView() {
    return (<>
      <main className="p-6 rounded-lg relative">
        <div className="flex flex-col md:flex-row gap-6 rounded-lg justify-center  ">
          {columns.map((column, columnIndex) => (
            
            <div 
              key={`column-${columnIndex}`}
              className=" min-w-[350px] h-[500px] bg-gray-50 rounded-lg shadow-prim mx-2 overflow-y-auto scrollbar-none "
            >
              <h2 className="text-xl font-semibold mb-4 text-white bg-bg-blue-12 p-3 rounded-t-lg border sticky top-0 z-50 ">
                {column.title}
              </h2>
              <div className="space-y-2 px-4 py-2 rounded-lg relative">
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
        <div className="flex justify-center">

        <button 
          className="md:absolute mt-10 md:mt-0 top-1/2 md:right-6 transform -translate-y-1/2 w-9 h-9 md:w-14 md:h-14 bg-bg-blue-12 text-white rounded-[12px] shadow-lg hover:bg-indigo-600 flex items-center justify-center text-xl md:text-2xl"
          aria-label="Add new item"
        >
          +
        </button>

        </div>
   
        
      </main>


<div className="flex justify-between items-center p-4  bott rounded-lg">
<Pagination
  totalItems={10}
  initialItemsPerPage={3}
//   onPageChange={(page) => setCurrentPage(page)}
  onItemsPerPageChange={(newItemsPerPage) => {
    // setItemsPerPage(newItemsPerPage);
    // setCurrentPage(1);
  }}
/>
</div> 
      </>
    );
  }