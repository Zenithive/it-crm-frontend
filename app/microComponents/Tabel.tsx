import React from 'react';
import { Table, Button } from 'antd';
import { FilterFilled } from '@ant-design/icons';
import 'antd/dist/reset.css';



const MicroTable = ({ rowData, columnDefs }) => {
    const columns = columnDefs.map((col) => ({
        title: col.headerName,
        dataIndex: col.field,
        key: col.field,
        render: col.cellRenderer === 'stageCellRenderer' ? (text) => {
            let colorClass = "";
            let bgColorClass = "";
            
            switch (text?.toLowerCase()) {
                case 'new lead':
                    colorClass = 'text-green-700';
                    bgColorClass = 'bg-green-100';
                    break;
                case 'qualified':
                    colorClass = 'text-yellow-700';
                    bgColorClass = 'bg-yellow-100';
                    break;
                case 'negotiator':
                    colorClass = 'text-red-700';
                    bgColorClass = 'bg-red-100';
                    break;
                default:
                    colorClass = 'text-gray-700';
                    bgColorClass = 'bg-gray-100';
            }
            
            return (
                <span className={`inline-block px-4 py-1 ${colorClass} ${bgColorClass} font-semibold text-opacity-70 rounded-md`}>
                    {text}
                </span>
            );
        } : (text) => (
            <div className="flex items-center justify-center w-full h-full font-semibold">
                {text}
            </div>
        ),
        align: 'center',
        filterDropdown: true,
        
        filterIcon: (filtered) => (
        
            <img src='/filterwhite.svg' className=""/>
        ),
    }));

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 overflow-x-auto p-6">
            <style jsx global>{`
                .custom-ant-table {
                    // box-shadow: 0 9px 8px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

                    border-radius: 8px;
                }
                .custom-ant-table .ant-table {
                    border-radius: 8px;
                  
                
                }
                    
                .custom-ant-table .ant-table-thead > tr > th {
                    border-right: none !important;
                    background: #4f46e5 !important;
                    color: white !important;
                }
                .custom-ant-table .ant-table-thead > tr > th::before {
                    display: none !important;
                }
                .custom-ant-table .ant-table-tbody > tr > td {
                    border-bottom: 1px solid #f0f0f0;
                }
                .custom-ant-table .ant-table-tbody > tr:last-child > td {
                    border-bottom: 1px solid #f0f0f0 !important;
                }
                .custom-ant-table .ant-table-cell-fix-right {
                    background: white !important;
                }
            `}</style>
            <Table
                dataSource={rowData}
                columns={columns}
                pagination={{ pageSize: 5 }}
                rowKey={(record) => record.id || Math.random()}
                scroll={{ x: 'max-content' }}
                className="custom-ant-table s"
            />
        </div>
    );
};

export default MicroTable;






// import { Table, Tag } from 'antd';
// import 'antd/dist/reset.css';

// const MicroTable = () => {
//   const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//       className: 'font-medium',
//     },
//     {
//       title: 'Company',
//       dataIndex: 'company',
//       key: 'company',
//     },
//     {
//       title: 'Stage',
//       dataIndex: 'stage',
//       key: 'stage',
//       render: (stage) => {
//         let color = 'green';
//         if (stage === 'Qualified') color = 'yellow';
//         if (stage === 'Negotiation') color = 'red';
        
//         return (
//           <Tag
//             color={color}
//             className="rounded-md px-3 py-1"
//           >
//             {stage}
//           </Tag>
//         );
//       },
//     },
//     {
//       title: 'Owner',
//       dataIndex: 'owner',
//       key: 'owner',
//     },
//     {
//       title: 'Source',
//       dataIndex: 'source',
//       key: 'source',
//     },
//     {
//       title: 'Type',
//       dataIndex: 'type',
//       key: 'type',
//     },
//     {
//       title: 'Campaign',
//       dataIndex: 'campaign',
//       key: 'campaign',
//     },
//   ];

//   const data = [
//     {
//       key: '1',
//       name: 'Sachin T',
//       company: 'Tech Corp',
//       stage: 'New Lead',
//       owner: 'Zenithive',
//       source: 'Website',
//       type: 'Enterprise',
//       campaign: 'US Campaign',
//     },
//     {
//       key: '2',
//       name: 'Sachin T',
//       company: 'Tech Corp',
//       stage: 'Qualified',
//       owner: 'Zenithive',
//       source: 'Referral',
//       type: 'Enterprise',
//       campaign: 'Hiring Campaign',
//     },
//     {
//       key: '3',
//       name: 'Sachin T',
//       company: 'Tech Corp',
//       stage: 'Negotiation',
//       owner: 'Zenithive',
//       source: 'LinkedIn',
//       type: 'Enterprise',
//       campaign: 'US Campaign',
//     },
//     {
//       key: '4',
//       name: 'Sachin T',
//       company: 'Tech Corp',
//       stage: 'New Lead',
//       owner: 'Zenithive',
//       source: 'Up-work',
//       type: 'Enterprise',
//       campaign: 'Hiring Campaign',
//     },
//     {
//       key: '5',
//       name: 'Sachin T',
//       company: 'Tech Corp',
//       stage: 'New Lead',
//       owner: 'Zenithive',
//       source: 'Up-work',
//       type: 'Enterprise',
//       campaign: 'US Campaign',
//     },
//     {
//       key: '6',
//       name: 'Sachin T',
//       company: 'Tech Corp',
//       stage: 'New Lead',
//       owner: 'Zenithive',
//       source: 'Up-work',
//       type: 'Enterprise',
//       campaign: 'Hiring Campaign',
//     },
//   ];

//   return (
//     <div className="p-6">
//       <Table 
//         columns={columns} 
//         dataSource={data} 
        
//         className="shadow-lg rounded-lg overflow-hidden custome-ant-table"
//         // components={{
//         //   header: {
//         //     cell: (props) => (
//         //       <th
//         //         {...props}
//         //         className="bg-bg-blue-12 text-white font-medium py-4 px-4"
//         //       />
//         //     ),
//         //   },
//         // }}
//       />
//     </div>
//   );
// };

// export default MicroTable;