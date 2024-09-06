import React, { useState } from 'react'
import { IoIosArrowDropdownCircle } from "react-icons/io";

type SelectOption = {
  id: number;
  name: string;
}

type Props = {
  list: SelectOption[];
  selected: number | null;
  setSelected: (select: number) => void;
}

const CategoryDropdown = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setOpen(prevOpen => !prevOpen);
  }

  const selectOption = (id: number) => {
    props.setSelected(id);
    setOpen(false);
  }

  const currSelection = props.list.find(item => item.id === props.selected) || { name: 'Select a category' };

  return (
    <div className='my-6'><button type='button' onClick={toggleOpen} className='flex justify-between items-center gap-2 px-3 py-3 border border-[#0f277b] text-[#0f277b] rounded-md'>{currSelection.name} <IoIosArrowDropdownCircle className='w-5 h-5' /></button>
      {
        open ? (
          <div className='absolute mt-2 bg-white text-[#0f277b] rounded-md border border-[#0f277b]'>
            {props.list.map((item) => (
              <div className="px-3 py-2 hover:bg-[#0f277b] hover:text-white cursor-pointer" key={item.id} onClick={() => selectOption(item.id)}>{item.name}</div>
            ))}
          </div>
        ) : null

      }
    </div>
  )
}

export default CategoryDropdown