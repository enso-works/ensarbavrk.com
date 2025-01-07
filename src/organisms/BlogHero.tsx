import { AboutImage } from '@/molecules/AboutImage';

export const BlogHero = () => {
  return (
    <div className="container mx-auto px-4 py-24 max-w-3xl">
      <div className="flex flex-col items-center md:flex-row md:items-start md:gap-12">
        <AboutImage className="rounded-full aspect-square w-48 h-48 md:mb-0 mb-6" />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl font-bold mb-6">Hi, I'm Enso.</h1>
          <p className="text-xl text-muted-foreground mb-4">
            I build things and enjoy programming, designing, console logging,
            and all things outside!
          </p>
          <p className="text-lg">
            Currently making the{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://uva.me/"
              className="text-sky-500 hover:text-sky-600 transition-colors">
              @uva.me
            </a>{' '}
            app!
          </p>
        </div>
      </div>
    </div>
  );
};
