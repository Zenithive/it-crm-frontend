'use client';
import React from 'react';
import { Card } from '../../microComponents/CardForIndividualDashboard';
import { CardContent } from '../../microComponents/CardContent';
import { CardHeader } from '../../microComponents/CardHeader';
import { CardTitle } from '../../microComponents/CardTitle';


const PipelineMap: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-6">
        <CardTitle className="text-indigo-500">Lead Pipeline Trends</CardTitle>
        <button>
        <img src='filterC.svg' alt="filter" className="w-7 h-7 text-gray-500" />
        </button>
      </CardHeader>
      <div className='border-b border-content-border ml-5 mr-5 mb-4 '></div>
      <CardContent className="p-4">
        <div className="flex justify-center items-center h-64 bg-gray-100  rounded">
          {/* Placeholder for the map - in a real app, you'd use a map library */}
          <div className="text-center">
            <img 
              src="/api/placeholder/400/200" 
              alt="World map showing lead distribution" 
              className="w-full h-full object-contain" 
            />
            <div className="mt-4 flex justify-center gap-2">
              <div className="w-4 h-4 bg-blue-500"></div>
              <span className="text-xs">New Lead</span>
              <div className="w-4 h-4 bg-green-500"></div>
              <span className="text-xs">Qualified</span>
              <div className="w-4 h-4 bg-orange-400"></div>
              <span className="text-xs">Negotiations</span>
            </div>
            <div className="mt-2 flex justify-center gap-2">
              <div className="w-4 h-4 bg-green-700"></div>
              <span className="text-xs">Closed Win</span>
              <div className="w-4 h-4 bg-red-500"></div>
              <span className="text-xs">Closed Lost</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PipelineMap;
