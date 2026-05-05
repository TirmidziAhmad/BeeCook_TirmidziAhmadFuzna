"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  type ChangeEvent,
  type DragEvent,
  useEffect,
  useRef,
  useState,
} from "react"
import { X } from "lucide-react"
import { menuService } from "@/lib/api"

export type ManagedRecipe = {
  id: number
  name: string
  category: string
  fileId: string
}

type RecipeManagementTableProps = {
  recipes: ManagedRecipe[]
}

export function RecipeManagementTable({
  recipes: initialRecipes,
}: RecipeManagementTableProps) {
  const router = useRouter()
  const [recipes, setRecipes] = useState(initialRecipes)
  const [selectedRecipe, setSelectedRecipe] = useState<ManagedRecipe | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  
  // Upload modal state
  const [uploadRecipe, setUploadRecipe] = useState<ManagedRecipe | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  async function confirmDelete() {
    if (!selectedRecipe) {
      return
    }

    setIsDeleting(true)
    try {
      await menuService.deleteMenu(selectedRecipe.id)
      setRecipes((currentRecipes) =>
        currentRecipes.filter((recipe) => recipe.id !== selectedRecipe.id)
      )
      setSelectedRecipe(null)
      router.refresh()
    } catch (error) {
      alert(error instanceof Error ? error.message : "Gagal menghapus resep")
    } finally {
      setIsDeleting(false)
    }
  }

  function openUploadModal(recipe: ManagedRecipe) {
    setUploadRecipe(recipe)
    setPreviewUrl(null)
  }

  function closeUploadModal() {
    setUploadRecipe(null)
    setIsDragging(false)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  function handleFiles(files: FileList | null) {
    const file = files?.[0]

    if (!file || !file.type.startsWith("image/")) {
      return
    }

    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  function handleFileInputChange(event: ChangeEvent<HTMLInputElement>) {
    handleFiles(event.target.files)
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault()
    setIsDragging(false)
    handleFiles(event.dataTransfer.files)
  }

  async function handleUpload() {
    if (!uploadRecipe || !selectedFile) return

    setIsUploading(true)
    try {
      await menuService.uploadImage(uploadRecipe.id, selectedFile)
      closeUploadModal()
      router.refresh()
    } catch (error) {
      alert(error instanceof Error ? error.message : "Gagal mengupload gambar")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <>
      <div className="mt-12 overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="border-b border-zinc-200 text-sm font-medium text-zinc-500">
              <th className="px-4 py-4">Nama Resep</th>
              <th className="px-4 py-4">Kategori</th>
              <th className="px-4 py-4">File ID</th>
              <th className="px-4 py-4 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr
                key={recipe.id}
                className="border-b border-zinc-200 text-sm text-[#111827]"
              >
                <td className="px-4 py-4 font-medium">{recipe.name}</td>
                <td className="px-4 py-4">{recipe.category}</td>
                <td className="px-4 py-4">{recipe.fileId}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => setSelectedRecipe(recipe)}
                      className="text-red-500 transition-colors hover:text-red-600"
                    >
                      Del
                    </button>
                    <Link
                      href={`/kelola/${recipe.id}/edit`}
                      className="text-blue-600 transition-colors hover:text-blue-700"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => openUploadModal(recipe)}
                      className="text-teal-600 transition-colors hover:text-teal-700"
                    >
                      Gambar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {recipes.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-sm text-zinc-500"
                >
                  Belum ada resep.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <nav
        className="mt-5 flex items-center gap-4 px-4 text-sm font-medium text-[#111827]"
        aria-label="Pagination"
      >
        <Link href="/kelola" className="transition-colors hover:text-[#E8B431]">
          «
        </Link>
        <span className="flex size-9 items-center justify-center rounded-full border border-zinc-200 bg-white">
          1
        </span>
        <span>of</span>
        <Link href="/kelola" className="transition-colors hover:text-[#E8B431]">
          3»
        </Link>
      </nav>

      {/* Delete Modal */}
      {selectedRecipe && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/55 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-recipe-title"
        >
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.28)]">
            <h2
              id="delete-recipe-title"
              className="text-2xl font-semibold tracking-normal text-zinc-950"
            >
              Hapus Resep?
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Resep <span className="font-semibold">{selectedRecipe.name}</span>{" "}
              akan dihapus dari daftar kelola.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedRecipe(null)}
                className="h-10 rounded-lg border border-zinc-200 px-5 text-sm font-medium text-[#111827] transition-colors hover:bg-zinc-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="h-10 rounded-lg bg-red-500 px-5 text-sm font-medium text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeleting ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {uploadRecipe && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="upload-image-title"
        >
          <div className="relative w-full max-w-[480px] rounded-xl bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.28)]">
            <button
              type="button"
              onClick={closeUploadModal}
              className="absolute right-5 top-5 flex size-8 items-center justify-center rounded-md bg-zinc-100 text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-800"
              aria-label="Tutup modal upload gambar"
            >
              <X className="size-4" />
            </button>

            <h2
              id="upload-image-title"
              className="text-center text-xl font-semibold tracking-normal text-[#111827]"
            >
              Upload Gambar
            </h2>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange}
            />

            <label
              onDragOver={(event) => {
                event.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={
                isDragging
                  ? "mt-8 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#3b82f6] bg-[#eff6ff] py-10 text-center transition-colors"
                  : "mt-8 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 bg-white py-10 text-center transition-colors hover:border-[#3b82f6]/50"
              }
            >
              <svg
                viewBox="0 0 44 44"
                fill="none"
                className="size-12 text-blue-500"
                aria-hidden="true"
              >
                <rect
                  x="8"
                  y="12"
                  width="22"
                  height="22"
                  rx="4"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <rect
                  x="15"
                  y="7"
                  width="22"
                  height="22"
                  rx="4"
                  fill="white"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M19 25l5-5 4 4 2-2 4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="30" cy="15" r="2" fill="currentColor" />
              </svg>

              <span className="mt-4 text-sm text-zinc-700">
                Drop your files here or{" "}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    fileInputRef.current?.click()
                  }}
                  className="font-medium text-blue-500 hover:text-blue-600"
                >
                  browse
                </button>
              </span>
              <span className="mt-1 text-xs text-zinc-400">
                Maximum size: 50MB
              </span>
            </label>

            <div className="mt-6">
              <span className="text-sm font-medium text-zinc-700">Preview</span>
              <div
                className="mt-2 flex h-[240px] w-full items-center justify-center overflow-hidden rounded-xl bg-zinc-50"
                style={
                  previewUrl ? { backgroundImage: `url(${previewUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined
                }
              >
                {!previewUrl && (
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    className="size-20 text-zinc-300"
                    aria-hidden="true"
                  >
                    <rect
                      x="18"
                      y="16"
                      width="30"
                      height="38"
                      rx="2"
                      transform="rotate(15 18 16)"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <rect
                      x="14"
                      y="23"
                      width="30"
                      height="30"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      d="M19 45l8-9 5 5 4-4 5 8"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="36" cy="31" r="3" fill="currentColor" />
                  </svg>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeUploadModal}
                className="h-10 rounded-lg border border-zinc-200 px-5 text-sm font-medium text-[#111827] transition-colors hover:bg-zinc-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpload}
                className="h-10 rounded-lg bg-blue-500 px-6 text-sm font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={!previewUrl || isUploading}
              >
                {isUploading ? "Mengupload..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
