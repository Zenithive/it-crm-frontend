import React from "react";

const RightCaseStudy = ({outcome}) => {
    const {outcomes} = outcome||{};
  return (
    <>
      <div className="w-full lg:w-1/2 space-y-6">
        {/* Outcomes */}
        <div>
          <h3 className="text-lg font-semibold text-bg-blue-12 mb-3">
            Outcomes
          </h3>
          <ul className="space-y-4">
            <li className="text-black leading-relaxed whitespace-pre-wrap">
              {outcome.outcomes}
            </li>
          </ul>
        </div>

        <div className="border border-bg-blue-12-[1.19px]"></div>

        {/* Documents */}
        <div className="border-2 border-bg-blue-12-[1px] rounded-lg w-full min-h-[200px]">
          <h3 className="text-lg font-semibold text-bg-blue-12 mb-3 p-5">
            Documents
          </h3>
          <div className="flex justify-center items-center">
            <div className="flex max-w-[180px] px-4 py-2 border shadow-custom border-gray-300 rounded-lg hover:bg-gray-50">
              <img
                src="/doc_logo.svg"
                alt="Document"
                className="w-5 h-5 mr-3"
              />
              <button className="text-black text-sm text-center">
                Add Document
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightCaseStudy;
