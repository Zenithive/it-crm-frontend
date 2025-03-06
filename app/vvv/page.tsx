import React, { FormEvent } from 'react';
import { X } from 'lucide-react';

// Define an interface for the form data
interface ActivityFormData {
  activityType: string;
  followUp: string;
  dateTime: string;
  communicationChannel: string;
  note: string;
}

const ActivityForm: React.FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const activityData: ActivityFormData = {
      activityType: formData.get('activityType') as string,
      followUp: formData.get('followUp') as string,
      dateTime: formData.get('dateTime') as string,
      communicationChannel: formData.get('communicationChannel') as string,
      note: formData.get('note') as string
    };

    console.log(activityData);
  };

  return (
    <div className="bg-white rounded-lg w-full max-w-md shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#6C5CE7]">Activity</h2>
          <button className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#6C5CE7] mb-2">Activity Type</label>
            <input
              name="activityType"
              type="text"
              placeholder="Type"
              className="w-full px-4 py-2 rounded border border-gray-200 focus:outline-none focus:border-[#6C5CE7]"
            />
          </div>

          <div>
            <label className="block text-[#6C5CE7] mb-2">Follow up</label>
            <input
              name="followUp"
              type="text"
              placeholder="Follow up"
              className="w-full px-4 py-2 rounded border border-gray-200 focus:outline-none focus:border-[#6C5CE7]"
            />
          </div>

          <div>
            <label className="block text-[#6C5CE7] mb-2">Date/Time</label>
            <input
              name="dateTime"
              type="text"
              placeholder="Date/time"
              className="w-full px-4 py-2 rounded border border-gray-200 focus:outline-none focus:border-[#6C5CE7]"
            />
          </div>

          <div>
            <label className="block text-[#6C5CE7] mb-2">Communication Channel</label>
            <input
              name="communicationChannel"
              type="text"
              placeholder="Communication"
              className="w-full px-4 py-2 rounded border border-gray-200 focus:outline-none focus:border-[#6C5CE7]"
            />
          </div>

          <div>
            <label className="block text-[#6C5CE7] mb-2">Note</label>
            <textarea
              name="note"
              placeholder="Add your note here..."
              rows={4}
              className="w-full px-4 py-2 rounded border border-gray-200 focus:outline-none focus:border-[#6C5CE7] resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#6C5CE7] text-white py-3 rounded-md hover:bg-[#5849e4] transition-colors"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ActivityForm;