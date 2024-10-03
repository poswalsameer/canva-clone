'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Layers, Image, Type, Palette, Share2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from "react"

export default function Component() {
  
  const router = useRouter();

  // NEXT AUTH REMOVED FOR NOW 
  // console.log("The google client id is: ", process.env.GOOGLE_CLIENT_ID);
  // const { status } = useSession();
  // const handleLogin = async () => {
  //   const response = await signIn('google', { redirect: false });
  //   if (response?.ok) {
  //     router.push('/projects');
  //   }
  // };
  // useEffect(() => {
  //   if (status === "authenticated") {
  //     router.push('/projects');
  //   }
  // }, [status, router]);

  // REMOVED NEXT AUTH CODE FOR EASIER NAVIGATION 
  const handleLogin = () => {
    router.push('/projects');
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Layers className="h-6 w-6 text-purple-400" />
          <span className="ml-2 text-2xl font-bold text-purple-400">Pixel</span>
        </Link>
        
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-16 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Edit Images Like a Pro with Pixel
                </h1>
                
              </div>

              <div className="">
                <Button className="h-10 w-32 bg-purple-600 text-white hover:bg-purple-700 rounded-sm" 
                onClick={handleLogin}
                >
                  Get Started
                </Button>  
              </div>
            </div>
          </div>
        </section>

      </main>

    </div>
  )
}
