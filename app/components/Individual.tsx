import React from "react";
import Title from "../microComponents/Title";
import Navbar from "./Navbar";
import Content from "../microComponents/Content";
import Container from "../microComponents/Container";

const Individual = () => {
  const profile = [
    {
      profileImage: "profileLogo.svg",
      name: "Sachin Tend",
      subtitle: "VP of sales at Zen Corporation",
    },
    {
      profileImage: "individual_email.svg",
      name: "Email",
      subtitle: "Sent follow-up email regarding proposal",
    },
    {
      profileImage: "individual_call.svg",
      name: "Call",
      subtitle: "Discussed project requirements",
    },
    {
      profileImage: "individual_clock.svg",
      name: "Meeting",
      subtitle: "Product demo scheduled",
    },
    {
      profileImage: "individual_clock.svg",
      name: "Note Added",
      subtitle: "Added meeting notes and action items",
    },
    {
      name: "Lead Type",
      subtitle: "Qualified Lead",
    },
    {
      name: "Assigned Owner",
      subtitle: "Johnson",
    },
    {
      name: "Created Date",
      subtitle: "Jan 15,2024",
    },
  ];

  const title = [
    {
      titleName: "Individual Lead",
      button: "",
    },
  ];

  // Flatten the container data structure for easier use
  const container = {
    title1: "Contact Details",
    logo1: "edit_icon.svg",
    title2: "Pipeline Stages",
    logo2: "plus_icon.svg",
    title3: "Activity Timeline",
    title4: "Lead Information",
    title5: "Documents",
    title6: "Notes",
  };

  const content = {};

  return (
    <div>
      <div>
        <Navbar />
        <Title title={title[0].titleName} button={title[0].button} />
        <div className="ml-[98px]">
          <div className="mt-[32px]">
            <Content
              profileImage={profile[0].profileImage}
              imageHeight="80px"
              imageWidth="80px"
              name={profile[0].name}
              nameStyle="text-[30px] font-bold"
              designation={profile[0].subtitle}
              otherStyle="text-[16px] font-normal"
            />
          </div>

          <div className="flex gap-[20px] mt-[10px] ml-[85px]">
            <div className="flex">
              <div className="mt-1">
                <img src="call_icon.svg" alt="Call" />
              </div>
              <div className="ml-1">Call</div>
            </div>
            <div className="flex">
              <div className="mt-1">
                <img src="email_icon.svg" alt="Email" />
              </div>
              <div className="ml-1">Email</div>
            </div>
            <div className="flex">
              <div className="mt-1">
                <img src="clock_icon.svg" alt="Schedule Meeting" />
              </div>
              <div className="ml-1">Schedule Meeting</div>
            </div>
          </div>

          <div className="flex mb-[100px]">
            <div>
              <div className="mt-5">
                <Container
                  title={container.title1}
                  logo={container.logo1}
                  containerWidth="823px"
                  containerHeight="210px"
                >
                  <div className="flex justify-between ml-[20px] mt-[17px]">
                    <div className="">
                      <div className="text-[16px] font-normal">Email</div>
                      <div className="flex">
                        <img src="email_icon.svg"></img>
                        <div className="text-text_color font-normal text-[12px] ml-2">
                          zenithive17@gmail.com
                        </div>
                      </div>
                    </div>

                    <div className="mr-[191px]">
                      <div className="text-[16px] font-normal">Phone</div>
                      <div className="flex">
                        <img src="call_icon.svg"></img>
                        <div className="text-text_color font-normal text-[12px] ml-2">
                          +91 256232561
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-[32px] ml-[20px]">
                    <div className="">
                      <div className="text-[16px] font-normal">Company</div>
                      <div className="flex">
                        <img src="company_icon.svg"></img>
                        <div className="text-text_color font-normal text-[12px] ml-2">
                          Zen Corporation
                        </div>
                      </div>
                    </div>

                    <div className="mr-[175px]">
                      <div className="text-[16px] font-normal">Location</div>
                      <div className="flex">
                        <img src="location_icon.svg"></img>
                        <div className="text-text_color font-normal text-[12px] ml-2">
                          India, Ahmedabad
                        </div>
                      </div>
                    </div>
                  </div>
                </Container>
              </div>
              <div className="mt-5">
                <Container
                  title={container.title2}
                  containerWidth="823px"
                  containerHeight="208px"
                />
              </div>

              <div className="mt-5">
                <Container
                  title={container.title3}
                  containerWidth="823px"
                  containerHeight="315px"
                  text="View All"
                >
                  <div className="space-y-3 mt-[20px] ml-[20px] ">
                    <Content
                      profileImage={profile[1].profileImage}
                      name={profile[1].name}
                      designation={profile[1].subtitle}
                    />
                    <Content
                      profileImage={profile[2].profileImage}
                      name={profile[2].name}
                      designation={profile[2].subtitle}
                    />
                    <Content
                      profileImage={profile[3].profileImage}
                      name={profile[3].name}
                      designation={profile[3].subtitle}
                    />
                    <Content
                      profileImage={profile[4].profileImage}
                      name={profile[4].name}
                      designation={profile[4].subtitle}
                    />
                  </div>
                </Container>
              </div>
            </div>

            <div className="ml-5">
              <div className="mt-5">
                <Container
                  title={container.title4}
                  containerWidth="401px"
                  containerHeight="235px"
                >
                  <Content
                    name={profile[5].name}
                    designation={profile[5].subtitle}
                  />
                  <Content
                    name={profile[6].name}
                    designation={profile[6].subtitle}
                  />
                  <Content
                    name={profile[7].name}
                    designation={profile[7].subtitle}
                  />
                </Container>
              </div>

              <div className="mt-5">
                <Container
                  title={container.title5}
                  logo={container.logo2}
                  containerWidth="401px"
                  containerHeight="213px"
                >
                  <div className="flex justify-between items-center w-full p-3">
                    <div className="flex items-center gap-2">
                      <img src="proposal_logo.svg" alt="Proposal Logo" />
                      <div className="text-black font-normal">Proposal.pdf</div>
                    </div>

                    <div className="text-bg-blue-12 font-normal">View</div>
                  </div>
                  <hr></hr>

                  <div className="flex justify-between items-center w-full p-3">
                    <div className="flex items-center gap-2">
                      <img src="proposal_logo.svg" alt="Proposal Logo" />
                      <div className="text-black font-normal">Proposal.pdf</div>
                    </div>

                    <div className="text-bg-blue-12 font-normal">View</div>
                  </div>
                  <hr ></hr>

                  <div className="flex justify-between items-center w-full p-3">
                    <div className="flex items-center gap-2">
                      <img src="proposal_logo.svg" alt="Proposal Logo" />
                      <div className="text-black font-normal">Proposal.pdf</div>
                    </div>

                    <div className="text-bg-blue-12 font-normal">View</div>
                  </div>
                </Container>
              </div>

              <div className="mt-5">
                <Container
                  title={container.title6}
                  logo={container.logo2}
                  containerWidth="401px"
                  containerHeight="213px"
                >
                 <div className="p-4">
                  <div
                    className=" bg-bg-gray-11 border-2 border-individuals_border rounded-lg text-bg-gray-13 font-normal text-[16px]"
                    style={{ height: "126px", width: "364px" }}
                  >Add a notes...</div>
                  </div>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Individual;
