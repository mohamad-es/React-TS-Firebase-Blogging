import { about_data } from "src/data/about";
import person from 'src/assets/Mohammad.png'
import { Github01Icon, Link01Icon } from "hugeicons-react";

const About = () => {
  return (
    <div>
      <h1 className="mb-3">{about_data.title}</h1>
      <p>{about_data.description}</p>

      <div>
        {about_data.list.map((item) => (
          <div className="mt-12">
            <h2 className="mb-5">{item.title}</h2>
            <ul className="list-inside list-disc">
              {item.list.map((value) => (
                <li className="py-1">{value}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex rounded-full h-60 w-60 overflow-hidden mx-auto">
        <img
          src={person}
          className="object-cover translate-y-20 translate-x-20 scale-150 w-full h-full"
          alt=""
        />
      </div>
      <div className="flex justify-center w-full mt-4">
        <a href="" className="flex items-center gap-2 text-blue-500 mx-auto">
          Mohammad Esmaeilpour Github <Github01Icon size={20} />
        </a>
      </div>
    </div>
  );
};

export default About;
