"use client";
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import GifSearch from '../app/gif-search/page';
import { useState } from 'react';
import profileImg from '../../public/Profile.png';
import Image from 'next/image';
import logoSvg from '../../public/logo.svg';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Gif {
  id: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
  title: string;
}

export default function Home() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });

  const [favorites, setFavorites] = useState<Gif[]>([]);

  const addToFavorites = (gif: Gif) => {
    setFavorites((prevFavorites) => [...prevFavorites, gif]);
  };

  const removeFromFavorites = (gifId: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== gifId));
  };

  return (
    <div className="p-8 min-h-screen">
      <div>
        <div className="flex items-center justify-center gap-4 mb-16 lg:mb-12">
          <Image
            src={logoSvg}
            alt="Logo"
            width={60} // Adjust width based on your design
            height={40} // Adjust height based on your design
            layout="fixed"
          />
          <h2 className="text-center text-white text-3xl font-bold">GiphyGIFer</h2>
        </div>

        <div className="flex items-center justify-between w-full mb-3 pb-3">
          <div className="flex items-center justify-center">
            <div className="rounded-full w-12 h-12 mr-3 items-center justify-center">
              <Image
                src={profileImg}
                alt="Profile Image"
                width={40}
                height={40}
                layout="fixed"
                objectFit="cover"
              />
            </div>
            <div className="text-white hidden lg:flex items-center">{session?.data?.user?.email}</div>
          </div>
          {/* Only icon for mobile devices */}
          <button
            onClick={() => signOut()}
            className="text-white bg-indigo-500 rounded-md py-1.5 px-3 focus:outline-none lg:hidden"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>

          {/* Icon + button name for larger devices */}
          <button
            onClick={() => signOut()}
            className="text-white bg-indigo-500 rounded-md py-1.5 px-3 hidden lg:flex items-center"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Logout
          </button>
        </div>
        <hr style={{ width: '90%', margin: '0px auto 50px' }} />

        <GifSearch addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} />

        <div className="mt-8">
          <h2 className="text-white text-2xl font-bold mb-4">Favorites</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.map((fav) => (
              <div key={fav.id} className="relative">
                <img src={fav.images.fixed_height.url} alt={fav.title} className="cursor-pointer rounded-md overflow-hidden bg-white/20 backdrop-blur-md p-4 mx-auto object-cover" />
                <button
                  onClick={() => removeFromFavorites(fav.id)}
                  className="absolute top-2 right-2 bg-white/5 text-white rounded-full p-1 focus:outline-none"
                >
                  ❤️
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 mt-8 text-center text-white" style={{ color: '#6c4ee5', opacity:'0.7' }}>
        <p className="mb-1">
          © Designed And Developed By <a href="https://www.instagram.com/_mire_patel_/" className="font-bold text-indigo-500" target="_blank" rel="noopener noreferrer">Mire Patel</a>
        </p>
      </div>


    </div>
  );
}

Home.requireAuth = true;
