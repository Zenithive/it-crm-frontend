import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { MicroTablePropsForListView } from "./InterfaceAndTypeData";

import { useRouter } from "next/navigation"; 


interface Resource {
  leadID:string;
}

const MicroTable: React.FC<MicroTablePropsForListView> = ({
  rowData,
  columnDefs,
}) => {
  // console.log(`columnDefs`, columnDefs);
  console.log(`rowData`, rowData);
  const [ready, setReady] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!ready) {
    return <div className="text-center p-6">Loading table...</div>;
  }

  const handleResourceClick = (resource: any) => {
    const leadID = encodeURIComponent(resource.leadID);
    console.log("Resource id", leadID);
    window.open(`/individual/${leadID}`, "_blank"); 
  };
  
  const columns = columnDefs.map((col) => ({
    dataIndex: col.field,
    key: col.field,
    title: (
      <div className="flex items-center justify-center gap-1">
        {col.headerName}
        <img src="/sort.svg" className="w-4 h-4 ml-2" alt="Sort" />
      </div>
    ),
    render: (text: any, record: any) => {
      switch (col.field) {
        case "name":
          return (
            <a
              href={`/individual/${encodeURIComponent(record.leadID)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:text-bg-blue-12 font-medium"
            >
              {`${record.firstName} ${record.lastName}`}
            </a>
          );

        case "company":
          return record.organization?.organizationName || "N/A";

        case "stage":
          let colorClass = "";
          let bgColorClass = "";

          switch (record.leadStage?.toLowerCase()) {
            case "new":
              colorClass = "text-blue-700";
              bgColorClass = "bg-blue-100";
              break;
            case "qualified":
              colorClass = "text-green-700";
              bgColorClass = "bg-green-100";
              break;
            case "negotiator":
              colorClass = "text-orange-700";
              bgColorClass = "bg-orange-100";
              break;
            case "closed lost":
              colorClass = "text-red-700";
              bgColorClass = "bg-red-100";
              break;
            case "closed won":
              colorClass = "text-green-700";
              bgColorClass = "bg-green-100";
              break;
            default:
              colorClass = "text-gray-700";
              bgColorClass = "bg-gray-100";
          }

          return (
            <span
              className={`inline-block px-4 py-1 ${colorClass} ${bgColorClass} font-semibold text-opacity-70 rounded-md`}
            >
              {record.leadStage}
            </span>
          );

        case "owner":
          return record.leadAssignedTo?.name || "Unassigned";

        case "source":
          return record.leadSource || "N/A";

        case "type":
          return (
            <span className="inline-block px-4 py-1 text-blue-700 bg-blue-100 font-semibold text-opacity-70 rounded-md">
            {record.leadType || "N/A"}
            </span>
           
          );

        case "campaign":
          if (typeof record.campaign === "object" && record.campaign !== null) {
            return (
              <div className="flex flex-col items-center">
                <span className="font-semibold">{record.campaign.campaignName}</span>
                <span className="text-gray-500 text-sm">{record.campaign.campaignCountry}</span>
              </div>
            );
          }
          return "N/A";

        case "last_activity":
          return (
            <div className="flex items-center justify-center space-x-2 gap-2">
              <span className="text-sm text-black font-semibold">CALL</span>
              <img src="/call.svg" alt="Call" className="w-6 h-6" />
            </div>
          );

        default:
          return (
            <div className="flex items-center justify-center w-full h-full font-semibold">
              {typeof text === "object" ? JSON.stringify(text) : text}
            </div>
          );
      }
    },
    align: "center" as "center",
  }));

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 overflow-x-auto p-6">
      <Table
        dataSource={rowData}
        columns={columns}
        pagination={false}
        rowKey={(record) => record.id || Math.random()}
        scroll={{ x: "max-content" }}
        className="custom-ant-table"
      />
    </div>
  );
};

export default MicroTable;
