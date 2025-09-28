const BASE_URL = import.meta.env.VITE_API_URL;

async function http(path, options = {}) {
  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: isFormData 
      ? options.headers || {} // let browser set multipart boundary
      : { "Content-Type": "application/json", ...(options.headers || {}) },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText} - ${text}`);
  }

  return res.status === 204 ? null : res.json();
}

export const api = {
  // RECIPE API
  getRecipes: () => http("/api/Recipe"),
  getRecipeById: (id) => http(`/api/Recipe/${id}`),
  createRecipe: (recipe) => http("/api/Recipe", { method: "POST", body: recipe }),
  updateRecipe: (id, recipe) => http(`/api/Recipe/${id}`, { method: "PUT", body: recipe }),
  deleteRecipe: (id) => http(`/api/Recipe/${id}`,{ method: "DELETE"}),

  // CATEGORY API
  getCategories: () => http("/api/Category"),
  getCategoryById: (id) => http(`/api/Category/${id}`),
  createCategory: (category) => http("/api/Category", { method: "POST", body: JSON.stringify(category) }),
  updateCategory: (id, category) => http(`/api/Category/${id}`, { method: "PUT", body: JSON.stringify(category) }),
  deleteCategory: (id) => http(`/api/Category/${id}`,{ method: "DELETE"})
};



