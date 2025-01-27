import Navbar from "./Navbar";
import LeftCardDetails from "./LeftCardDetails";
import RecentMeetings from "./RecentMeetings";
import UnreadMessages from "./UnreadMessages";
import FollowUps from "./FollowUps";

export default function DashboardPage() {
  return (
    <>
      <Navbar></Navbar>

      <LeftCardDetails />
      <div className="flex">
        <div className="">
          <RecentMeetings></RecentMeetings>
        </div>
        <div className="">
          <UnreadMessages></UnreadMessages>
        </div>
        <div className="">
          <FollowUps></FollowUps>
        </div>
      </div>
    </>
  );
}
