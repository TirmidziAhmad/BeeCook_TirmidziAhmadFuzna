import Link from "next/link"
import { RecipeManagementTable } from "@/components/recipe-management-table"
import { menuService } from "@/lib/api"

export default async function KelolaPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const limit = 6;

  let menus: any[] = [];
  let totalPages = 1;

  try {
    const data = await menuService.getMenus({ 
      limit, 
      page: currentPage 
    });
    
    menus = data.menus || [];
    totalPages = data.totalPages;
  } catch (error) {
    console.error("Fetch error:", error);
    menus = [];
  }

  const recipes = menus.map((menu: any) => ({
    id: menu.id,
    name: menu.name,
    category: menu.category?.name || "Uncategorized",
    fileId: menu.file_id || String(menu.id),
  }));

  return (
    <div className="bg-white">
      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-semibold tracking-normal text-zinc-950">
          Kelola Resep
        </h1>

        <Link
          href="/kelola/tambah"
          className="mt-16 inline-flex h-14 min-w-52 items-center justify-center rounded-lg bg-[#E8B431] px-8 text-base font-semibold text-white transition-colors hover:bg-[#d9a72d]"
        >
          Tambah Resep
        </Link>

        {/* Pass pagination props to the client component */}
        <RecipeManagementTable 
          recipes={recipes} 
          currentPage={currentPage} 
          totalPages={totalPages} 
        />
      </section>
    </div>
  );
}