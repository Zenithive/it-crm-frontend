import React from 'react'
import { Mail, Phone, Building2, Users, Linkedin, ChevronDown, Edit, Search, Plus, Reply, ExternalLink } from 'lucide-react';

const RightSide = () => {
  return (
    <div className="bg-white rounded-lg shadow-custom p-4"> {/* Apply bg-white to the outermost div */}
      <div className="space-y-6">
        {/* Documents Section */}
        <div className="">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-bg-blue-12">Documents</h2>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <img src='/plus_icon.svg' alt='Plus'></img>
            </button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded flex items-center justify-center">
                    <img src='/doc.svg' alt='Document'></img>
                  </div>
                  <span className="text-gray-700">Proposal.pdf</span>
                </div>
                <button className="text-indigo-600 hover:text-indigo-700">View</button>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-bg-blue-12-[1px]"></div>

        {/* Pipeline Stage */}
        <h2 className="text-lg font-medium text-indigo-600 mb-6">Pipeline Stage</h2>
        <div className="space-y-6">
          {['Lead Created', 'Qualified', 'Negotiation', 'Closed'].map((stage, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                index <= 1 ? 'bg-indigo-600' : 'bg-gray-200'
              }`}>
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              <span className={index <= 1 ? 'text-indigo-600 font-medium' : 'text-gray-500'}>
                {stage}
              </span>
            </div>
          ))}
        </div>

        <div className="border border-bg-blue-12-[1px]"></div>

        {/* Notes Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-indigo-600">Note</h2>
          <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700">
            <Plus size={16} />
            Add Note
          </button>
        </div>
        <textarea
          placeholder="Add a notes..."
          className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          rows={4}
        />
      </div>
    </div>
  );
}

export default RightSide;
