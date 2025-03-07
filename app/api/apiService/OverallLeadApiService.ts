export const fetchFromAPIForListView = async () => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC || "");

    //   console.log("API Response:", response);

    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    return [];
  }
};

export const fetchFromAPIForKanbanView = async () => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC || "");

    //   console.log("API Response:", response);

    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    return [];
  }
};
