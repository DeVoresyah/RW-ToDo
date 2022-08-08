const Dropdown = ({ list, addItem }) => {
  return (
    <div
      id="dropdown"
      className="lef-0 max-h-select absolute top-0 z-10 w-full overflow-y-auto rounded bg-white shadow"
    >
      <div className="flex w-full flex-col">
        {list.map((item, key) => {
          return (
            <button
              key={key}
              className="w-full cursor-pointer rounded-t border-b border-gray-100 hover:bg-teal-100"
              onClick={() => addItem(item)}
            >
              <div className="relative flex w-full items-center border-l-2 border-transparent p-2 pl-2 hover:border-teal-100">
                <div className="flex w-full items-center">
                  <div className="mx-2 leading-6  ">{item}</div>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Dropdown
