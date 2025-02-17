import React from 'react'
import { Mail, Phone, Building2, Users, Linkedin, ChevronDown, Edit, Search, Plus, Reply, ExternalLink } from 'lucide-react';

const LeftSide = () => {
  return (
    <div>
       <div className="">
            <div className="bg-white rounded-lg shadow-custom p-6">
              <div className="space-y-4">
                {/* Lead Status */}
                <div>
                  <h2 className="text-lg font-semibold text-bg-blue-12 mb-2">Location</h2>
                  <p className="text-gray-700">India, Ahemdabad</p>
                </div>

                <div className="border border-bg-blue-12-[1.19px]"></div>

                {/* Assigned Owner */}
                <div>
                  <h2 className="text-lg font-semibold text-bg-blue-12 mb-2">Assigned Owner</h2>
                  <p className="text-gray-700">Johnson</p>
                </div>

                <div className="border border-bg-blue-12-[1.19px]"></div>
                {/* Contact Details */}
                <div>
                  <h2 className="text-lg font-semibold text-bg-blue-12 mb-2">Email</h2>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail size={16} />
                    <span>zenithive17@gmail.com</span>
                  </div>
                </div>

                <div className="border border-bg-blue-12-[1.19px]"></div>

                <div>
                  <h2 className="text-lg font-semibold text-bg-blue-12 mb-2">Phone</h2>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone size={16} />
                    <span>+91 256232561</span>
                  </div>
                </div>

                <div className="border border-bg-blue-12-[1.19px]"></div>

                <div>
                  <h2 className="text-lg font-semibold text-bg-blue-12 mb-2">Company</h2>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Building2 size={16} />
                    <span>Zen Corporation</span>
                  </div>
                </div>

                <div className="border border-bg-blue-12-[1.19px]"></div>

                <div>
                  <h2 className="text-lg font-semibold text-bg-blue-12 mb-2">Industry</h2>
                  <p className="text-gray-700">IT Company</p>
                </div>

                <div className="border border-bg-blue-12-[1.19px]"></div>

                <div>
                  <h2 className="text-lg font-semibold text-bg-blue-12 mb-2">Employee Count</h2>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Users size={16} />
                    <span>250</span>
                  </div>
                </div>

                <div className="border border-bg-blue-12-[1.19px]"></div>

                <div>
                  <h2 className="text-lg font-semibold text-bg-blue-12 mb-2">LinkedIn</h2>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Linkedin size={16} />
                    <span>zenithive</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default LeftSide
