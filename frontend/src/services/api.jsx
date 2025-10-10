import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// Create an Axios instance
const Api = axios.create({baseURL: `${BASE_URL}/api`});

Api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default Api;


export const api = {
  // RECIPE API
  getRecipes: () => Api.get("/Recipe"),
  getRecipeById: (id) => Api.get(`/Recipe/${id}`),
  createRecipe: (recipe) => Api.post("/Recipe", recipe),
  updateRecipe: (id, recipe) => Api.put(`/Recipe/${id}`, recipe),
  deleteRecipe: (id) => Api.delete(`/Recipe/${id}`),

  // CATEGORY API
  getCategories: () => Api.get("/Category"),
  getCategoryById: (id) => Api.get(`/Category/${id}`),
  createCategory: (category) => Api.post("/Category", category),
  updateCategory: (id, category) => Api.put(`/Category/${id}`, category),
  deleteCategory: (id) => Api.delete(`/Category/${id}`),

  //AUTH API
  login: (credentials) => Api.post("/Auth/login", credentials),
  register: (newUser) => Api.post("/Auth/register", newUser),

  //PROFILE API
  getProfile: (id) => Api.get(`/Profile/${id}`),
  updateProfile: (id, updatedDetails) => Api.put(`/Profile/${id}`, updatedDetails),
  deleteAccount: (id) => Api.delete(`/Profile/${id}`),
  updatePassword: (id, updatedPass) => Api.put(`/Profile/Password/${id}`, updatedPass),
};



// async function http(path, options = {}) {
//   const isFormData = options.body instanceof FormData;
//   const token = localStorage.getItem("authToken");

//   const headers = {
//     ...(isFormData ? {} : { "Content-Type": "application/json" }),
//     ...(options.headers || {}),
//     ...(token ? { Authorization: `Bearer ${token}` } : {})
//   };

//   const res = await fetch(`${BASE_URL}${path}`, {
//     ...options,
//     headers,
//   });

//   if (!res.ok) {
//   const text = await res.text();
//   let message = text;

//   try {
//     const json = JSON.parse(text);
//     message = json.message || message;
//   } catch {
//     // if it's not JSON, keep raw text
//   }

//   const error = new Error(message);
//   error.status = res.status;
//   throw error;
// }


//   return res.status === 204 ? null : res.json();
// }


// export const api = {
//   // RECIPE API
//   getRecipes: () => http("/api/Recipe"),
//   getRecipeById: (id) => http(`/api/Recipe/${id}`),
//   createRecipe: (recipe) => http("/api/Recipe", { method: "POST", body: recipe }),
//   updateRecipe: (id, recipe) => http(`/api/Recipe/${id}`, { method: "PUT", body: recipe }),
//   deleteRecipe: (id) => http(`/api/Recipe/${id}`,{ method: "DELETE"}),

//   // CATEGORY API
//   getCategories: () => http("/api/Category"),
//   getCategoryById: (id) => http(`/api/Category/${id}`),
//   createCategory: (category) => http("/api/Category", { method: "POST", body: JSON.stringify(category) }),
//   updateCategory: (id, category) => http(`/api/Category/${id}`, { method: "PUT", body: JSON.stringify(category) }),
//   deleteCategory: (id) => http(`/api/Category/${id}`,{ method: "DELETE"}),

//   //AUTH API
//   login: (credentials) => axios.post("/api/Auth/login", credentials),
//   register: (newUser) => axios.post("/api/Auth/register", newUser)
// };




