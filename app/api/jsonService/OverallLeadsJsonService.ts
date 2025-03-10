
import overallLeadsListViewDummyData from "../../dummyData/overallLeadsListViewDummyData.json";
import kanbanData from "../../dummyData/overallLeadsKanbanViewDummyData.json";
export const fetchFromJSONForListView = async () => {
  return overallLeadsListViewDummyData; 
};


export const fetchFromJSONForKanbanView = async (page:number, pageSize:number) => {
    return kanbanData; 
  };
  