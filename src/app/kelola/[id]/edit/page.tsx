import { RecipeFormPage } from "@/components/recipe-form-page"

export default async function EditResepPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  return <RecipeFormPage title="Edit Resep" menuId={resolvedParams.id} />
}
