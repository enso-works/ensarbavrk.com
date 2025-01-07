import { H1, P } from '@/atoms/Typography';
import { AboutImage } from '@/molecules/AboutImage';

export const BlogHero = () => {
  return (
    <div className="container mx-auto px-4 py-24 max-w-3xl">
      <div className="flex flex-col items-center md:flex-row md:items-start md:gap-12">
        <AboutImage
          className="rounded-full aspect-square w-48 h-48 md:mb-0 mb-6 
                shadow-lg 
                ring-1 ring-[--color-text-secondary]/10
                bg-gradient-to-b from-[--color-text-accent]/5 to-transparent
                relative
                after:absolute after:inset-0 
                after:rounded-full 
                after:shadow-[0_0_140px_52px_rgba(0,167,220,0.8)]
                hover:after:shadow-[0_0_160px_20px_rgba(0,167,220,0.5)] 
                after:transition-shadow
                transition-transform
                hover:scale-[1.01]
                duration-300"
        />
        <div className="flex-1 text-center md:text-left">
          <H1 className="text-5xl font-bold mb-6">Hi, I'm Enso.</H1>
          <P className="text-xl">
            I build things and enjoy programming, designing, console logging,
            and all things outside!
          </P>
          <P className="text-muted-foreground">
            Currently making the{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://uva.me/"
              className="text-sky-500 hover:text-sky-600 transition-colors">
              @uva.me
            </a>{' '}
            app!
          </P>
        </div>
      </div>
    </div>
  );
};
