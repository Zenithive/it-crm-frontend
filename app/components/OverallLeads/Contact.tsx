
export default function Contact() {
    const data = [
        { name: "Sachin T", company: "TechCorp", stage: "New Lead", owner: "Zenithive", source: "Website", type: "Enterprise", campaign: "Xyz", profileImage: "profileLogo.svg" },
        { name: "Sachin T", company: "TechCorp", stage: "Qualified", owner: "Zenithive", source: "Referral", type: "Enterprise", campaign: "Xyz",  profileImage: "profileLogo.svg" },
        { name: "Sachin T", company: "TechCorp", stage: "Negotiation", owner: "Zenithive", source: "Linkedin", type: "Enterprise", campaign: "Xyz",  profileImage: "profileLogo.svg"  },
        { name: "Sachin T", company: "TechCorp", stage: "New Lead", owner: "Zenithive", source: "Up-work", type: "Enterprise", campaign: "Xyz",  profileImage: "profileLogo.svg"  }
      ];
    return (
      <>
      <div className="px-[70px]">
        <div className="flex justify-between items-center  ">
       
        <div className="flex items-center bg-bg-gray-14 rounded-lg px-3 w-[420px] h-[44px] shadow-sm">
  <img src="search_icon.svg" alt="Search" className="w-4 h-4 text-gray-400 mr-2" />
  <input
    type="text"
    name="search"
    value="Search Leads..."
    className="w-full border-none outline-none bg-transparent text-gray-700 placeholder-transparent"
  />
</div>

  
          <div className="ml-4">
            <button className="border border-bg-blue-11 text-black font-normal px-[10px] py-[10px] w-[91px] h-[44px] rounded-md flex items-center gap-[10px]">
                <span><img src='filterC.svg' className=''></img></span>
                <span>Filters</span>
              
            </button>
          </div>
        </div>
  
      <div className="flex flex-col gap-[10px] mt-[37px]">
        <div className="flex gap-5 items-center justify-start">
          <div className="flex items-center cursor-pointer w-[108px] h-[43px] border-bg-blue-11 rounded-md gap-[10px] px-1 border">
           <div><img src="list.svg" alt="list view"  /></div> 
            <div className="  font-medium text-[14px]" style={{color:'#333333'}}>List View</div>
          </div>
          <div>
            <img src="list1.svg" alt="grid view" className="w-6 h-6 cursor-pointer" />
          </div>
          <div>
            <img src="list3.svg" alt="detailed view" className="w-6 h-6 cursor-pointer" />
          </div>
        </div>
  

          <div className="overflow-x-auto">
      <table className="min-w-full bg-white border-collapse border border-bg-blue-11">
        <thead>
          <tr className=" bg-bg-blue-11 text-white">
            <th className="pl-[72px] font-semibold">
              <div className="flex gap-2 items-center">
                <span>Name</span>
                <span><img src="rename.svg"  alt="Filter Icon" /></span>
              </div>
            </th>
            <th className="p-4 font-semibold">
              <div className="flex gap-2 items-center">
                <span>Company</span>
                <img src="rename.svg" alt="Filter Icon" />
              </div>
            </th>
            <th className="p-4 font-semibold">
              <div className="flex gap-2 items-center">
                <span>Stage</span>
                <img src="rename.svg" alt="Filter Icon" />
              </div>
            </th>
            <th className="p-4 font-semibold">
              <div className="flex gap-2 items-center">
                <span>Owner</span>
                <img src="rename.svg" alt="Filter Icon" />
              </div>
            </th>
            <th className="p-4 font-semibold">
              <div className="flex gap-2 items-center">
                <span>Source</span>
                <img src="rename.svg" alt="Filter Icon" />
              </div>
            </th>
            <th className="p-4 font-semibold">
              <div className="flex gap-2 items-center">
                <span>Type</span>
                <img src="rename.svg" alt="Filter Icon" />
              </div>
            </th>
            <th className="font-semibold">
              <div className="flex gap-2 items-center">
                <span>Campaign</span>
                <img src="rename.svg" alt="Filter Icon" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr className="hover:bg-gray-50 border-b border-bg-blue-11" key={index}>
              <td className="pl-[45px]">
                <div className="flex items-center gap-[5px]">
                  <img src={row.profileImage} alt="Profile" className="w-[38px] h-[38px] rounded-[4px] " />
                  {row.name}
                </div>
              </td>
              <td className="p-4">{row.company}</td>
              <td className="p-4">
                <button className=" h-[28px] w-[114px] text-green-11 border-green-11 border rounded-md px-[8px] flex items-center justify-center">
                  {row.stage}
                </button>
              </td>
              <td className="p-4">{row.owner}</td>
              <td className="p-4">{row.source}</td>
              <td className="p-4">{row.type}</td>
              <td className="p-4 items-center justify-center flex">{row.campaign}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </div>
        <div className="flex justify-between items-center p-4  mt-4 rounded-lg absolute bottom-[65px] left-0 right-0">


    
       <div className="flex gap-[14px] items-center ">
          <div className="text-black w-[141px] h-[34px] border border-bg-blue-11 flex justify-center items-center gap-[9px] rounded-md"><span>10 per page</span><span><img src='dropdown.svg'></img></span></div>
          <div className="text-bg-gray-15">Showing 1 to 10 out of 234</div></div>
          <div className="flex gap-2 ">
            <img src='leftArrow.svg'></img>
            <button className="px-2      bg-gray-200  text-black w-[28px] h-[28px] text-[18px]">1</button>
            <button className="px-2  bg-gray-200  text-black w-[28px] h-[28px] text-[18px]">2</button>
            <button className="px-2  bg-gray-200  text-black w-[28px] h-[28px] text-[18px]">3</button>
           <img src='rightArrow.svg'></img>
          </div>
        </div>
        </div>
      </>
    );
  }
  