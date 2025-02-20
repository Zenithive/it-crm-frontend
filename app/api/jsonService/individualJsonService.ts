import individualDummyData from '../../dummyData/individualDummyData.json'


export const jsonServiceLeftSide = async () => {
    return individualDummyData.leftside;
  };

export const jsonServiceTimeLine = async () =>{
  return individualDummyData.timeline;
}

export const jsonServiceRightSideDoc = async () =>{
  return individualDummyData.rightside;
}