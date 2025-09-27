interface DotProps {
  color: string;
}

const DotIcon = ({ color }: DotProps) => (
  <span className="relative flex size-3">
    {" "}
    <span
      className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75`}
      style={{
        backgroundColor: color,
      }}
    ></span>{" "}
    <span
      className={`relative inline-flex size-3 rounded-full`}
      style={{
        backgroundColor: color,
      }}
    ></span>
  </span>
);

export default DotIcon;
