<h2 align="center">I am Muhammad Jhohirul Islam Shohag</h2>

# Let's Talk About My Book Catalog Backend

## Book Catalog Live: [https://.vercel.app/](https://.vercel.app/)

<br>

### User Routes:

- Creating User with Auth Signup ( POST ) Router [api/v1/auth/signup](https://.vercel.app/api/v1/auth/signup)

- Login User with Auth Login ( POST ) Router [api/v1/auth/login](https://.vercel.app/api/v1/auth/login)

- Getting all users with User ( GET ) Router [api/v1/users](https://.vercel.app/api/v1/users)

- Getting Single User with User ( GET ) Router [api/v1/users/649fd756bc1335f9538c360e](https://.vercel.app/api/v1/users/6491e5290e379761d0bbc45a)

- Updating User with ( PATCH ) Router [api/v1/users/649fd756bc1335f9538c360e](https://.vercel.app/api/v1/users/6491e5290e379761d0bbc45a) ---  Only Allowed For Admin

- Deleting User with ( DELETE ) Router [api/v1/users/649fd756bc1335f9538c360e](https://.vercel.app/api/v1/users/6491e5290e379761d0bbc45a) ---  Only Allowed For Admin
  <br>

### User My Profile Routes:

- Getting admin and customer info with User My-Profile ( GET ) Router [api/v1/profile](https://authentication2-phi.vercel.app/api/v1/users/my-profile)

  <br>

### Category Routes:

- Creating Category with Category ( POST ) Router [api/v1/categories](https://authentication2-phi.vercel.app/api/v1/cows)

- Getting all Categories with Categories ( GET ) Router [api/v1/categories](https://authentication2-phi.vercel.app/api/v1/cows)

- Getting Single Category with Category ( GET ) Router [api/v1/categories/7c5666de-f133-4965-bf2c-e2a19bb4b69d](https://authentication2-phi.vercel.app/api/v1/cows/648f54a113dff37a10ae460a)

- Updating Category with ( PATCH ) Router [api/v1/categories/7c5666de-f133-4965-bf2c-e2a19bb4b69d](https://authentication2-phi.vercel.app/api/v1/cows/648e6f19aad52f3477406717)

- Deleting Category with ( DELETE ) Router [api/v1/categories/7c5666de-f133-4965-bf2c-e2a19bb4b69d](https://authentication2-phi.vercel.app/api/v1/cows/648e6f7c886169dd566c50a4)
  <br>

### Book Routes:

- Creating Book with Book ( POST ) Router [api/v1/books](https://authentication2-phi.vercel.app/api/v1/cows) ---  Only Allowed For Admin

- Getting all Books with Books ( GET ) Router [api/v1/books](https://authentication2-phi.vercel.app/api/v1/cows)

- Getting Single Book with Book ( GET ) Router [api/v1/books/fae1e1eb-0b3e-43d8-b733-fa1feb4d33ef](https://authentication2-phi.vercel.app/api/v1/cows/648f54a113dff37a10ae460a)

- Get Books By CategoryId ( GET ) Router [api/v1/books/fae1e1eb-0b3e-43d8-b733-fa1feb4d33ef/category](https://authentication2-phi.vercel.app/api/v1/cows/648f54a113dff37a10ae460a)

- Updating Book with ( PATCH ) Router [api/v1/books/fae1e1eb-0b3e-43d8-b733-fa1feb4d33ef](https://authentication2-phi.vercel.app/api/v1/cows/648e6f19aad52f3477406717) ---  Only Allowed For Admin

- Deleting Book with ( DELETE ) Router [api/v1/books/fae1e1eb-0b3e-43d8-b733-fa1feb4d33ef](https://authentication2-phi.vercel.app/api/v1/cows/648e6f7c886169dd566c50a4) ---  Only Allowed For Admin
  <br>

### Order Routes:

- Creating Order with Order ( POST ) Router [api/v1/orders](https://authentication2-phi.vercel.app/api/v1/orders) --- Only Allow Customer User

- Getting all Orders with Order ( GET ) Router [api/v1/orders](https://authentication2-phi.vercel.app/api/v1/orders) --- Only Allow Customer And Admin User 

- Getting Single Order with Order ( GET ) Router [api/v1/orders/e4f73309-ed5e-4b9b-88ac-206b6f2d9773](https://authentication2-phi.vercel.app/api/v1/orders/6491e5c10e379761d0bbc45f) --- Only Allow Customer And Admin User 
