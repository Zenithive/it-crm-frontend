// src/components/CaseStudy/AddCaseStudyForm/FormModal.tsx

import React from "react";
import { FormModalProps } from "./AddCaseStudyInterface";




const FormModal: React.FC<FormModalProps> = ({ children, title, onClose }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg overflow-hidden w-[900px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-indigo-500 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
          <button className="bg-white p-2 rounded-lg" onClick={onClose}>
            <img src="cross_icon.svg" alt="Cross" className="h-3 w-3" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default FormModal;