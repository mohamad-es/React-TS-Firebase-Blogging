const UserProfileCardSkeleton = () => {
  return (
    <div className="flex gap-3 justify-between items-center text-sm">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 skeleton !rounded-full" />
        <div className="w-40 h-2 skeleton" />
      </div>
    </div>
  );
};

export default UserProfileCardSkeleton;
