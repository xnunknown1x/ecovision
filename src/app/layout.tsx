import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import Image from 'next/image'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'EcoVision',
  description: 'Green',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <header className="flex justify-between items-center p-4 gap-4 h-16 bg-green-300 text-white shadow-md">
            <div className="flex items-center gap-2">
              <Image src={"/EcoVisionLogo.png"} width={50} height={50} alt='EcoVision Logo'/>
              {/* <img src="/globe.svg" alt="EcoVision Logo" className="w-10 h-10" /> */}
              <span className="font-bold text-xl tracking-tight hidden sm:inline" style={
                {color:"black"}
              }>EcoVision</span>
            </div>
            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton>
                  <button className="bg-black hover:bg-green-500 text-white rounded-full font-semibold text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8 shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="bg-white border border-green-600 hover:bg-green-50 text-green-700 rounded-full font-semibold text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8 shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}