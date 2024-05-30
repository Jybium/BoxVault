import React from 'react'
import { useModal } from '@/app/stores/context/modal'

const Card = () => {
  const {modal, setModal} = useModal()

  const handleToggleModal = () => {
    setModal(!modal); // Toggle the modal state
  };


  return (
    <div className='text-center grid gap-y-1 w-fit font-bold'onClick={handleToggleModal}>
      <p className='bg-buttons h-[13rem] w-[13rem] rounded-lg'></p>
      <p>Iconic Jerseys</p>
      <p className='text-gold font-thin '>#0001</p>
    </div>
  )
}

export default Card