import { reuseClasses } from "@/components/common/reuseClasses";
import { NavItemType } from "@/types/LayoutTypes";
import Link from "next/link";

interface PropsType {
  item: NavItemType;
  isActive?: boolean;
}

const NavItems = ({ item, isActive }: PropsType) => {
  const { backgroundGradients } = reuseClasses();

  return (
    <Link
      key={item.page}
      href={`/${item.page.toLowerCase()}`}
      className={`group flex items-center gap-3 rounded-lg px-2 2xl:px-3 py-2 2xl:py-3 text-sm font-medium transition-all ${
        isActive
          ? `${backgroundGradients} text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]`
          : "text-slate-400 hover:bg-white/4] hover:text-slate-200"
      }`}
    >
      <div
        className={`flex h-8 2xl:h-10 w-8 2xl:w-10 items-center justify-center rounded-lg transition ${
          isActive
            ? "bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-400/20"
            : "bg-white/4 text-slate-400 group-hover:bg-white/8"
        }`}
      >
        <item.icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-xs 2xl:text-sm">{item.name}</p>
      </div>
    </Link>
  );
};

export default NavItems;
