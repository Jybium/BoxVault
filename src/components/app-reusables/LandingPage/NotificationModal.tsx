"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RiDeleteBinLine } from "react-icons/ri";
import { FaBell } from "react-icons/fa";


export function DropdownMenuModal() {

    const [showModal, setShowModal] = useState(false)

    const handleToogleModal = () => {
        setShowModal((prev) => !prev)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="hidden lg:grid">
                <FaBell color='#FFCB69' size={23}  />
            </DropdownMenuTrigger>


            <div className="relative">
               
                {/* {showModal && (
                    <div
                        className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-70 backdrop-blur-xl z-40"
                        onClick={handleToogleModal}
                    ></div>
                )} */}

                {/* Dropdown Menu Content */}
                <DropdownMenuContent className="relative z-50 w-[22rem] h-[50vh] overflow-y-auto text-white bg-hover mt-5">
                    <DropdownMenuLabel className="flex items-center justify-between p-2 mb-5 shadow-2xl drop-shadow-2xl">
                        <p>Notifications</p>
                        <RiDeleteBinLine size={20} />
                    </DropdownMenuLabel>

                    <DropdownMenuGroup className="grid gap-4 h-[50vh] overflow-y-auto">
                        {/* {data.map((item, index) => (
                            <DropdownMenuItem key={index} className="flex gap-3 items-start shadow-2xl drop-shadow-2xl py-3">
                                <p className="p-8 rounded-full bg-buttons"></p>
                                <div>
                                    <p className="">{item.title}</p>
                                    <p className="text-[11px] font-thin text-transparent bg-clip-text bg-gradient-to-r from-[#93B7BE] to-[#FFCB69]">{item.subtitle}</p>
                                    <p className="text-xs">{item.description}</p>
                                </div>
                            </DropdownMenuItem>
                        ))} */}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </div>

        </DropdownMenu>
    )
}
