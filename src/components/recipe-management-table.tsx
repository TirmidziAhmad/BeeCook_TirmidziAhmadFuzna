"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  type ChangeEvent,
  type DragEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { menuService } from "@/lib/api";

export type ManagedRecipe = {
  id: number;
  name: string;
  category: string;
  fileId: string;
};

type RecipeManagementTableProps = {
  recipes: ManagedRecipe[];
  currentPage: number;
  totalPages: number;
};

export function RecipeManagementTable({
  recipes,
  currentPage,
  totalPages,
}: RecipeManagementTableProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Modal & Action States
  const [selectedRecipe, setSelectedRecipe] = useState<ManagedRecipe | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [uploadRecipe, setUploadRecipe] = useState<ManagedRecipe | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Pagination Helper: Generates the URL for a specific page
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // --- Handlers ---
  async function confirmDelete() {
    if (!selectedRecipe) return;
    setIsDeleting(true);
    try {
      await menuService.deleteMenu(selectedRecipe.id);
      setSelectedRecipe(null);
      window.location.reload(); // Refresh to update server-side data
    } catch (error) {
      alert(error instanceof Error ? error.message : "Gagal menghapus resep");
    } finally {
      setIsDeleting(false);
    }
  }

  function openUploadModal(recipe: ManagedRecipe) {
    setUploadRecipe(recipe);
    setPreviewUrl(null);
  }

  function closeUploadModal() {
    setUploadRecipe(null);
    setIsDragging(false);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function handleUpload() {
    if (!uploadRecipe || !selectedFile) return;
    setIsUploading(true);
    try {
      await menuService.uploadImage(uploadRecipe.id, selectedFile);
      closeUploadModal();
      window.location.reload();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Gagal mengupload gambar");
    } finally {
      setIsUploading(false);
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

      {/* Pagination Controls */}
      <nav className="mt-5 flex items-center gap-4 px-4 text-sm font-medium text-[#111827]">
        <Link
          href={createPageURL(currentPage - 1)}
          className={`flex items-center transition-colors hover:text-[#E8B431] ${
            currentPage <= 1 ? "pointer-events-none opacity-30" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-chevrons-left-icon lucide-chevrons-left"
          >
            <path d="m11 17-5-5 5-5" />
            <path d="m18 17-5-5 5-5" />
          </svg>
        </Link>

        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-full border border-zinc-200 bg-white">
            {currentPage}
          </span>
          <span className="text-zinc-500">of</span>
          <span className="text-zinc-500">{totalPages || 1}</span>
        </div>

        <Link
          href={createPageURL(currentPage + 1)}
          className={`flex items-center transition-colors hover:text-[#E8B431] ${
            currentPage >= totalPages ? "pointer-events-none opacity-30" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-chevrons-right-icon lucide-chevrons-right"
          >
            <path d="m6 17 5-5-5-5" />
            <path d="m13 17 5-5-5-5" />
          </svg>
        </Link>
      </nav>

      {/* Delete Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/55 px-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-semibold text-zinc-950">
              Hapus Resep?
            </h2>
            <p className="mt-3 text-sm text-zinc-600">
              Resep <span className="font-semibold">{selectedRecipe.name}</span>{" "}
              akan dihapus.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSelectedRecipe(null)}
                className="h-10 rounded-lg border border-zinc-200 px-5 text-sm font-medium"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="h-10 rounded-lg bg-red-500 px-5 text-sm font-medium text-white disabled:opacity-60"
              >
                {isDeleting ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {uploadRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
          <div className="relative w-full max-w-[480px] rounded-xl bg-white p-6 shadow-2xl">
            <button
              onClick={closeUploadModal}
              className="absolute right-5 top-5 p-2 text-zinc-400 hover:text-zinc-800"
            >
              <X className="size-5" />
            </button>
            <h2 className="text-center text-xl font-semibold text-[#111827]">
              Upload Gambar
            </h2>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />

            <label
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFiles(e.dataTransfer.files);
              }}
              className={`mt-8 flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-10 transition-colors cursor-pointer ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-zinc-200 hover:border-blue-400"
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <span className="text-sm text-zinc-600">
                Click or drag image here
              </span>
            </label>

            {previewUrl && (
              <div className="mt-6 h-[200px] w-full rounded-xl border overflow-hidden bg-zinc-50">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={closeUploadModal}
                className="h-10 px-5 text-sm border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={!previewUrl || isUploading}
                className="h-10 bg-blue-500 text-white px-6 rounded-lg disabled:opacity-50"
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
