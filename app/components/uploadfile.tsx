import React, { useState, useRef } from "react";
import axios from "axios";

interface FileWithTags {
  file: File;
  tags: string[];
}

const DocumentUploadForm: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  referenceID: string; 
  referenceType: string; 
  onDocumentAdded?: () => void; 
}> = ({ 
  isOpen, 
  onClose, 
  referenceID, 
  referenceType,
  onDocumentAdded 
}) => {
  const [files, setFiles] = useState<FileWithTags[]>([]);
  const [tagInputs, setTagInputs] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const fileList = Array.from(selectedFiles).map(file => ({
        file,
        tags: []
      }));
      setFiles(fileList);
      // Initialize tag inputs for each file
      setTagInputs(new Array(fileList.length).fill(""));
      setError(null);
    }
  };

  const handleAddTag = (fileIndex: number) => {
    const tagInput = tagInputs[fileIndex];
    if (tagInput.trim()) {
      const updatedFiles = [...files];
      const currentFile = updatedFiles[fileIndex];
      
      if (!currentFile.tags.includes(tagInput.trim())) {
        currentFile.tags.push(tagInput.trim());
        setFiles(updatedFiles);

        // Clear the tag input for this file
        const updatedTagInputs = [...tagInputs];
        updatedTagInputs[fileIndex] = "";
        setTagInputs(updatedTagInputs);
      }
    }
  };

  const handleTagInputChange = (fileIndex: number, value: string) => {
    const updatedTagInputs = [...tagInputs];
    updatedTagInputs[fileIndex] = value;
    setTagInputs(updatedTagInputs);
  };

  const handleTagInputKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>, 
    fileIndex: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag(fileIndex);
    }
  };

  const handleRemoveTag = (fileIndex: number, tagIndex: number) => {
    const updatedFiles = [...files];
    updatedFiles[fileIndex].tags.splice(tagIndex, 1);
    setFiles(updatedFiles);
  };

  const resetForm = () => {
    setFiles([]);
    setTagInputs([]);
    setError(null);
    setSuccess(false);
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadFiles = async () => {
    // Validate that all files have tags
    const filesWithoutTags = files.filter(file => file.tags.length === 0);
    if (filesWithoutTags.length > 0) {
      setError("Please add at least one tag to each file");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      for (const fileWithTags of files) {
        const formData = new FormData();
        formData.append("file", fileWithTags.file);
        formData.append("referenceID", referenceID);
        formData.append("referenceType", referenceType);
        
        // Add all tags to the formData
        fileWithTags.tags.forEach(tag => {
          formData.append("tags", tag);
        });

        const token = localStorage.getItem("token");
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        resetForm();
        if (onDocumentAdded) {
          onDocumentAdded(); // Callback to refresh document list
        }
      }, 1500);
    } catch (err) {
      console.error("Error uploading documents:", err);
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to upload documents");
      }
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-bg-blue-12">Upload Documents</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {success ? (
          <div className="text-green-600 bg-green-50 p-3 rounded mb-4">
            Documents uploaded successfully!
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Files
              </label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                ref={fileInputRef}
              />
            </div>

            {files.length > 0 && (
              <div>
                {files.map((fileWithTags, fileIndex) => (
                  <div key={fileIndex} className="mb-4 border-b pb-4">
                    <p className="text-sm text-gray-700 mb-2 font-medium">
                      {fileWithTags.file.name}
                    </p>

                    <div className="mb-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Tags
                      </label>
                      <div className="flex mb-2">
                        <input
                          type="text"
                          value={tagInputs[fileIndex]}
                          onChange={(e) => handleTagInputChange(fileIndex, e.target.value)}
                          onKeyPress={(e) => handleTagInputKeyPress(e, fileIndex)}
                          className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md"
                          placeholder="Add a tag"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddTag(fileIndex)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
                        >
                          Add
                        </button>
                      </div>
                    
                    {fileWithTags.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {fileWithTags.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="bg-gray-100 px-2 py-1 rounded-full text-sm flex items-center"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(fileIndex, tagIndex)}
                              className="ml-1 text-gray-500 hover:text-gray-700"
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                    </div>
                  </div>
                ))}

                {error && (
                  <div className="text-red-600 bg-red-50 p-3 rounded mb-4">
                    {error}
                  </div>
                )}

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    disabled={isUploading}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleUploadFiles}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    disabled={isUploading}
                  >
                    {isUploading ? "Uploading..." : "Upload All"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUploadForm;