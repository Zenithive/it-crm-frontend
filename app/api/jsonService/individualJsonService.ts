import individualLeftSideDummyData from '../../dummyData/individualLeftSideDummyData.json'
import individualTimelineDummyData from '../../dummyData/individualTimelineDummyData.json'
import individualRightSideDocDummyData from '../../dummyData/individualRightSideDocDummyData.json'

export const jsonServiceLeftSide = async () => {
    return individualLeftSideDummyData;
  };

export const jsonServiceTimeLine = async () =>{
  return individualTimelineDummyData;
}

export const jsonServiceRightSideDoc = async () =>{
  return individualRightSideDocDummyData;
}