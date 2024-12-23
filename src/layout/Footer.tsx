import { layout_data } from "src/data/layout";

const Footer = () => {
  return (
    <div className="text-center pt-10 p-5">
      <div>{layout_data.footer.title}</div>
      <div className="mt-2 text-sm text-gray-600">
        {layout_data.footer.subTitle}
      </div>
    </div>
  );
};

export default Footer;
