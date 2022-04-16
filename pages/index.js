import Head from 'next/head';
import Features from '../components/Features'
import Footer from '../components/Footer';
import Hero from '../components/Hero'
import Nav from '../components/Nav'
import Products from '../components/Products';
import Swap from '../components/Swap';

export default function Home() {
  return (
    <div className='bg-[#100C18]'>
      <Nav render />
      <div className='lg:max-w-[60%] max-w-[95%] mx-auto '>
        <div className='absolute top-0 hidden lg:block bg-deco_bg right-0 w-[17rem] h-full bg-no-repeat'></div>
        <Hero />
        <div className='lg:w-full w-[98%] mx-auto pb-16'>
        <img 
            src="/img/center.png"
            alt="Logo"
            className='w-full h-full'
        />
      </div>
        <Features />
      </div>
      <Products />
      <Swap />
      <Footer />
    </div>
  )
}
