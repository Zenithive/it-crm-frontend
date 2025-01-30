import Card from "../microComponents/Card";

export default function TodayMettingCard() { 

    return (<>
    
    <Card
                    logo={"video.svg"}
                    task={"Today’s Meetings"}
                    lastText={"View All"}
                    lastTextColor="text-bg-blue-11"
                  >
                    <div className="flex gap-[18px] flex-col">
                      <div className="flex gap-4 pt-[20px] px-[10px] ">
                        <img src="Frame 423.svg"></img>
    
                        <div className="">
                          <div className="flex flex-col ">
                            <span
                              style={{ color: "#333333" }}
                              className="text-[14px] font-normal"
                            >
                              Product Demo - XYZ Corp
                            </span>
                            <span
                              style={{ color: "#6B7280" }}
                              className="text-[10px]"
                            >
                              2:00 PM - 3:00 PM
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <button className=" w-[38px] h-[21px] bg-bg-blue-11 text-[10px] text-center rounded-md text-white">
                            join
                          </button>
                        </div>
                      </div>
    
                      <div className="flex gap-4 px-[10px] ">
                        <img src="Frame 423.svg"></img>
    
                        <div className="">
                          <div className="flex flex-col ">
                            <span
                              style={{ color: "#333333" }}
                              className="text-[14px] font-normal"
                            >
                              Product Demo - XYZ Corp
                            </span>
                            <span
                              style={{ color: "#6B7280" }}
                              className="text-[10px]"
                            >
                              2:00 PM - 3:00 PM
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <button className=" w-[38px] h-[21px] bg-bg-blue-11 text-[10px] text-center rounded-md text-white">
                            join
                          </button>
                        </div>
                      </div>
    
                      <div className="flex gap-4  px-[10px] ">
                        <img src="Frame 423.svg"></img>
    
                        <div className="">
                          <div className="flex flex-col ">
                            <span
                              style={{ color: "#333333" }}
                              className="text-[14px] font-normal"
                            >
                              Product Demo - XYZ Corp
                            </span>
                            <span
                              style={{ color: "#6B7280" }}
                              className="text-[10px]"
                            >
                              2:00 PM - 3:00 PM
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <button className=" w-[38px] h-[21px] bg-bg-blue-11 text-[10px] text-center rounded-md text-white">
                            join
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
    </>)
    }