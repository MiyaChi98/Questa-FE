import { IconType } from "react-icons/lib";
import { MdAssignmentAdd } from "react-icons/md";

const FreeCard = (props:{
  MdIcon: IconType,
  name: string
}) => {
  const {MdIcon,name} = props
  return (
    <div className="relative mt-20 bg-white/75 flex w-[200px] justify-center rounded-[20px] pb-4 ">
      <div className="absolute -top-12 bg-white/75 flex h-24 w-24 items-center justify-center rounded-full border-[4px] ">
      < MdIcon className="h-14 w-14 text-indigo-900	" />
      </div>

      <div className="mt-16 flex h-fit flex-col items-center">
        <p className="text-[26px] font-bold text-indigo-900	">{name}</p>
      </div>
    </div>
  );
};

export default FreeCard;
