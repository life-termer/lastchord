"use client";

export default function Error({ error, reset }) {
  return (
    <main className="text-center space-y-16 t-4 h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-semibold uppercase">
        Something went wrong!
      </h1>
      <p className="text-lg">{error.message}</p>
      Try again
    </main>
  );
}
