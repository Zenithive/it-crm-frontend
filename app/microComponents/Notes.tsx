
"use client";
import React, { useRef, useEffect } from "react";
import JoditEditor from "jodit-react";

interface CaseStudyFormNotesProps {
  value?: string;
  onChange?: (value: string) => void;
  vendorId?: string;
}

const Notes: React.FC<CaseStudyFormNotesProps> = ({
  value = "",
  onChange,
  vendorId,
}) => {
  const editor = useRef<any>(null);
  useEffect(() => {
    if (!editor.current) return; // Ensure ref is valid

    console.log("Editor initialized:", editor.current);
  }, []);

  const cleanText = (html: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return (tempDiv.textContent || tempDiv.innerText || "").replace(/\s+/g, " ").trim();
  };

  const handleEditorChange = (newContent: string) => {
    if (onChange) {
      const cleanedText = cleanText(newContent);
      onChange(cleanedText);
    }
  };

  return (
    <div className="bg-white">
      <div className="bg-white rounded-xlxl shadow-custom">
        <JoditEditor
          ref={editor}
          value={value} // Ensure this binds the initial content
          onBlur={handleEditorChange} // Use onBlur to avoid excessive re-renders
          config={{
            
            toolbarSticky: false,
            showXPathInStatusbar: false,
            showCharsCounter: false,
            showWordsCounter: false,
            showPlaceholder: false,
            style: { border: "none" },
            height: 150,
            minHeight: 150,
            maxHeight: 150,
            toolbarButtonSize: "small",

            removeButtons: ['source','ul','ol', 'fullsize', 'about', 'specialCharacters','outdent', 'indent', 'file', 'image', 'video', 'table', 'fontsize', 'brush', 'format','spellcheck','voice','symbol','link','paragraph']
           ,   extraButtons: [], // Ensure no extra buttons appear
    disablePlugins: "speech-recognize,specialCharacters,symbols"
    
          }}
        />

        
      </div>
    </div>
  );
};

export default Notes;
