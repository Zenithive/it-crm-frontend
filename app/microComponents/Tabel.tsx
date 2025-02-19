



import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { MicroTablePropsForListView } from './InterfaceAndTypeData';




const MicroTable: React.FC<MicroTablePropsForListView> = ({ rowData, columnDefs }) => {
    const [ready, setReady] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => setReady(true), 100);
        return () => clearTimeout(timer);
    }, []);

    if (!ready) {
        return <div className="text-center p-6">Loading table...</div>;
    }

    const columns = columnDefs.map((col) => ({
        dataIndex: col.field,
        key: col.field,
        title: (
            <div className="flex items-center justify-center gap-1">
                {col.headerName}
                <img src="/sort.svg" className="w-4 h-4 ml-2" alt="Sort" />
            </div>
        ),
        render: (text: string) => {
            if (col.field === 'stage') {
                let colorClass = '';
                let bgColorClass = '';

                switch (text?.toLowerCase()) {
                    case 'new lead':
                        colorClass = 'text-blue-700';
                        bgColorClass = 'bg-blue-100';
                        break;
                    case 'qualified':
                        colorClass = 'text-bg-green';
                        bgColorClass = 'bg-bg-green-light';
                        break;
                    case 'negotiator':
                        colorClass = 'text-orange-11';
                        bgColorClass = 'bg-orange-light-11';
                        break;
                    case 'closed lost':
                        colorClass = 'text-red-dark';
                        bgColorClass = 'bg-red-light';
                        break;
                    case 'closed won':
                        colorClass = 'text-green-dark';
                        bgColorClass = 'bg-green-light';
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
            } else if (col.field === 'type') {
                let typeColorClass = '';
                let typeBgColorClass = '';

                switch (text?.toLowerCase()) {
                    case 'enterprise':
                        typeColorClass = 'text-green-700';
                        typeBgColorClass = 'bg-green-100';
                        break;
                    case 'small':
                        typeColorClass = 'text-blue-700';
                        typeBgColorClass = 'bg-blue-100';
                        break;
                    case 'medium':
                        typeColorClass = 'text-orange-11';
                        typeBgColorClass = 'bg-yellow-100';
                        break;
                    default:
                        typeColorClass = 'text-gray-700';
                        typeBgColorClass = 'bg-gray-100';
                }

                return (
                    <span className={`inline-block px-4 py-1 ${typeColorClass} ${typeBgColorClass} font-semibold text-opacity-70 rounded-md`}>
                        {text}
                    </span>
                );
            } else if (col.field === 'last_activity') {
                if (!text) return null;

                const [activityType, activityTime] = text.split('|');
                let iconSrc = '';
                switch (activityType?.toLowerCase()) {
                    case 'gmail':
                        iconSrc = '/gmail.svg';
                        break;
                    case 'phonecall':
                        iconSrc = '/call.svg';
                        break;
                    case 'googlemeet':
                        iconSrc = '/meetgoogle.svg';
                        break;
                    default:
                        iconSrc = '/gmail.svg';
                }

                return (
                    <div className="flex items-center justify-center space-x-2 gap-2">
                        <div className="flex flex-col items-start">
                            <span className="text-sm text-black font-semibold">{activityTime}</span>
                        </div>
                        <img src={iconSrc} alt={activityType} className="w-6 h-6" />
                    </div>
                );
            }

            return (
                <div className="flex items-center justify-center w-full h-full font-semibold">
                    {text}
                </div>
            );
        },
        align: 'center' as 'center',
    }));

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 overflow-x-auto p-6">
         

            <Table
                dataSource={rowData}
                columns={columns}
                pagination={{ pageSize: 5 }}
                rowKey={(record) => record.id || Math.random()}
                scroll={{ x: 'max-content' }}
                className="custom-ant-table"
            />
        </div>
    );
};

export default MicroTable;
