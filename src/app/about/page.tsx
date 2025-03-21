'use client';

import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-16 text-center rounded-lg shadow-lg dark:bg-gray-900 bg-gray-100 my-28">
      <h1 className="text-5xl font-extrabold dark:text-white text-gray-900 mb-8">About EliteX Watch</h1>
      <p className="text-xl dark:text-gray-300 text-gray-700 mb-8 leading-relaxed">
        Welcome to <span className="font-semibold dark:text-gray-100 text-black">EliteX Watch</span>, where craftsmanship meets innovation. 
        We specialize in designing and delivering timepieces that embody sophistication, precision, and timeless elegance.
      </p>
      <div className="flex justify-center mb-12">
        <Image 
          src="/eliteX.png" 
          alt="EliteX Watch Logo" 
          width={180} 
          height={180} 
          objectFit="cover"
          className="rounded-full border-4 dark:border-gray-700 border-gray-300 shadow-lg"
        />
      </div>
      <p className="text-lg dark:text-gray-300 text-gray-700 mb-8 leading-relaxed">
        At <span className="font-semibold dark:text-gray-100 text-black">EliteX Watch</span>, we are committed to excellence. Each watch is meticulously crafted using 
        high-quality materials and advanced technology to ensure durability, accuracy, and style. Whether you seek a modern aesthetic or classic luxury, 
        our collection offers a diverse range to complement your unique personality and lifestyle.
      </p>
      <p className="text-lg dark:text-gray-300 text-gray-700 mb-8 leading-relaxed">
        Our mission is to redefine elegance and make luxury accessible. We take pride in delivering unparalleled customer service, ensuring every 
        experience with us is exceptional. Join us in embracing the art of timekeeping with <span className="font-semibold dark:text-gray-100 text-black">EliteX Watch</span> – because every second matters.
      </p>
      <div className="mt-10">
        <a 
          href="/shop" 
          className="bg-black text-white py-3 px-6 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          Explore Our Collection
        </a>
      </div>
    </div>
  );
}