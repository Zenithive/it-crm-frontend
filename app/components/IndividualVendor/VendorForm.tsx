import React, { useState } from 'react';
import { X, Bold, Italic, Underline, Link as LinkIcon, Image, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Minus, Check, Star } from 'lucide-react';


interface VendorFormProps {
  onClose: () => void;
}


const VendorForm: React.FC<VendorFormProps> = ({ onClose }) => {
  const [rating, setRating] = useState(0);

  return (
  
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl relative">
        <div className="bg-[#6366F1] text-white p-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-xl font-semibold">Vendor Form</h2>
          <button onClick={onClose} className="hover:bg-white/10 rounded-full p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#6366F1] mb-1">Company Name</label>
              <input type="text" placeholder="Enter name" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#6366F1] mb-1">Company Email</label>
              <input type="email" placeholder="Email" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#6366F1] mb-1">Address</label>
              <input type="text" placeholder="Address" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none" />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#6366F1] mb-1">Vendor Skills</label>
              <input type="text" placeholder="Skills" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#6366F1] mb-1">Payment Terms</label>
              <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none">
                <option>Terms</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#6366F1] mb-1">Website</label>
              <input type="url" placeholder="Link" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none" />
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#6366F1] mb-1">VAT/GST</label>
              <input type="text" placeholder="GST or VAT Number" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#6366F1] mb-1">LinkedIn Profile URL</label>
              <input type="url" placeholder="URL" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#6366F1] mb-1">Performance Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${star <= rating ? 'fill-[#6366F1] text-[#6366F1]' : 'text-gray-300'}`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Note Section */}
          <div>
            <label className="block text-sm font-medium text-[#6366F1] mb-1">Note</label>
            <div className="border rounded-lg">
              <div className="flex gap-1 border-b p-2">
                <button className="p-1 hover:bg-gray-100 rounded"><Bold className="w-4 h-4" /></button>
                <button className="p-1 hover:bg-gray-100 rounded"><Italic className="w-4 h-4" /></button>
                <button className="p-1 hover:bg-gray-100 rounded"><Underline className="w-4 h-4" /></button>
                <button className="p-1 hover:bg-gray-100 rounded"><LinkIcon className="w-4 h-4" /></button>
                <button className="p-1 hover:bg-gray-100 rounded"><Image className="w-4 h-4" /></button>
                <div className="h-6 w-px bg-gray-300 mx-1" />
                <button className="p-1 hover:bg-gray-100 rounded"><AlignLeft className="w-4 h-4" /></button>
                <button className="p-1 hover:bg-gray-100 rounded"><AlignCenter className="w-4 h-4" /></button>
                <button className="p-1 hover:bg-gray-100 rounded"><AlignRight className="w-4 h-4" /></button>
                <div className="h-6 w-px bg-gray-300 mx-1" />
                <button className="p-1 hover:bg-gray-100 rounded"><List className="w-4 h-4" /></button>
                <button className="p-1 hover:bg-gray-100 rounded"><ListOrdered className="w-4 h-4" /></button>
                <button className="p-1 hover:bg-gray-100 rounded"><Minus className="w-4 h-4" /></button>
                <button className="p-1 hover:bg-gray-100 rounded"><Check className="w-4 h-4" /></button>
              </div>
              <div className="p-3">
                <div className="flex gap-2 text-sm text-[#6366F1]">
                  <button className="hover:underline">@ Mention</button>
                  <button className="hover:underline">Document</button>
                </div>
              </div>
            </div>
          </div>

          {/* Vendor Detail Section */}
          <div>
            <h3 className="text-lg font-medium text-[#6366F1] mb-4">Vendor Detail</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-[#6366F1] mb-1">Name</label>
                <input type="text" placeholder="Name" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6366F1] mb-1">Contact</label>
                <input type="text" placeholder="Contact" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6366F1] mb-1">Number</label>
                <input type="text" placeholder="Number" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6366F1] mb-1">Designation</label>
                <input type="text" placeholder="Ex: CEO" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none" />
              </div>
            </div>
            <button className="text-[#6366F1] flex items-center gap-1 text-sm hover:underline">
              <span className="font-bold text-lg">+</span> Add Detail
            </button>
          </div>

          {/* Save Button */}
          <button className="w-full bg-[#6366F1] text-white py-3 rounded-lg hover:bg-[#5457E5] transition-colors">
            Save
          </button>
        </div>
      </div>
    
  );
}

export default VendorForm;