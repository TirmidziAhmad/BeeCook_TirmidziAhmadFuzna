"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { menuService, categoryService } from "@/lib/api"
import type { CreateMenuPayload, Category } from "@/types/api"

type RecipeFormPageProps = {
  title: string
  menuId?: string | number
}

export function RecipeFormPage({ title, menuId }: RecipeFormPageProps) {
  const router = useRouter()
  const isEditing = !!menuId

  const [categories, setCategories] = useState<Category[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Form state
  const [name, setName] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [cookingDuration, setCookingDuration] = useState("")
  const [description, setDescription] = useState("")
  const [ingredients, setIngredients] = useState<string[]>(["", "", ""])
  const [instructions, setInstructions] = useState<string[]>(["", "", ""])
  const [calory, setCalory] = useState("")
  const [protein, setProtein] = useState("")
  const [fat, setFat] = useState("")
  const [carbohydrate, setCarbohydrate] = useState("")

  // Load categories
  useEffect(() => {
    categoryService.getCategories().then((data) => {
      setCategories(Array.isArray(data) ? data : [])
    }).catch(() => {})
  }, [])

  // Load existing menu data if editing
  useEffect(() => {
    if (!menuId) return
    setIsLoading(true)
    menuService.getMenuById(menuId).then((menu: any) => {
      setName(menu.name || "")
      setCategoryId(String(menu.category_id || ""))
      setCookingDuration(String(menu.cooking_duration || ""))
      setDescription(menu.description || "")
      setIngredients(
        menu.ingredients?.length
          ? menu.ingredients.map((i: any) => i.description)
          : ["", "", ""]
      )
      setInstructions(
        menu.recipes?.length
          ? menu.recipes
              .sort((a: any, b: any) => Number(a.sort_number) - Number(b.sort_number))
              .map((r: any) => r.description)
          : ["", "", ""]
      )
      setCalory(String(menu.nutrition?.calory || ""))
      setProtein(String(menu.nutrition?.protein || ""))
      setFat(String(menu.nutrition?.fat || ""))
      setCarbohydrate(String(menu.nutrition?.carbohydrate || ""))
    }).catch(() => {
      alert("Gagal memuat data resep")
    }).finally(() => {
      setIsLoading(false)
    })
  }, [menuId])

  function addIngredient() {
    setIngredients([...ingredients, ""])
  }

  function addInstruction() {
    setInstructions([...instructions, ""])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    const payload: CreateMenuPayload = {
      name,
      description,
      cooking_duration: cookingDuration,
      category_id: categoryId,
      ingredients: ingredients
        .filter((i) => i.trim() !== "")
        .map((i) => ({ description: i })),
      recipes: instructions
        .filter((i) => i.trim() !== "")
        .map((i, idx) => ({ description: i, sort_number: String(idx + 1) })),
      nutritions: {
        calory: calory,
        protein: protein,
        carbohydrate: carbohydrate,
        fat: fat,
      },
    }

    try {
      if (isEditing) {
        await menuService.updateMenu(menuId!, payload)
      } else {
        await menuService.createMenu(payload)
      }
      router.push("/kelola")
      router.refresh()
    } catch (error) {
      alert(error instanceof Error ? error.message : "Gagal menyimpan resep")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white">
        <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-semibold tracking-normal text-zinc-950 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-8 text-zinc-500">Memuat data...</p>
        </section>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-normal text-zinc-950 sm:text-5xl">
          {title}
        </h1>

        <form className="mt-16" onSubmit={handleSubmit}>
          <div className="rounded-lg bg-white p-8 shadow-[0_14px_34px_rgba(15,23,42,0.12)]">
            <h2 className="text-2xl font-semibold tracking-normal text-zinc-950">
              Informasi Utama
            </h2>

            <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.35fr]">
              <div className="space-y-5">
                <label className="block">
                  <span className="text-sm font-semibold text-[#111827]">
                    Nama Resep
                  </span>
                  <input
                    type="text"
                    placeholder="Nama Resep"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-2 h-11 w-full rounded-lg border border-zinc-200 bg-white px-4 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-[#E8B431] focus:ring-3 focus:ring-[#E8B431]/20"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-[#111827]">
                    Kategori
                  </span>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                    className="mt-2 h-11 w-full rounded-lg border border-zinc-200 bg-white px-4 text-sm text-zinc-500 outline-none focus:border-[#E8B431] focus:ring-3 focus:ring-[#E8B431]/20"
                  >
                    <option value="">Kategori</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={String(cat.id)}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-[#111827]">
                    Durasi Masak (menit)
                  </span>
                  <input
                    type="text"
                    placeholder="60"
                    value={cookingDuration}
                    onChange={(e) => setCookingDuration(e.target.value)}
                    required
                    className="mt-2 h-11 w-full rounded-lg border border-zinc-200 bg-white px-4 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-[#E8B431] focus:ring-3 focus:ring-[#E8B431]/20"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-semibold text-[#111827]">
                  Deskripsi
                </span>
                <textarea
                  placeholder="Isi deskripsi singkat tentang makanan"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-2 h-[206px] w-full resize-none rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-[#E8B431] focus:ring-3 focus:ring-[#E8B431]/20"
                />
              </label>
            </div>
          </div>

          {/* Nutrisi */}
          <div className="mt-8 rounded-lg bg-white p-8 shadow-[0_14px_34px_rgba(15,23,42,0.12)]">
            <h2 className="text-2xl font-semibold tracking-normal text-zinc-950">
              Informasi Nutrisi
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <label className="block">
                <span className="text-sm font-semibold text-[#111827]">Kalori</span>
                <input
                  type="text"
                  placeholder="450"
                  value={calory}
                  onChange={(e) => setCalory(e.target.value)}
                  className="mt-2 h-11 w-full rounded-lg border border-zinc-200 bg-white px-4 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-[#E8B431] focus:ring-3 focus:ring-[#E8B431]/20"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[#111827]">Protein</span>
                <input
                  type="text"
                  placeholder="20"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                  className="mt-2 h-11 w-full rounded-lg border border-zinc-200 bg-white px-4 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-[#E8B431] focus:ring-3 focus:ring-[#E8B431]/20"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[#111827]">Lemak</span>
                <input
                  type="text"
                  placeholder="12"
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                  className="mt-2 h-11 w-full rounded-lg border border-zinc-200 bg-white px-4 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-[#E8B431] focus:ring-3 focus:ring-[#E8B431]/20"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[#111827]">Karbohidrat</span>
                <input
                  type="text"
                  placeholder="30"
                  value={carbohydrate}
                  onChange={(e) => setCarbohydrate(e.target.value)}
                  className="mt-2 h-11 w-full rounded-lg border border-zinc-200 bg-white px-4 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-[#E8B431] focus:ring-3 focus:ring-[#E8B431]/20"
                />
              </label>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="rounded-lg bg-white p-8 shadow-[0_14px_34px_rgba(15,23,42,0.12)]">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold tracking-normal text-zinc-950">
                  Bahan - Bahan
                </h2>
                <button
                  type="button"
                  onClick={addIngredient}
                  className="h-9 rounded border border-zinc-200 px-4 text-xs font-medium text-[#111827] transition-colors hover:bg-zinc-50"
                >
                  Tambah Bahan
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {ingredients.map((ingredient, idx) => (
                  <input
                    key={idx}
                    type="text"
                    placeholder={`Bahan ${idx + 1}`}
                    value={ingredient}
                    onChange={(e) => {
                      const updated = [...ingredients]
                      updated[idx] = e.target.value
                      setIngredients(updated)
                    }}
                    className="h-11 w-full rounded-lg border border-zinc-200 bg-white px-4 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-[#E8B431] focus:ring-3 focus:ring-[#E8B431]/20"
                  />
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-[0_14px_34px_rgba(15,23,42,0.12)]">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold tracking-normal text-zinc-950">
                  Instruksi Masak
                </h2>
                <button
                  type="button"
                  onClick={addInstruction}
                  className="h-9 rounded border border-zinc-200 px-4 text-xs font-medium text-[#111827] transition-colors hover:bg-zinc-50"
                >
                  Tambah Instruksi
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {instructions.map((instruction, idx) => (
                  <input
                    key={idx}
                    type="text"
                    placeholder={`Instruksi ${idx + 1}`}
                    value={instruction}
                    onChange={(e) => {
                      const updated = [...instructions]
                      updated[idx] = e.target.value
                      setInstructions(updated)
                    }}
                    className="h-11 w-full rounded-lg border border-zinc-200 bg-white px-4 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-[#E8B431] focus:ring-3 focus:ring-[#E8B431]/20"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-14 min-w-52 rounded-lg bg-[#E8B431] px-8 text-base font-semibold text-white transition-colors hover:bg-[#d9a72d] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Resep"}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
