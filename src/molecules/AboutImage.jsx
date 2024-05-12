import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
export const AboutImage = ({ className }) => {
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {isHovering ? (
        <Img className={className} path={'/images/assets/enso.gif'} />
      ) : (
        <Img className={className} path={'/images/assets/static.png'} />
      )}
    </div>
  );
};

const Img = ({path, className}) => (
  <Image
    style={{
      objectFit: 'contain', // cover, contain, none
    }}
    src={path}
    className={className}
    width={189}
    height={180}
    alt="enso with his cat"
  />
);
