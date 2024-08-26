const Skeleton = ({ className = '' }) => {
  return (
    <div className={`bg-zinc-700 rounded-md animate-pulse ${className}`}></div>
  );
};

export default Skeleton;
