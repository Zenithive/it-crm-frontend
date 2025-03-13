import userDummyData from '../../dummyData/userDummyData.json';

export const user = async () => {
    return { users: userDummyData };
  };