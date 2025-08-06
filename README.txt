🛍️ Product Catalog – Full Stack App (Next.js + .NET)

This is a simple product catalog project built using:
- Frontend: Next.js + TypeScript + Tailwind CSS
- Backend: ASP.NET Core Web API
- State Management: Redux Toolkit
- API Communication: RTK Query

---

How to run the project

1. Clone the repository

- Clone the repository in to the local machine:
	git clone https://github.com/BUSHAAN/Product-Catalog-NextJS.git
- Navigate to the root folder
	cd Product-Catalog-NextJS


2. Start the backend

- Open a terminal in the root folder
- Navigate to the server directory:
	cd server
- Run the backend:
	dotnet run


3. Start the frontend

- Open another terminal
- Navigate to the client folder:
	cd client
- Install dependencies:
	npm install
- Run the frontend:
	npm run dev


The frontend will run on http://localhost:3000
The backend will run on http://localhost:5109


Notes

- No external database is used. Product data is hardcoded
- Cart state is managed on the frontend using redux toolkit
- The front end uses RTL query to fetch product data
- Search and infinite scroll are implemented

---

Let me know if you face any issues running it.