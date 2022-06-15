import { useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import NavBarItem from "./NavBarItem";


const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    return (
        <nav className="w-full flex md:justify-center justify-between items-center p-4">
            <div className="md:flex-[0.5] flex-initial justify-center items-center">
            <div className="text-white text-lg">Lora</div>
            </div>
            <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                {["News portal", "Crypto currency bot"].map((item, index) => (
                    <NavBarItem key={item + index} title={item} />
                ))}
            </ul>
            <div className="flex relative">
            {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            {["News portal", "Crypto currency bot"].map(
              (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
            )}
          </ul>
        )}
            </div>
        </nav>
    )
}

export default Navbar;