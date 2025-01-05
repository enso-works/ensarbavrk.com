import Error from 'next/error';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  const [gifUrl, setGifUrl] = useState('');

  useEffect(() => {
    const fetchRandomGif = async () => {
      try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/random?api_key=4tnqe7BZv9r72d6bl62H51JZ1SVhgZXY&tag=confused&rating=g`
        );
        const data = await response.json();
        setGifUrl(data.data.images.original.url);
        console.log(data.data.images.original.url);
      } catch (error) {
        console.error('Error fetching gif:', error);
      }
    };

    fetchRandomGif();
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-[#313131] text-[#ffffff] overflow-hidden">
      {gifUrl && (
        <Image
          src={gifUrl}
          alt="Random confused gif"
          layout="fill"
          objectFit="cover"
          className="opacity-30"
          priority
        />
      )}
      <div className="z-10 text-center p-8">
        <h2 className="text-4xl font-semibold text-[#edf2f7] mb-6">
          Page Not Found
        </h2>
        <p className="text-xl text-[#edf2f7] mb-8 max-w-md mx-auto">
          Oops! It seems you've ventured into uncharted digital territory.
        </p>
        <Link
          href="/"
          className="bg-[#00A7DC] text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-[#0090C0] transition duration-300 ease-in-out inline-flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Return to Safety
        </Link>
      </div>
    </div>
  );
}
