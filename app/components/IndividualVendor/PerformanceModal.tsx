"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface PerformanceRatingData {
  pastProjectsCount: number; // Maps to projectCompleted
  rating: number; // Maps to qualityScore (scaled to 0-5)
  review: string; // Includes onTimeDelivery info
}

interface PerformanceFormModalProps {
  onClose: () => void;
  onAddPerformance: (data: PerformanceRatingData) => void;
}

const PerformanceFormModal: React.FC<PerformanceFormModalProps> = ({ onClose, onAddPerformance }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PerformanceRatingData>({
    defaultValues: {
      pastProjectsCount: 0,
      rating: 0,
      review: "",
    },
  });

  const onSubmit: SubmitHandler<PerformanceRatingData> = (data) => {
    onAddPerformance(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-semibold text-bg-blue-12 mb-4">Add Performance</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-bg-blue-12 mb-1">Past Projects Count</label>
            <input
              {...register("pastProjectsCount", { required: true, valueAsNumber: true, min: 0 })}
              type="number"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              placeholder="Enter number"
            />
            {errors.pastProjectsCount && <p className="text-red-500 text-xs mt-1">Required, must be </p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-bg-blue-12 mb-1">Rating (0-5)</label>
            <input
              {...register("rating", { required: true, valueAsNumber: true, min: 0, max: 5 })}
              type="number"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              placeholder="Enter rating"
            />
            {errors.rating && <p className="text-red-500 text-xs mt-1">Required, 0-5</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-bg-blue-12 mb-1">Review</label>
            <textarea
              {...register("review", { required: true })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              placeholder="Enter review (e.g., On-Time Delivery: 85%)"
              rows={3}
            />
            {errors.review && <p className="text-red-500 text-xs mt-1">Required</p>}
          </div>
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-bg-blue-12 text-white rounded-lg">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PerformanceFormModal;