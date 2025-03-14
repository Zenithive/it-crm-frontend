"use client";
import React,{useState,useEffect} from "react";
import { resourcemanagmentApi } from "../../api/apiService/resourcemanagmentApiService";
import { resourcemanagment } from "../../api/jsonService/resourcemanagmentJsonService";

interface Note {
   message: string;
  profile: string;
    name: string;
    date : string;
}

const ResourceNote = () => {

  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

    const useDummyData =
        process.env.NEXT_PUBLIC_USE_DUMMY_DATA?.trim().toLowerCase() === "true";
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            setIsLoading(true);
            const response = useDummyData
              ? await resourcemanagmentApi()
              : resourcemanagment();

              const notesData = response?.notes ?? [];
              setNotes(Array.isArray(notesData) ? notesData : []);

          } catch (err) {
            console.error("Error fetching resources:", err);
            setError("Failed to load resources");
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchData();
      }, [useDummyData]);
    
  return (
  
      <div className="bg-white rounded-2xl p-6 shadow-custom mr-4 mt-4">
        <div className="bg-white rounded-2xl p-6 shadow-custom">
          <div className="bg-white rounded-2xl p-6 shadow-custom min-h-[00px] mr-4 mt-4">
          </div>
          <div className="mt-6">
              <button className=" bg-blue-600 text-white rounded-lg p-2">
                <div className="text-white">Update</div>
              </button>
            </div>
        </div>

      <div className="mt-4">
        <div className="space-y-4">
          {notes.map((note, index) => (
              <div
              key={index}
              className="p-4 rounded-lg shadow-custom bg-white"
            >
              <div className="font-medium text-xl">{note.message}</div>
              <div className="flex mt-3">
              <img
                  src={note.profile}
                  alt={note.name}
                  className="w-8 h-8 md:w-10 md:h-10"
                />
                <div className="justify-center items-center flex ml-2 text-gray-500">

              <div className="">Add by {note.name} - {note.date}</div>
              
                </div>

              </div>

            </div>
          ))}</div>
      </div>

      </div>
    
  );
};

export default ResourceNote;
