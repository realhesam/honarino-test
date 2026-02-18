import MiniCard from "@/ui/MiniCard";
import {
  PiShoppingCartFill,
  PiUserFill,
  PiUsersThreeFill,
} from "react-icons/pi";

const services = [
  {
    icon: <PiUsersThreeFill />,
    count: "1000",
    label: "تولیدی در هنرینو",
  },
  {
    icon: <PiShoppingCartFill />,
    count: "2000",
    label: "کالای متفاوت در هنرینو",
  },
  {
    icon: <PiUserFill />,
    count: "2000",
    label: "کاربر فعال در هنرینو",
  },
];

function Services() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {services.map((service) => (
        <MiniCard
          key={service.label}
          title={service.count}
          description={service.label}
          icon={service.icon}
        />
      ))}
    </div>
  );
}

export default Services;
