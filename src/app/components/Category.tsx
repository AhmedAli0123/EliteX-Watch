'use client';

import Image from 'next/image';
import Link from 'next/link';

const categories = [
  { name: 'Smartwatches', image: '/smart-watches.webp', link: '/shop/smart-watch' },
  { name: "Ladie's Watches", image: '/female-watchs.webp', link: '/shop/female-watch' },
  { name: "Men's Watches", image: '/mens-watch.avif', link: '/shop/mens-watch' },
  { name: 'Sports Watches', image: '/sport-watches.jpeg', link: '/shop/sport-watch' },
];

const WatchCategories = () => {
  return (
    
    <div className="flex justify-center items-center min-h-screen px-4">
      <section className="w-full max-w-6xl bg-[#F0F0F0] dark:bg-gray-900 rounded-[40px] p-6 md:p-10 my-5">
        <h2 className="text-center font-bold text-3xl md:text-5xl mb-8 text-gray-900 dark:text-white">
          BROWSE BY CAT<span className="text-blue-600 dark:text-blue-400">EGORY</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 cursor-pointer">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl group transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <Link href={category.link}>
              <Image
                src={category.image}
                alt={category.name}
                width={600}
                height={400}
                className="w-full h-64 md:h-80 object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 dark:bg-opacity-60 flex items-center justify-center text-white text-xl md:text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {category.name}
              </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WatchCategories;
