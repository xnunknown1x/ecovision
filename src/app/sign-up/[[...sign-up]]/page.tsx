

import Link from 'next/link';
import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative rounded-2xl shadow-2xl p-6 sm:p-10 w-full max-w-md mx-4">
        <Link href="/" className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold" aria-label="Close">
          &times;
        </Link>
        <SignUp appearance={{ elements: { card: 'shadow-none', rootBox: 'w-full' } }} />
      </div>
    </div>
  );
}