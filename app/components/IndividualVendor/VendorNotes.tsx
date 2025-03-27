"use client";
import React, { useState } from "react";
import { gql, useMutation, useQuery } from '@apollo/client';
import Notes from "../../microComponents/Notes";

// GraphQL Mutations and Queries
const CREATE_NOTE_MUTATION = gql`
  mutation CreateNote($input: CreateNoteInput!) {
    createNote(input: $input) {
      noteID
      note
      referenceID
      referenceType
      userID
    }
  }
`;

const GET_NOTES_QUERY = gql`
  query GetNotesByReference($referenceID: ID!, $referenceType: String!) {
    getNotesByReference(referenceID: $referenceID, referenceType: $referenceType) {
      noteID
      note
      referenceID
      referenceType
      userID
    }
  }
`;

interface Note {
  noteID?: string;
  note: string;
  message?: string;
  referenceID: string;
  referenceType: string;
  userID?: string;
  name?: string;
  date?: string;
  profile?: string;
}

const VendorNotes = ({ vendorId }: { vendorId: string }) => {
  const [content, setContent] = useState('');

  // Define reference type for vendor notes
  const referenceType = "VENDOR";

  // Create note mutation
  const [createNote, { loading: createLoading, error: createError }] = useMutation(CREATE_NOTE_MUTATION);
  
  // Get notes query
  const { 
    data, 
    loading: fetchLoading, 
    error: fetchError, 
    refetch 
  } = useQuery(GET_NOTES_QUERY, {
    variables: { 
      referenceID: vendorId, 
      referenceType 
    },
    fetchPolicy: 'cache-and-network'
  });

  const handleUpdateNote = async () => {
    if (!content.trim()) return; // Prevent empty notes

    try {
      await createNote({
        variables: {
          input: {
            noteData: content,
            referenceID: vendorId,
            referenceType
          }
        }
      });

      // Clear the content after successful submission
      setContent("");
      
      // Refetch notes to update the list
      refetch();
    } catch (err) {
      console.error("Error creating note:", err);
    }
  };

  // Transform notes from query to match existing interface
  const transformedNotes: Note[] = data?.getNotesByReference?.map((note: Note) => ({
    ...note,
    message: note.note,
    name: note.userID || 'Unknown', // You might want to map this to actual user name
    date: new Date().toLocaleDateString(), // You might want to use actual date from backend
    profile: "/image.svg" // Default profile image
  })) || [];

  // Loading and error states
  if (fetchLoading) return <div>Loading notes...</div>;
  if (fetchError) return <div>Error loading notes: {fetchError.message}</div>;

  return (
    <div className="bg-white rounded-xl p-6 shadow-custom mr-6 mt-4">
      <div className="bg-white rounded-xl p-6 shadow-custom">
        <div className="">
          <Notes   
            vendorId={vendorId}
            value={content || ""}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>
        <div className="mt-6">
          <button 
            className="bg-bg-blue-12 text-white rounded-lg p-2"
            onClick={handleUpdateNote}
            disabled={createLoading}
          >
            <div className="text-white">
              {createLoading ? 'Updating...' : 'Update'}
            </div>
          </button>
        </div>
      </div>

      {/* Error handling */}
      {createError && (
        <div className="text-red-500 mt-4">
          {createError.message}
        </div>
      )}

      <div className="mt-4">
        <div className="space-y-4">
          {transformedNotes.map((note, index) => (
            <div key={note.noteID || index} className="p-4 rounded-lg shadow-custom bg-white">
              <div className="font-medium text-xl">{note.message}</div>
              <div className="flex mt-3">
                <img
                  src={note.profile || "/image.svg"}
                  alt={note.name}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                />
                <div className="justify-center items-center flex ml-2 text-gray-500">
                  <div className="">Added by {note.name} - {note.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorNotes;