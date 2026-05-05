import Image from "next/image"
import { notFound } from "next/navigation"
import { Clock, Utensils } from "lucide-react"
import { menuService, getImageUrl } from "@/lib/api"

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  let menu: any

  try {
    menu = await menuService.getMenuDetailBySlug(resolvedParams.id)
  } catch {
    // Fallback: try by ID
    try {
      menu = await menuService.getMenuById(resolvedParams.id)
    } catch {
      notFound()
    }
  }

  if (!menu) {
    notFound()
  }

  const imageUrl = getImageUrl(menu.file_id)
  const ingredients: { description: string }[] = menu.ingredients || []
  const recipes: { description: string; sort_number: string | number }[] = menu.recipes || []
  const nutrition = menu.nutrition || {}

  return (
    <div className="bg-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute right-0 top-[680px] h-[492px] w-[490px] -translate-x-1/2 bg-[#E8B431]/30 blur-[150px]" />

      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <div className="relative flex min-h-[300px] w-full flex-col justify-end overflow-hidden rounded-[20px] bg-zinc-100 sm:min-h-[400px]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={menu.name}
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-200 text-zinc-400 text-lg">
              No Image
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <div className="relative z-10 p-8 sm:p-12 md:p-16">
            <h1 className="max-w-4xl font-sans text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[60px] lg:leading-[75px]">
              {menu.name}
            </h1>
          </div>
        </div>

        {/* Meta Section */}
        <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-6">
          <div className="flex items-center gap-4">
            <div className="flex text-[#E8B431]">
              <Utensils className="size-12 stroke-[1.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-400">Kategori</span>
              <span className="text-xl font-semibold text-gray-900">{menu.category?.name || "Uncategorized"}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex text-[#E8B431]">
              <Clock className="size-12 stroke-[1.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-400">Durasi</span>
              <span className="text-xl font-semibold text-gray-900">{menu.cooking_duration} menit</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-10 max-w-5xl">
          <p className="text-justify text-lg leading-[30px] text-gray-600">
            {menu.description}
          </p>
        </div>

        {/* Informasi Nutrisi */}
        {nutrition && (nutrition.calory || nutrition.protein || nutrition.fat || nutrition.carbohydrate) && (
          <div className="mt-16">
            <h2 className="text-3xl font-semibold text-black">Informasi Nutrisi</h2>
            <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
              <div className="flex flex-col items-center justify-center gap-1 rounded-2xl border-2 border-[#E8B431] bg-slate-50 py-8">
                <span className="text-2xl font-semibold text-gray-800">{nutrition.calory} kcal</span>
                <span className="text-base font-medium text-gray-800">Kalori</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 rounded-2xl border-2 border-[#E8B431] bg-slate-50 py-8">
                <span className="text-2xl font-semibold text-gray-800">{nutrition.protein}g</span>
                <span className="text-base font-medium text-gray-800">Protein</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 rounded-2xl border-2 border-[#E8B431] bg-slate-50 py-8">
                <span className="text-2xl font-semibold text-gray-800">{nutrition.fat}g</span>
                <span className="text-base font-medium text-gray-800">Lemak</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 rounded-2xl border-2 border-[#E8B431] bg-slate-50 py-8">
                <span className="text-2xl font-semibold text-gray-800">{nutrition.carbohydrate}g</span>
                <span className="text-base font-medium text-gray-800">Karbohidrat</span>
              </div>
            </div>
          </div>
        )}

        {/* Ingredients & Instructions Split */}
        <div className="mt-16 grid gap-16 lg:grid-cols-2">
          {/* Bahan-bahan */}
          <div>
            <h2 className="text-3xl font-semibold text-black">Bahan-bahan</h2>
            <ul className="mt-6 flex flex-col gap-5">
              {ingredients.map((ingredient, idx) => (
                <li key={idx} className="text-lg text-black">
                  {ingredient.description}
                </li>
              ))}
              {ingredients.length === 0 && (
                <li className="text-lg text-zinc-400">Belum ada bahan.</li>
              )}
            </ul>
          </div>

          {/* Cara Masak */}
          <div>
            <h2 className="text-3xl font-semibold text-black">Cara Masak</h2>
            <div className="mt-6 flex flex-col gap-6">
              {recipes
                .sort((a, b) => Number(a.sort_number) - Number(b.sort_number))
                .map((step, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8B431]">
                    <span className="text-base font-semibold text-black">{idx + 1}</span>
                  </div>
                  <p className="pt-2 text-lg leading-snug text-black">
                    {step.description}
                  </p>
                </div>
              ))}
              {recipes.length === 0 && (
                <p className="text-lg text-zinc-400">Belum ada instruksi.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
