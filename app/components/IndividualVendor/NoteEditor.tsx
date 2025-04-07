import React from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { VendorFormData } from "./VendorFormInterface";
import {
  Bold,
  Italic,
  Underline,
  Link as LinkIcon,
  Image,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Minus,
  Check,
} from "lucide-react";

interface NoteEditorProps {
  register: UseFormRegister<VendorFormData>;
  errors: FieldErrors<VendorFormData>;
  noteRef: React.RefObject<HTMLDivElement | null>;
  setValue: UseFormSetValue<VendorFormData>;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ register, errors, noteRef, setValue }) => {
  const applyFormat = (command: string, value: string = "") => {
    if (noteRef.current) {
      noteRef.current.focus();
      document.execCommand(command, false, value);
      setValue("notes", noteRef.current.innerHTML, { shouldValidate: true });
    }
  };

  const applyListFormat = (command: string) => {
    if (noteRef.current) {
      noteRef.current.focus();
      if (noteRef.current.innerHTML.trim() === "") {
        noteRef.current.innerHTML = "<p><br></p>";
      }
      document.execCommand(command, false, "");
      setValue("notes", noteRef.current.innerHTML, { shouldValidate: true });
    }
  };

  const handleNoteChange = () => {
    if (noteRef.current) {
      setValue("notes", noteRef.current.textContent || "", { shouldValidate: true });
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-bg-blue-12 mb-1">Note</label>
      <div className="border rounded-lg">
        <div className="flex gap-1 border-b p-2">
          <button type="button" onClick={() => applyFormat("bold")} className="p-1 hover:bg-gray-100 rounded">
            <Bold className="w-4 h-4" />
          </button>
          <button type="button" onClick={() => applyFormat("italic")} className="p-1 hover:bg-gray-100 rounded">
            <Italic className="w-4 h-4" />
          </button>
          <button type="button" onClick={() => applyFormat("underline")} className="p-1 hover:bg-gray-100 rounded">
            <Underline className="w-4 h-4" />
          </button>
          <button type="button" onClick={() => applyFormat("createLink", prompt("Enter URL:") || "")} className="p-1 hover:bg-gray-100 rounded">
            <LinkIcon className="w-4 h-4" />
          </button>
          <button type="button" className="p-1 hover:bg-gray-100 rounded">
            <Image className="w-4 h-4" />
          </button>
          <div className="h-6 w-px bg-gray-300 mx-1" />
          <button type="button" onClick={() => applyFormat("justifyLeft")} className="p-1 hover:bg-gray-100 rounded">
            <AlignLeft className="w-4 h-4" />
          </button>
          <button type="button" onClick={() => applyFormat("justifyCenter")} className="p-1 hover:bg-gray-100 rounded">
            <AlignCenter className="w-4 h-4" />
          </button>
          <button type="button" onClick={() => applyFormat("justifyRight")} className="p-1 hover:bg-gray-100 rounded">
            <AlignRight className="w-4 h-4" />
          </button>
          <div className="h-6 w-px bg-gray-300 mx-1" />
          <button type="button" onClick={() => applyListFormat("insertUnorderedList")} className="p-1 hover:bg-gray-100 rounded">
            <List className="w-4 h-4" />
          </button>
          <button type="button" onClick={() => applyListFormat("insertOrderedList")} className="p-1 hover:bg-gray-100 rounded">
            <ListOrdered className="w-4 h-4" />
          </button>
          <button type="button" className="p-1 hover:bg-gray-100 rounded">
            <Minus className="w-4 h-4" />
          </button>
          <button type="button" className="p-1 hover:bg-gray-100 rounded">
            <Check className="w-4 h-4" />
          </button>
        </div>
        <div
          ref={noteRef}
          contentEditable="true"
          onInput={handleNoteChange}
          className="p-3 min-h-[80px] outline-none border-none w-full focus:ring-0 text-gray-900"
        />
        <input
          type="hidden"
          {...register("notes", {
            required: "Notes are required",
            minLength: { value: 5, message: "Minimum 5 characters required" },
          })}
        />
        {errors.notes && (
          <span className="text-red-500 text-sm">{errors.notes.message}</span>
        )}
        <div className="p-3">
          <div className="flex gap-2 text-sm text-bg-blue-12">
            <button type="button" className="hover:underline">@ Mention</button>
            <button type="button" className="hover:underline">Document</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;