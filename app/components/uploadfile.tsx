"use client";

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
  onDocumentAdded,
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
      const fileList = Array.from(selectedFiles).map((file) => ({
        file,
        tags: [],
      }));
      setFiles(fileList);
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
    const filesWithoutTags = files.filter((file) => file.tags.length === 0);
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

        fileWithTags.tags.forEach((tag) => {
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
          onDocumentAdded();
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
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div className="p-6 relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="bg-bg-blue-12 rounded-t-xl p-2 flex justify-between items-center">
          <div className="p-2">
            <h2 className="text-2xl font-semibold text-white">Upload Documents</h2>
          </div>
          <div className="p-2">
            <button
              className="text-gray-500 bg-white hover:text-gray-700 p-3 rounded-lg"
              onClick={onClose}
            >
              <img src="/cross_icon.svg" alt="Cross" className="h-3 w-3" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-b-xl shadow-lg w-full">
          <div className="p-6">
            {success ? (
              <div className="text-green-600 bg-green-50 p-3 rounded-lg mb-4">
                Documents uploaded successfully!
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <label className="block text-md text-bg-blue-12 font-medium mb-2">
                    Select Files
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 border border-bg-blue-12 rounded-lg focus:outline-none"
                    ref={fileInputRef}
                  />
                </div>

                {files.length > 0 && (
                  <div>
                    {files.map((fileWithTags, fileIndex) => (
                      <div key={fileIndex} className="mb-6">
                        <p className="text-md text-bg-blue-12 font-medium mb-2">
                          {fileWithTags.file.name}
                        </p>

                        <div>
                          <label className="block text-md text-bg-blue-12 font-medium mb-2">
                            Tags
                          </label>
                          <div className="flex mb-2">
                            <input
                              type="text"
                              value={tagInputs[fileIndex]}
                              onChange={(e) =>
                                handleTagInputChange(fileIndex, e.target.value)
                              }
                              onKeyPress={(e) => handleTagInputKeyPress(e, fileIndex)}
                              className="flex-grow px-4 py-3 border border-bg-blue-12 rounded-l-lg focus:outline-none"
                              placeholder="Add a tag"
                            />
                            <button
                              type="button"
                              onClick={() => handleAddTag(fileIndex)}
                              className="bg-bg-blue-12 text-white px-4 py-3 rounded-r-lg font-medium"
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
                      <div className="text-red-600 bg-red-50 p-3 rounded-lg mb-4">
                        {error}
                      </div>
                    )}

                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-bg-blue-12 rounded-lg text-bg-blue-12 font-medium hover:bg-gray-50"
                        disabled={isUploading}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleUploadFiles}
                        className="px-4 py-2 bg-bg-blue-12 text-white rounded-lg font-medium hover:bg-blue-600"
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
      </div>
    </div>
  );
};

export default DocumentUploadForm;