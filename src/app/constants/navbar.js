import { RiHome5Line } from "react-icons/ri";
import { PiBuildingOffice } from "react-icons/pi";
import { BsCollection } from "react-icons/bs";
import { CalendarDays } from "lucide-react";
import { TbUsersGroup } from "react-icons/tb";
import { MdGamepad, MdOutlineLiveHelp } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

const data = [
  { id: 1, name: "Home", icon: <RiHome5Line />, to: "/home" },
  {
    id: 2,
    name: "Marketplace",
    icon: <PiBuildingOffice />,
    to: "/marketplace",
  },
  { id: 3, name: "Collection", icon: <BsCollection />, to: "/collections" },
  { id: 4, name: "Events", icon: <CalendarDays />, to: "/events" },
  // { id: 5, name: "Community", icon: <TbUsersGroup />, to: "/community" },
  { id: 5, name: "Contest", icon: <MdGamepad />, to: "/contest" },
  // { id: 7, name: "Help", icon: <MdOutlineLiveHelp />, to: "/help" },
  // { id: 8, name: "Settings", icon: <IoSettingsOutline />, to: "/settings" },
];

export default data;
