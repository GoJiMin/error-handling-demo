export const endpoints = {
  users: {
    getUser: (id: string) => `/users/${id}`,
    getUsers: "/users",
    createUser: "/users",
  },

  products: {
    getProducts: (id: string) => `/products/${id}`,
    getAllProducts: "/products",
    createProducts: "/products",
  },

  todo: {
    getAllTodo: "/todo",
    postTodo: "/todo",
    deleteTodo: "/todo",
  },

  photo: {
    getPhotos: "/photos?albumId=1",
  },

  posts: {
    getPosts: "/posts",
  },
};
