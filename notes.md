cluster bnake project bnlia mongodb atlas pr 

npm i mongodb kra maine



Users Table: userId, fullName, email, password (hashed), role, interests (list).

Startups Table: startupId, founderId, name, description, categories (list), etc.

Categories Table: categoryId, name.

Feedback Table: feedbackId, startupId, userId, comment.





Haan, theek hai. Bina code ke, yeh lo saare main API endpoints ki list.

Authentication & Users
POST /api/auth/signup - Naya user banane ke liye.

POST /api/auth/login - User ko login karne ke liye.

GET /api/auth/me - Logged-in user ki profile dekhne ke liye.

PUT /api/users/interests - Adopter ke interests save/update karne ke liye.

Startups
POST /api/startups - Naya startup submit karne ke liye (Founder).

GET /api/startups - Saare startups ki list dekhne ke liye (Adopter Feed).

GET /api/startups/:id - Ek startup ki detail dekhne ke liye.

PUT /api/startups/:id - Apne startup ko update karne ke liye (Founder).

DELETE /api/startups/:id - Apne startup ko delete karne ke liye (Founder).

GET /api/users/:userId/startups - Ek founder ke saare startups dekhne ke liye (Dashboard).

Feedback
POST /api/feedback - Naya feedback dene ke liye (Adopter).

GET /api/startups/:startupId/feedback - Ek startup ke saare feedback dekhne ke liye (Founder).