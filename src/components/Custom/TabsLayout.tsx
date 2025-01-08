import { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  url: string;
  tabs: {
    title: string;
    link: string;
  }[];
  children: ReactNode;
};

const TabsLayout = ({ url, tabs, children }: Props) => {
  return (
    <div className="rounded-2xl h-full flex flex-col">
      <div className="border-b bg-white sticky top-[48px] z-10">
        <div className="max-w-[1440px] flex items-center gap-10 mx-auto">
          {tabs.map((item) => (
            <Link
              to={`${url}${item.link}`}
              className={`flex items-center gap-3 px-3 text-[13px] pt-5 pb-3 text-gray-600 ${
                location.pathname.split("/")[
                  location.pathname.split("/").length - 1
                ] === item.link.split("/")[1] &&
                "font-semibold !text-black border-b-2 border-black"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="h-full">{children}</div>
    </div>
  );
};

export default TabsLayout;
