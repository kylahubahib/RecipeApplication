const BASE_URL = import.meta.env.VITE_API_URL;

async function http(path, options = {}) {
  const isFormData = options.body instanceof FormData;
  const token = localStorage.getItem("authToken");

  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
  const text = await res.text();
  let message = text;

  try {
    // Try parse JSON if possible
    const json = JSON.parse(text);
    message = json.message || message;
  } catch {
    // if it's not JSON, keep raw text
  }

  throw new Error(message); 
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
  deleteCategory: (id) => http(`/api/Category/${id}`,{ method: "DELETE"}),

  //AUTH API
  login: (credentials) => http("/api/Auth/login", { method: "POST", body: JSON.stringify(credentials)}),
  register: (newUser) => http("/api/Auth/register", { method: "POST", body: JSON.stringify(newUser)})
};



