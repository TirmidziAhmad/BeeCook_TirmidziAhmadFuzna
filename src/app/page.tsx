import Image from "next/image"
import Link from "next/link"
import { Mail } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarGroup,
} from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { categoryService, getImageUrl } from "@/lib/api"

const users = [
  { name: "Alya", initials: "A", image: "https://i.pravatar.cc/150?u=alya", className: "bg-amber-200 text-amber-950" },
  { name: "Bima", initials: "B", image: "https://i.pravatar.cc/150?u=bima", className: "bg-emerald-200 text-emerald-950" },
  { name: "Citra", initials: "C", image: "https://i.pravatar.cc/150?u=citra", className: "bg-rose-200 text-rose-950" },
]

export default async function Home() {
  let categories: { id: number | string; name: string; image?: string; file_id?: string }[] = []
  try {
    const data = await categoryService.getCategories()
    categories = Array.isArray(data) ? data : []
  } catch {
    categories = []
  }

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-20 top-[15%] h-[300px] w-[400px] bg-[#E8B431]/20 blur-[90px]" />
      
      <section className="relative z-10">
        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className="flex flex-col items-start">
            <h1 className="w-full font-semibold text-zinc-950 flex flex-col gap-1 sm:gap-2">
              <span className="text-[48px] sm:text-[64px] md:text-[74px] lg:text-[84px] leading-none tracking-[0.005em] font-semibold whitespace-nowrap">
                Where{" "}
                <span className="relative inline-block text-[#E8B431] font-extrabold">
                  Quality
                  <Image
                    src="/spark.png"
                    alt=""
                    width={74}
                    height={75}
                    className="pointer-events-none absolute -right-8 -top-7 size-8 sm:-right-12 sm:-top-10 sm:size-11 md:size-14 md:-right-14"
                  />
                </span>
              </span>
              <span className="text-[38px] sm:text-[50px] md:text-[58px] lg:text-[64px] leading-none tracking-[0.005em] font-semibold">
                Meets <span className="font-extrabold">Flavor.</span>
              </span>
            </h1>

            <Link
              href="/resep"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-6 sm:mt-8 w-[200px] sm:w-[237px] h-12 sm:h-16 bg-[#111827] px-5 text-sm sm:text-base text-white hover:bg-[#111827]/90 font-[family-name:var(--font-inter)]"
              )}
            >
              Eksplor Sekarang
            </Link>

            <div className="mt-7 flex items-center gap-4">
              <AvatarGroup>
                {users.map((user) => (
                  <Avatar key={user.name} size="lg">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback className={user.className}>
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </AvatarGroup>
              <p className="text-base font-medium text-zinc-950">
                1.000+ Pengguna
              </p>
            </div>
          </div>

          <div className="relative aspect-square w-full max-w-xs sm:max-w-lg sm:aspect-[4/3] lg:aspect-[1/1] lg:max-w-none mx-auto">
            <Image
              src="/hero.png"
              alt="Hidangan Beecook"
              fill
              priority
              className="object-contain scale-[1.4] translate-x-[15%] sm:scale-[1.8] sm:translate-x-[25%] lg:scale-[2] lg:translate-x-[50%]"
            />
          </div>
        </div>
      </section>

      <section className="relative">
        {/* Background Glow Kategori */}
        <div className="pointer-events-none absolute -right-20 top-1/2 h-[500px] w-[500px] -translate-y-1/2 bg-[#E8B431]/20 blur-[90px]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-normal text-zinc-950 sm:text-4xl">
            Eksplor berdasarkan{" "}
            <span className="relative inline-block text-[#E8B431]">
              Kategori
                              <Image src="/line-doodle.png" alt="Line doodle" width={178} height={20} className="absolute -bottom-3 left-1/2 h-5 w-[118%] -translate-x-1/2 -z-10" />
            </span>
          </h2>

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/resep?category_id=${category.id}`}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative size-28 overflow-hidden rounded-full sm:size-32">
                  {getImageUrl(category.file_id) ? (
                    <Image
                      src={getImageUrl(category.file_id)!}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-zinc-100 text-zinc-400 text-sm">
                      {category.name}
                    </div>
                  )}
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-normal text-zinc-950">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-normal text-zinc-950">
              Dapatkan menu menarik setiap hari
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-zinc-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam.
            </p>

            <form className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
              <label className="relative flex h-[52px] sm:h-[59px] flex-1 items-center">
                <Mail className="pointer-events-none absolute left-4 size-4 text-zinc-500" />
                <span className="sr-only">Email</span>
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="h-full w-full rounded-lg border border-zinc-200 bg-white pl-11 pr-4 text-sm sm:text-base text-zinc-950 outline-none transition-colors placeholder:text-zinc-500 focus:border-[#E8B431] focus:ring-3 focus:ring-[#E8B431]/20"
                />
              </label>
              <button
                type="submit"
                className="h-[52px] sm:h-[59px] rounded-lg bg-[#111827] px-8 text-sm sm:text-base font-medium text-white transition-colors hover:bg-[#111827]/90"
              >
                Langganan
              </button>
            </form>
          </div>

          <div className="relative mx-auto flex w-full max-w-md justify-center lg:max-w-lg">
            <Image
              src="/images/chef.png"
              alt="Chef Beecook"
              width={404}
              height={605}
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

