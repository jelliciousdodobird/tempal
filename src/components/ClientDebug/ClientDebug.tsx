"use client";

export const ClientDebug = ({ value }: { value: any }) => {
  return (
    <button
      className="bg-black text-white p-4"
      onClick={() => console.log({ value })}
    >
      debug
    </button>
  );
};
