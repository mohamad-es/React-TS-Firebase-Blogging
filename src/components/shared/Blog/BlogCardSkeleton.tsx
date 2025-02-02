import { Image01Icon } from "hugeicons-react";

const BlogCardSkeleton = () => {
  return (
    <div className="border rounded-2xl overflow-hidden col-span-1 flex flex-col bg-white">
      <div className="w-full skeleton h-52 flex items-center justify-center relative border-b">
        <Image01Icon size={100} className="text-gray-600" />
      </div>
      <div className="p-6 flex flex-col justify-between flex-1">
        <div className="h-8  skeleton"></div>
        <div className="h-2 w-1/2 mt-3 skeleton"></div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
