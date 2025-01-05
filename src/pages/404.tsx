import Link from 'next/link';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

interface NotFoundProps {
  gifUrl: string;
}

export const getStaticProps: GetStaticProps<NotFoundProps> = async () => {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=confused&rating=g`
    );
    const data = await response.json();
    
    return {
      props: {
        gifUrl: data.data.images.original.url,
      },
      // Revalidate every hour
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching gif:', error);
    return {
      props: {
        gifUrl: '', // or a default fallback GIF URL
      },
    };
  }
};

export default function NotFound({ gifUrl }: NotFoundProps) {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-[#313131] text-[#ffffff] overflow-hidden">
      {gifUrl && (
        <Image
          src={gifUrl}
          alt="Random confused gif"
          objectFit="cover"
          className="opacity-50"
          fill
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
          className=" text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-[#0090C0] transition duration-300 ease-in-out inline-flex items-center">
          <ArrowLeft className="h-5 w-5 mr-2 animate-[pointing_1s_ease-in-out_infinite]" />
          Return to Safety
        </Link>
      </div>
    </div>
  );
}
