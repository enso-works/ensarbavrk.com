import Error from 'next/error';

export default function Page({ errorCode }) {
  console.log(errorCode);
  return (
    <main>
      <p>
        Ooops! I have nothing to hide from you, really there is nothing here.
      </p>
    </main>
  );
}
