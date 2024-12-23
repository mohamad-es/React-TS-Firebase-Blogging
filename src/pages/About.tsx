import mohammad from "src/assets/Mohammad.png";

const About = () => {
  return (
    <div>
      <div className="">
        <div className="w-40 h-40 overflow-hidden rounded-full relative col-span-2">
          <img
            src={mohammad}
            alt=""
            className="absolute h-full w-full object-cover scale-150 start-5 object-top top-7"
          />
        </div>
        <div className="col-span-10">
          👋 hi my name is <strong>Mohammad Esmaeilpour</strong> and Im the
          developer of this blog app.
          This app devloped just showing my skill on react and typescript with firebase api's.
        </div>
      </div>
    </div>
  );
};

export default About;
