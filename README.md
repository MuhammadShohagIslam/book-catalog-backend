<h2 align="center">I am Muhammad Jhohirul Islam Shohag</h2>

# Let's Talk About My Book Catalog Backend

## Book Catalog Live: [https://book-store-backend-orpin.vercel.app/](https://book-store-backend-orpin.vercel.app/)

<br>

### User Routes:

- Creating User with Auth Signup ( POST ) Router [api/v1/auth/signup](https://book-store-backend-orpin.vercel.app/api/v1/auth/signup)

- Login User with Auth Login ( POST ) Router [api/v1/auth/login](https://book-store-backend-orpin.vercel.app/api/v1/auth/login)

- Getting all users with User ( GET ) Router [api/v1/users](https://book-store-backend-orpin.vercel.app/api/v1/users) ---  Only Allowed For Admin

- Getting Single User with User ( GET ) Router [api/v1/users/14c2e9c6-d109-4d81-8dff-098da6808a76](https://book-store-backend-orpin.vercel.app/api/v1/users/14c2e9c6-d109-4d81-8dff-098da6808a76) ---  Only Allowed For Admin

- Updating User with ( PATCH ) Router [api/v1/users/14c2e9c6-d109-4d81-8dff-098da6808a76](https://book-store-backend-orpin.vercel.app/api/v1/users/14c2e9c6-d109-4d81-8dff-098da6808a76) ---  Only Allowed For Admin

- Deleting User with ( DELETE ) Router [api/v1/users/14c2e9c6-d109-4d81-8dff-098da6808a76](https://book-store-backend-orpin.vercel.app/api/v1/users/14c2e9c6-d109-4d81-8dff-098da6808a76) ---  Only Allowed For Admin
  <br>

### User My Profile Routes:

- Getting admin and customer info with User My-Profile ( GET ) Router [api/v1/profile](https://book-store-backend-orpin.vercel.app/api/v1/users/my-profile) --- Only Allow Customer And Admin User

  <br>

### Category Routes:

- Creating Category with Category ( POST ) Router [api/v1/categories](https://book-store-backend-orpin.vercel.app/api/v1/categories) ---  Only Allowed For Admin

- Getting all Categories with Categories ( GET ) Router [api/v1/categories](https://book-store-backend-orpin.vercel.app/api/v1/categories)

- Getting Single Category with Category ( GET ) Router [api/v1/categories/7c5666de-f133-4965-bf2c-e2a19bb4b69d](https://book-store-backend-orpin.vercel.app/api/v1/categories/7c5666de-f133-4965-bf2c-e2a19bb4b69d)

- Updating Category with ( PATCH ) Router [api/v1/categories/7c5666de-f133-4965-bf2c-e2a19bb4b69d](https://book-store-backend-orpin.vercel.app/api/v1/categories/7c5666de-f133-4965-bf2c-e2a19bb4b69d) ---  Only Allowed For Admin

- Deleting Category with ( DELETE ) Router [api/v1/categories/7c5666de-f133-4965-bf2c-e2a19bb4b69d](https://book-store-backend-orpin.vercel.app/api/v1/categories/7c5666de-f133-4965-bf2c-e2a19bb4b69d) ---  Only Allowed For Admin
  <br>

### Book Routes:

- Creating Book with Book ( POST ) Router [api/v1/books](https://book-store-backend-orpin.vercel.app/api/v1/books) ---  Only Allowed For Admin

- Getting all Books with Books ( GET ) Router [api/v1/books](https://book-store-backend-orpin.vercel.app/api/v1/books)

- Getting Single Book with Book ( GET ) Router [api/v1/books/fae1e1eb-0b3e-43d8-b733-fa1feb4d33ef](https://book-store-backend-orpin.vercel.app/api/v1/books/fae1e1eb-0b3e-43d8-b733-fa1feb4d33ef)

- Get Books By CategoryId ( GET ) Router [api/v1/books/fae1e1eb-0b3e-43d8-b733-fa1feb4d33ef/category](https://book-store-backend-orpin.vercel.app/api/v1/books/fae1e1eb-0b3e-43d8-b733-fa1feb4d33ef)

- Updating Book with ( PATCH ) Router [api/v1/books/fae1e1eb-0b3e-43d8-b733-fa1feb4d33ef](https://book-store-backend-orpin.vercel.app/api/v1/books/fae1e1eb-0b3e-43d8-b733-fa1feb4d33ef) ---  Only Allowed For Admin

- Deleting Book with ( DELETE ) Router [api/v1/books/fae1e1eb-0b3e-43d8-b733-fa1feb4d33ef](https://book-store-backend-orpin.vercel.app/api/v1/books/fae1e1eb-0b3e-43d8-b733-fa1feb4d33ef) ---  Only Allowed For Admin
  <br>

### Order Routes:

- Creating Order with Order ( POST ) Router [api/v1/orders](https://book-store-backend-orpin.vercel.app/api/v1/orders) --- Only Allow Customer User

- Getting all Orders with Order ( GET ) Router [api/v1/orders](https://book-store-backend-orpin.vercel.app/api/v1/orders) --- Only Allow Customer And Admin User 

- Getting Single Order with Order ( GET ) Router [api/v1/orders/e4f73309-ed5e-4b9b-88ac-206b6f2d9773](https://book-store-backend-orpin.vercel.app/api/v1/orders/e4f73309-ed5e-4b9b-88ac-206b6f2d9773) --- Only Allow Customer And Admin User 
