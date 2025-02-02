import { Image01Icon } from "hugeicons-react";

const FeaturedBlogSkeleton = () => {
  return (
    <div className="flex gap-16 mb-20 w-full max-w-[1440px] mx-auto pt-10">
      <div className="flex-1 flex flex-col justify-between">
        <div className="w-full">
          <div className="w-20 h-4 skeleton"></div>
          <div className="mt-6 skeleton h-10"></div>
          <div className="mt-2 mb-14 block w-full skeleton h-10"></div>
        </div>
        <div className="flex gap-5 mt-12 justify-between items-center">
          <div className="h-5 w-44 skeleton"></div>
          <div className="h-5 w-44 skeleton"></div>
        </div>
      </div>

      <div className="flex-1">
        <div className="!rounded-2xl border flex items-center overflow-hidden justify-center h-72 skeleton">
          <Image01Icon size={150} color="gray" />
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogSkeleton;
