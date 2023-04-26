import { Tooltip } from "react-tooltip";
import { BiLinkExternal } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { Colors } from "./Colors";

export default function ReadingListItem({ item, setList }) {
  return (
    <div className="flex shadow-md p-2 m-2 duration-300 ease-in border-b border-gray-600 hover:bg-white-overlay">
      <Tooltip
        id="reading-list-tooltip"
        className="px-2 py-1 text-xs bg-black-50 text-gray-300"
      />
      <div className="flex-grow">
        <div className="text-base">{item.title}</div>
        <div className="flex text-xs">
          <div className="mr-4">{item.author}</div>
          <div className="underline flex items-center">
            <span className="mr-1">Link</span> <BiLinkExternal />
          </div>
        </div>
        <div className="flex my-2">
          {item.tags &&
            item.tags.length > 0 &&
            item.tags.map((tag) => (
              <Category
                key={tag}
                text={tag}
                background={"bg-violet-200"}
                color="text-violet-900"
              />
            ))}
        </div>
      </div>
      <div className="flex items-center">
        {item.read === false && (
          <div
            data-tooltip-id="reading-list-tooltip"
            data-tooltip-content="Mark as read"
            className="flex justify-center items-center p-1 bg-transparent hover:bg-black-overlay rounded-full mx-1"
            onClick={() => {
              setList((list) => {
                const newList = list.map((el) => {
                  console.log("1 : ", el);
                  if (el.id === item.id) {
                    el.read = true;
                  }
                  return el;
                });
                console.log("newList : ", newList);
                return newList;
              });
            }}
          >
            <div className="border border-white rounded-full w-4 h-4"></div>
          </div>
        )}
        <div
          data-tooltip-id="reading-list-tooltip"
          data-tooltip-content="Delete"
          className="flex justify-center items-center p-1 bg-transparent hover:bg-black-overlay bg-black rounded-full"
        >
          <RxCross2 className="text-md" />
        </div>
      </div>
    </div>
  );
}

const Category = ({ text }) => {
  const randomIndex = Math.floor(Math.random() * (Colors.length - 1));
  const background = Colors[randomIndex].bg;
  const textColor = Colors[randomIndex].text;
  return (
    <div
      className={`rounded-full px-2 mr-1 text-xs ${background} ${textColor}`}
    >
      {text}
    </div>
  );
};
