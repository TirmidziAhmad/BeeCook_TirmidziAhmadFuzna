import Image from "next/image"
import { notFound } from "next/navigation"
import { Clock } from "lucide-react"
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
              <svg
                width="61"
                height="37"
                viewBox="0 0 61 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.6934 18.3401C12.6934 23.2646 14.4259 27.4693 17.8959 30.9393C21.3708 34.4142 25.5706 36.1517 30.495 36.1517C35.3997 36.1517 39.5994 34.4192 43.0793 30.9393C46.5542 27.4693 48.3016 23.2646 48.3016 18.3401C48.3016 13.4306 46.5592 9.24575 43.0793 5.76088C39.5894 2.28595 35.3947 0.538552 30.495 0.538552C25.5706 0.538552 21.3708 2.28098 17.8959 5.76088C14.4309 9.24575 12.6934 13.4306 12.6934 18.3401ZM52.8736 15.0588C51.3099 13.9915 50.5256 12.5966 50.6596 9.4046V1.19879C50.6745 0.0520612 52.7545 -0.0869362 52.8587 1.19879L52.9382 7.85577C52.9431 9.10178 54.8146 9.1415 54.8097 7.85577L54.7302 0.970437C54.755 -0.260683 56.7407 -0.384788 56.7655 0.970437C56.7655 2.88165 56.845 5.94456 56.845 7.85577C56.7457 9.06207 58.4832 9.22093 58.4385 7.85577L58.359 1.01511C58.4037 0.0868104 59.4264 -0.24579 60.1213 0.191059C60.861 0.662657 60.7121 1.61082 60.7419 2.41005L61 10.2634C60.9603 12.5469 60.3596 14.4035 58.5725 15.1928C58.2995 15.312 57.9222 15.4063 57.4854 15.4708L58.1009 34.6227C58.1357 35.7595 57.2074 36.6878 56.1202 36.6878H55.872C54.6458 36.6878 53.6083 35.6404 53.6431 34.3646L54.1842 15.4659C53.6133 15.3765 53.1417 15.2425 52.8736 15.0588ZM8.01221 34.0469L8.042 16.8459C14.0735 13.3611 12.1523 -0.0670795 6.11589 0.0073834C-1.22119 0.0917747 -2.08992 15.1382 4.21957 16.7913L3.75293 34.1164C3.66358 37.3927 8.00725 37.6955 8.01221 34.0469ZM20.1298 18.3253C20.1298 21.1946 21.1375 23.6419 23.1679 25.6723C25.1933 27.6927 27.6406 28.7103 30.5099 28.7103C33.3594 28.7103 35.8067 27.6927 37.8321 25.6723C39.8575 23.6419 40.8702 21.1946 40.8702 18.3253C40.8702 15.4758 39.8575 13.0285 37.8321 11.008C35.8018 8.98761 33.3594 7.96995 30.5099 7.96995C24.7465 7.97491 20.1298 12.5569 20.1298 18.3253ZM17.7023 18.3253C17.7023 14.8007 18.9434 11.7874 21.4403 9.29042C23.9373 6.79343 26.9605 5.55239 30.5099 5.55239C34.0494 5.55239 37.0627 6.79343 39.5448 9.29042C42.0417 11.7874 43.2977 14.8007 43.2977 18.3253C43.2977 21.8598 42.0417 24.873 39.5448 27.3799C37.0627 29.8819 34.0494 31.1378 30.5099 31.1378C26.9655 31.1378 23.9423 29.8819 21.4403 27.3799C18.9483 24.8681 17.7023 21.8548 17.7023 18.3253Z"
                  fill="#E8B431"
                />
              </svg>
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
