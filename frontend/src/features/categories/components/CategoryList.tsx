import { useGetCategories } from '../hooks/useGetCategories'

export const CategoryList = () => {
  const { data: categories, isLoading, isError } = useGetCategories()

  if (isLoading)
    return <div className="animate-pulse h-10 bg-gray-200 rounded w-full"></div>
  if (isError)
    return <div className="text-red-500">Error cargando categorías</div>

  return (
    <div className="flex flex-wrap gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
      <h3 className="w-full text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">
        Categorías Disponibles
      </h3>

      {categories?.map((category) => (
        <span
          key={category.id}
          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer border border-indigo-100"
        >
          <span className="mr-2 text-lg">{category.icon}</span>
          {category.name}
        </span>
      ))}
    </div>
  )
}
