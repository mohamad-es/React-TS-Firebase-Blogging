import { PencilEdit02Icon } from "hugeicons-react";
import { Link } from "react-router";

type Props = {
  title: string;
  link: string;
  className?: string;
};

const LinkButton = ({ link, title, className }: Props) => {
  return (
    <Link className={`btn btn-primary ${className}`} to={link}>
      {title}
      <PencilEdit02Icon size={18}/>
    </Link>
  );
};

export default LinkButton;
