import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { 
 LayoutGrid, Users2, ChartNoAxesCombined, 
  HousePlus, Truck, ShoppingBag, UserRoundCog, TicketPercent, 
} from "lucide-react";

interface SidebarProps {
  showSidebar: boolean;
}

const sidebarGroups = [
  {
    title: "GENERAL",
    links: [
      { title: "Dashboard", icon: ChartNoAxesCombined, href: "/dashboard" },
      { title: "Category", icon: LayoutGrid, href: "/dashboard/categories" },
      { title: "Products", icon: HousePlus, href: "/dashboard/products" },
      { title: "Orders", icon: ShoppingBag, href: "/dashboard/orders" },
      { title: "Coupons", icon: TicketPercent, href: "/dashboard/coupons" },

    ],
  },
  {
    title: "USERS",
    links: [
      { title: "Users", icon: Users2, href: "/dashboard/users" },
      { title: "Role", icon: UserRoundCog, href: "/dashboard/role" },
     
    ],
  },
  {
    title: "OTHER",
    links: [
      { title: "Delivery", icon: Truck, href: "/dashboard/delivery" },
    ],
  },
];

export default function Sidebar({ showSidebar }: SidebarProps) {
  return (
    <div
      className={clsx(
        "fixed flex flex-col w-[260px] h-screen top-0 z-50 border-r bg-card shadow-md transition-all",
        {
          "-left-[260px] lg:left-0": !showSidebar,
          "left-0 shadow-black shadow-lg lg:shadow-none": showSidebar,
        }
      )}
    >
      {/* Logo */}
      <div className="p-4 flex justify-center items-center">
        <Link href="/dashboard">
          <Image
            src="/logo 2.png" // Đường dẫn logo
            alt="Logo"
            width={120} // Kích thước logo
            height={40}
            className="cursor-pointer"
          />
        </Link>
      </div>

      {/* Điều hướng Sidebar theo nhóm */}
      <nav className="p-4 space-y-4">
        {sidebarGroups.map((group, index) => (
          <div key={index}>
            <h2 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
              {group.title}
            </h2>
            <div className="space-y-2">
              {group.links.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-all"
                >
                  <item.icon size={20} />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

    </div>
  );
}
