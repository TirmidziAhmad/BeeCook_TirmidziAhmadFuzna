export const categories = [
  "Semua",
  "Main Course",
  "Beverages",
  "Appetizer",
  "Side Dish",
  "Dessert",
]

export const recipes = Array.from({ length: 9 }, (_, index) => ({
  id: String(index + 1),
  title: "Nasi Goreng Spesial dengan Sate Kambing",
  category: "Main Course",
  time: "60 m",
  image: "/images/recipes/nasi-goreng-spesial.png",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  nutrition: {
    calories: "450 kcal",
    protein: "20g",
    fat: "12g",
    carbs: "30g"
  },
  ingredients: [
    "3 piring nasi dingin",
    "1 butir telur",
    "5-7 butir bakso, iris-iris (bisa diganti ayam atau protein lain)",
    "Minyak goreng untuk menumis, secukupnya",
    "1 sdm gula",
    "2 sdm minyak wijen",
    "1 sdt kaldu jamur",
    "Kecap manis secukupnya",
    "4 butir bawang putih",
    "6 butir bawang merah",
    "2 butir kemiri",
    "Ebi secukupnya, rendam supaya lunak",
    "2 sdm garam",
    "1 sdm merica butir (bisa pakai lada halus)"
  ],
  instructions: [
    "Haluskan bawang, ebi, kemiri, dan merica. Lalu tumis dengan sedikit minyak.",
    "Setelah bumbu matang, masukkan bakso, telur, aduk dan tumis sebentar.",
    "Masukkan nasi, gula, minyak wijen, kecap manis, aduk rata lagi.",
    "Koreksi rasa, angkat, dan sajikan dengan kerupuk, lalapan, dan bawang goreng."
  ]
}))
