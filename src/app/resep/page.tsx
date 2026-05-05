import Image from "next/image"
import Link from "next/link"
import { Clock } from "lucide-react"
import { categoryService, menuService, getImageUrl } from "@/lib/api"

export default async function ResepPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams
  const currentPage = Number(resolvedParams.page) || 1
  const categoryId = resolvedParams.category_id as string | undefined
  const search = resolvedParams.search as string | undefined

  let categories: any[] = []
  let menus: any[] = []
  let totalPages = 1

  try {
    const [catData, menuData] = await Promise.all([
      categoryService.getCategories(),
      menuService.getMenus({
        page: currentPage,
        limit: 15,
        category_id: categoryId,
        search,
      }),
    ])
    categories = Array.isArray(catData) ? catData : []
    menus = menuData.menus || []
    totalPages = menuData.totalPages || 1
  } catch {
    categories = []
    menus = []
  }

  return (
    <div className="bg-white">
      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative flex min-h-[280px] w-full flex-col justify-center overflow-hidden rounded-[2rem] sm:min-h-[360px]">
          <Image
            src="/images/recipes/trending-nasi-goreng-udang.png"
            alt="Nasi Goreng Udang Mentega"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          
          <div className="relative z-10 px-8 sm:px-12">
            <p className="text-sm font-medium tracking-wide text-[#E8B431] sm:text-base">
              Sedang Trending
            </p>
            <h1 className="mt-3 max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Nasi Goreng Udang Mentega
            </h1>
          </div>
        </div>

        <div className="mt-7 overflow-x-auto pb-2">
          <div className="flex min-w-max gap-5">
            <Link
              href="/resep"
              className={
                !categoryId
                  ? "h-14 min-w-40 rounded-lg bg-[#E8B431] px-6 text-sm font-semibold text-white flex items-center justify-center"
                  : "h-14 min-w-40 rounded-lg bg-[#111827] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#111827]/90 flex items-center justify-center"
              }
            >
              Semua
            </Link>
            {categories.map((category: any) => {
              const isActive = categoryId === String(category.id)

              return (
                <Link
                  key={category.id}
                  href={`/resep?category_id=${category.id}`}
                  className={
                    isActive
                      ? "h-14 min-w-40 rounded-lg bg-[#E8B431] px-6 text-sm font-semibold text-white flex items-center justify-center"
                      : "h-14 min-w-40 rounded-lg bg-[#111827] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#111827]/90 flex items-center justify-center"
                  }
                >
                  {category.name}
                </Link>
              )
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {menus.map((menu: any) => {
            const imageUrl = getImageUrl(menu.file_id)
            return (
              <Link key={menu.id} href={`/resep/${menu.slug || menu.id}`} className="group block">
                <article className="overflow-hidden rounded-2xl bg-white shadow-[0_14px_28px_rgba(15,23,42,0.16)] transition-all group-hover:shadow-[0_20px_40px_rgba(15,23,42,0.2)]">
                  <div className="relative aspect-[1.42] w-full overflow-hidden rounded-t-2xl bg-zinc-100">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={menu.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-zinc-100 text-zinc-400 text-sm">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-sm bg-blue-600 px-2 py-1 text-[10px] font-semibold text-white">
                        {menu.category?.name || "Uncategorized"}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-zinc-400">
                        <Clock className="size-3.5" />
                        {menu.cooking_duration} m
                      </span>
                    </div>

                    <h2 className="mt-3 line-clamp-2 text-base font-semibold leading-6 tracking-normal text-zinc-950 group-hover:text-[#E8B431] transition-colors">
                      {menu.name}
                    </h2>
                  </div>
                </article>
              </Link>
            )
          })}
          {menus.length === 0 && (
            <div className="col-span-full py-16 text-center text-zinc-500">
              Belum ada resep.
            </div>
          )}
        </div>

        <nav
          className="mt-12 flex items-center justify-center gap-3 text-sm font-medium text-zinc-950"
          aria-label="Pagination"
        >
          {currentPage > 1 && (
            <Link
              href={`/resep?page=${currentPage - 1}${categoryId ? `&category_id=${categoryId}` : ""}${search ? `&search=${search}` : ""}`}
              className="transition-colors hover:text-[#E8B431]"
            >
              « Previous
            </Link>
          )}
          <span
            className="flex size-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-950"
            aria-current="page"
          >
            {currentPage}
          </span>
          {currentPage < totalPages && (
            <Link
              href={`/resep?page=${currentPage + 1}${categoryId ? `&category_id=${categoryId}` : ""}${search ? `&search=${search}` : ""}`}
              className="transition-colors hover:text-[#E8B431]"
            >
              Next »
            </Link>
          )}
        </nav>
      </section>
    </div>
  )
}
