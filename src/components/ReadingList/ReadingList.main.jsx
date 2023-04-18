import { useEffect, useState } from "react";
import { AnimatePresence, Reorder, motion } from "framer-motion";
import { GoPlus } from "react-icons/go";
import { RxCheck, RxCross2 } from "react-icons/rx";
import { BiLinkExternal } from "react-icons/bi";
import { Colors } from "./Colors";

const dummyList = [
  {
    id: 1,
    title: "This is Article No 1",
    author: "Baishali Datta",
    created: "2 days ago",
    read: false,
    tags: ["React", "Web Dev", "Important"],
  },
  {
    id: 2,
    title: "This is Article No 2",
    author: "Baishali Datta",
    created: "2 days ago",
    read: false,
    tags: ["React", "Web Dev", "Important"],
  },
  {
    id: 3,
    title: "This is Article No 3",
    author: "Baishali Datta",
    created: "2 days ago",
    read: false,
    tags: ["React", "Web Dev", "Important"],
  },
];

export default function ReadingList() {
  const [list, setList] = useState([]);
  const [showAddBox, setShowAddBox] = useState(false);

  const addItem = (item) => {
    setList((prev) => [...prev, item]);
  };

  useEffect(() => {
    setList(dummyList);
  }, []);

  return (
    <div className="absolute right-24 top-10 bg-black text-gray-300 w-[350px] rounded-md">
      <div className="text-sm text-white pb-2 border-b border-gray-500 p-4">
        Maintain a list of books, articles or websites that you wish to read
      </div>
      <button
        className="ml-4 mt-4 bg-white-overlay text-sm text-white px-2 py-1 rounded-full hover:scale-105 duration-300 flex items-center"
        onClick={() => {
          setShowAddBox(true);
        }}
      >
        <span className="mr-1">Add</span>
        <GoPlus />
      </button>
      {showAddBox && (
        <AddItem addItem={addItem} setShowAddBox={setShowAddBox} />
      )}
      <Reorder.Group
        axis="y"
        onReorder={setList}
        values={list}
        className="max-h-[90vh] overflow-scroll"
      >
        {list &&
          list.length > 0 &&
          list.map((item) => (
            <Reorder.Item key={item.id} value={item}>
              <Item item={item} />
            </Reorder.Item>
          ))}
      </Reorder.Group>
    </div>
  );
}

const Item = ({ item }) => {
  return (
    <div className="flex shadow-md p-2 m-2 duration-300 ease-in border-b border-gray-600 hover:bg-white-overlay">
      <div className="flex-grow">
        <div className="text-base">{item.title}</div>
        <div className="flex text-xs">
          <div className="mr-4">{item.author}</div>
          <div className="underline flex items-center">
            <span className="mr-1">Link</span> <BiLinkExternal />
          </div>
        </div>

        {/* <div className="text-xs">{item.created}</div> */}
        <div className="flex my-2">
          {item.tags &&
            item.tags.length > 0 &&
            item.tags.map((tag) => (
              <Category
                text={tag}
                background={"bg-violet-200"}
                color="text-violet-900"
              />
            ))}
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex justify-center items-center p-1 bg-transparent hover:bg-black-overlay rounded-full mx-1">
          <div className="border border-white rounded-full w-4 h-4"></div>
        </div>
        <div className="flex justify-center items-center p-1 bg-transparent hover:bg-black-overlay bg-black rounded-full">
          <RxCross2 className="text-md" />
        </div>
      </div>
    </div>
  );
};

const Category = ({ text }) => {
  const randomIndex = Math.floor(Math.random() * (Colors.length - 1));
  console.log("randomIndex : ", randomIndex);
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

const AddItem = ({ setShowAddBox }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  return (
    <div className="p-4 text-sm">
      <div className="flex items-center justify-end">
        <div className="flex justify-center items-center p-1 bg-transparent hover:bg-white-overlay rounded-full mx-1">
          <RxCheck className="text-lg" />
        </div>
        <div
          className="flex justify-center items-center p-1 bg-transparent hover:bg-white-overlay bg-black rounded-full"
          onClick={() => {
            setShowAddBox(false);
          }}
        >
          <RxCross2 className="text-lg" />
        </div>
      </div>
      <input
        className="bg-transparent focus:border-none w-full focus:outline-none p-1"
        placeholder="Title"
      />
      <MotionLine />
      <input
        className="bg-transparent focus:border-none w-full focus:outline-none p-1"
        placeholder="URL"
      />
      <MotionLine />
      <input
        className="bg-transparent focus:border-none w-full focus:outline-none p-1"
        placeholder="Author"
      />
      <MotionLine />
    </div>
  );
};

const MotionLine = () => {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: 0.2, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay: 0.2, duration: 0.01 },
      },
    },
  };
  return (
    <motion.svg
      width="100%"
      height="1"
      viewBox="0 0 100% 1"
      initial="hidden"
      animate="visible"
      className={"mb-2"}
    >
      <motion.line
        x1="0"
        y1="0"
        x2="100%"
        y2="0"
        stroke="#ffffff"
        strokeWidth={3}
        variants={draw}
      />
    </motion.svg>
  );
};
