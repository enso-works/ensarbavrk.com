import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';

export const AboutImage = ({ className }) => {
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  return (
    <div
     // className="flex items-center flex-shrink-0 mr-6 cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {isHovering ? (
        <Image src="/images/assets/enso.gif" className={className} width={240} height={240} alt="enso with his cat" />
      ) : (
        <Image src="/images/assets/static.png" className={className} width={240} height={240} alt="enso with his cat" />
      )}
    </div>
  );
};
