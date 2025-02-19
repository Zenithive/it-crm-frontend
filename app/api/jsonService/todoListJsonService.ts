
export const getJsonData = async () => {
    const data = await import("../../dummyData/todoDummyData.json");
    return data.default;
  };
  