import React from 'react'
import type { Category } from '@prisma/client'

export type CategorySelectorProps = {
  categories: Category[]
}

type CategorySelectorPropsWithState = CategorySelectorProps & {
  selectCategory: (id: number | null) => void,
  selectedCategoryId: number | null
}

export const CategorySelector = (props: CategorySelectorPropsWithState) => {
  

  return (
    <div className='flex  flex-col justify-center my-4'>
      <div className='flex justify-center flex-wrap mt-16'>
        {
          props.categories.map((category, index) => (
            <button key={category.id}
              onClick={() => props.selectCategory(category.id)}
              className='inline-block rounded-full sm:text-xl text-lg px-4 py-2 text-white mr-4 mb-5 bg-[#0f277b]'>{category.name}</button>
          ))
        }
      </div>
      {props.selectedCategoryId ? <button className="cursor-pointer text-[#0f277b] underline" key="remove selection" onClick={() => props.selectCategory(null)}>
        Remove Selection
      </button> : null}
    </div>
  )
}