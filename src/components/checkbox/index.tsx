const Checkbox = (props: {
  id?: string;
  extra?: string;
  color?:
    | "red"
    | "blue"
    | "green"
    | "yellow"
    | "orange"
    | "teal"
    | "navy"
    | "lime"
    | "cyan"
    | "pink"
    | "purple"
    | "amber"
    | "indigo"
    | "gray";
  value?: string;
}) => {
  const { extra, color, id, value } = props;
  return (
    <input
      id={id}
      type="checkbox"
      value={value}
      className={`relative flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] text-brand-600 bg-gray-100 border-brand-300 rounded focus:ring-brand-500 focus:ring-2 `}
    />
  );
};

export default Checkbox;
