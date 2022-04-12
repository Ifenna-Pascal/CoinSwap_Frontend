import Image from 'next/image'
import Link from 'next/link'
import React, {useState, useEffect} from 'react';
import { Transition } from '@headlessui/react';
import { useRouter } from 'next/router';


function Nav() {
    const router = useRouter();
    const [scrollNav, setScrollNav] = useState(false);
    const [show, setShow] = useState(false);
    const changeNav = () => {
        if (window.scrollY >= 80) {
            setScrollNav(true);
        } else {
            setScrollNav(false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', changeNav);
    }, []);
  return (
    <nav className={`${ scrollNav ? "bg-gray-800 bg-opacity-70" : "bg-transparent" } sticky z-50 top-0 w-full ${ scrollNav ? "py-4" : "py-8" }`}>
        <div className='flex justify-between px-8 items-center'>
           <div className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setShow(!show)} className="h-6 text-gray-300 lg:hidden w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                <Image 
                    src="/img/coin_logo.png"
                    alt="Logo"
                    width={scrollNav ? 40 : 50 }
                    height= { scrollNav ? 40 : 50}
                />
                <span className='hidden lg:flex font-bold text-white font-Catamaran text-2xl'>Coinswap</span>
           </div>
            <div className='flex space-x-8'>
            <ul className='hidden lg:flex items-center space-x-12'>
                <li className='text-gray-400 hover:text-[#12FFB8] text-xl tracking-wider font-semibold  font-Catamaran'>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </li>
                <li className='text-gray-400 hover:text-[#12FFB8] text-xl tracking-wider font-semibold  font-Catamaran'>
                    <Link href="/Swap">
                        <a>SWAP</a>
                    </Link>
                </li>
                <li className='text-gray-400 hover:text-[#12FFB8] text-xl tracking-wider font-semibold  font-Catamaran'>
                    <Link href="/">
                        <a>Yeild Farm</a>
                    </Link>
                </li>
                <li className='text-gray-400 hover:text-[#12FFB8] text-xl tracking-wider font-semibold  font-Catamaran'>
                    <Link href="/">
                        <a>Doc</a>
                    </Link>
                </li>
            </ul>
            <button onClick={() => router.push('/dashboard')} className='py-2 flex hover:border-2px hover:border-white px-8 border-[1px] bg-transparent text-white font-bold border-[#58555E] rounded-xl text-lg md:text-xl lg:text-2xl'>
                    Go to Dapp
                </button>
            </div>
        </div>
        <Transition
            show={show}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
        >
        <ul className='flex z-20 lg:hidden flex-col px-8 w-[50%] items-start py-8 bg-gray-900  h-screen space-y-12'>
            <li className='text-gray-400 hover:text-[#12FFB8] text-xl tracking-wider font-semibold  font-Catamaran'>
                <Link href="/">
                    <a>Home</a>
                </Link>
            </li>
            <li className='text-gray-400 hover:text-[#12FFB8] text-xl tracking-wider font-semibold  font-Catamaran'>
                <Link href="/">
                    <a>SWAP</a>
                </Link>
            </li>
            <li className='text-gray-400 hover:text-[#12FFB8] text-xl tracking-wider font-semibold  font-Catamaran'>
                <Link href="/">
                    <a>Yeild Farm</a>
                </Link>
            </li>
            <li className='text-gray-400 hover:text-[#12FFB8] text-xl tracking-wider font-semibold  font-Catamaran'>
                <Link href="/">
                    <a>Doc</a>
                </Link>
            </li>
        </ul>
        </Transition>
    </nav>
  )
}

export default Nav