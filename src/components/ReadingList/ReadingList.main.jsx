import { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { GoPlus } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import ReadingListItem from "./ReadingListItem";
import AddItem from "./AddItem";

let readingListEntries = [
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

export default function ReadingList({ setShowReadingList }) {
  const [list, setList] = useState([]);

  const [showAddBox, setShowAddBox] = useState(false);

  const addItem = (item) => {
    setList((prev) => [...prev, item]);
  };

  useEffect(() => {
    setList(readingListEntries);
  }, []);

  return (
    <div className="absolute right-24 top-10 bg-black text-gray-300 w-[350px] rounded-md">
      <div
        className="float-right m-2 flex justify-center items-center p-1 bg-transparent hover:bg-white-overlay bg-black rounded-full"
        onClick={() => {
          setShowReadingList(false);
        }}
      >
        <RxCross2 className="text-md" />
      </div>
      <div className="text-sm text-white border-b border-gray-500 p-4">
        Maintain a list of books, articles or websites that you wish to read
      </div>
      <button
        className="ml-4 my-4 bg-white-overlay text-sm text-white px-2 py-1 rounded-full hover:scale-105 duration-300 flex items-center"
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
              {item.read === false && (
                <ReadingListItem item={item} setList={setList} />
              )}
            </Reorder.Item>
          ))}
      </Reorder.Group>

      <span className="text-sm text-white mx-4 border-b border-gray-500">
        Completed
      </span>

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
              {item.read === true && <ReadingListItem item={item} />}
            </Reorder.Item>
          ))}
      </Reorder.Group>
    </div>
  );
}
