import Card from "../microComponents/Card";

export default function TimeCard() { 

return (<>

   <Card logo={"cl.svg"} task={"Time"} lastText={""}>
                <div className="flex gap-[25px] flex-col">
                  <div className="flex justify-between pt-[20px]  px-[11px] ">
                    <div className="text-[16px" style={{ color: "#6A6A6A" }}>
                      New York
                    </div>
                    <div className="text-[12px] text-black">12:00 PM</div>
                  </div>
                  <div className="flex justify-between   px-[11px] ">
                    <div className="text-[16px" style={{ color: "#6A6A6A" }}>
                      London
                    </div>
                    <div className="text-[12px] text-black">12:00 PM</div>
                  </div>
                  <div className="flex justify-between   px-[11px] ">
                    <div className="text-[16px" style={{ color: "#6A6A6A" }}>
                      Tokyo
                    </div>
                    <div className="text-[12px] text-black">12:00 PM</div>
                  </div>
                </div>
              </Card>
</>)
}