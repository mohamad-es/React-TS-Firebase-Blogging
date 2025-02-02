import { Image01Icon } from "hugeicons-react";

const EditBlogSkeleton = () => {
  return (
    <div className="w-screen max-w-[1440px] mx-auto">
      <div className="grid grid-cols-12 relative gap-10 pt-10">
        <div className="col-span-8 border rounded-xl overflow-hidden">
          <div className="w-full skeleton border-b h-96 flex items-center justify-center">
            <Image01Icon size={150} color="gray" />
          </div>
          <div className="p-10">
            <h1 className="skeleton w-full h-10 mb-10"></h1>
            <div className="skeleton w-full mb-2 h-3"></div>
            <div className="skeleton w-full h-3"></div>
          </div>
        </div>
        <div className="col-span-3 flex">
          <div className="fixed w-52">
            <div>
              <div className="font-semibold text-sm">Writter</div>
              <div className="skeleton w-full mt-2 h-5 !rounded-md"></div>

              <div className="font-semibold text-sm mb-2 mt-7">Created Time</div>
              <div className="skeleton w-full mt-2 h-5 !rounded-md"></div>

              <div className="font-semibold text-sm mb-2 mt-7">Update Time</div>
              <div className="skeleton w-full mt-2 h-5 !rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlogSkeleton;
