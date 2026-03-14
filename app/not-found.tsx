import { FadeIn } from "@/components/fade-in";
import Link from "next/link";
import { LuChevronRight, LuSearchX } from "react-icons/lu";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <FadeIn
        targetChildren
        className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-[#01A7E1] to-[#0196C9]">
            <LuSearchX className="h-10 w-10 text-white" />
          </div>

          <h1 className="font-bold-slanted mt-8 text-4xl text-gray-900 sm:text-5xl lg:text-6xl">
            <span className="block tracking-tight uppercase">Page</span>
            <span className="block bg-gradient-to-r from-[#01A7E1] to-[#0196C9] bg-clip-text tracking-tight text-transparent uppercase">
              Not Found
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#01A7E1] to-[#0196C9] px-6 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#01A7E1]/25"
          >
            Return Home
            <LuChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
