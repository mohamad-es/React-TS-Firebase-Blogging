import { Link, useLocation } from "react-router-dom";

type Props = {
  list: {
    title: string;
    link: string;
  }[];
};

const Navbar = ({ list }: Props) => {
  const location = useLocation();
  return (
    <div className="flex justify-between items-center ps-16 py-2 z-20">
      <div className="flex gap-5">
        {list.map((item) => (
          <Link
            key={item.title}
            className={`c-gray ${location.pathname === item.link && "font-semibold c-black"}`}
            to={`${item.link}`}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
