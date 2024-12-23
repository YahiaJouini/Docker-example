import express, { type Response } from "express"
import path from "path"
import { Pool } from "pg"
const app = express()
const PORT = process.env.PORT || 3000

const pool = new Pool({
   user: process.env.POSTGRES_USER,
   password: process.env.POSTGRES_PASSWORD,
   host: process.env.POSTGRES_HOST,
   port: parseInt(process.env.POSTGRES_PORT!),
   database: process.env.POSTGRES_DB,
})

// Add this after creating the pool to check if the connection is successful
pool
   .connect()
   .then(() => console.log("Connected to PostgreSQL"))
   .catch((err) => console.error("PostgreSQL connection error:", err))

const publicPath = path.join(__dirname, "../public")
app.use(express.static(publicPath))

app.get("/", (_, res: Response) => {
   res.sendFile(path.join(publicPath, "/index.html"))
})

app.get("/api/quotes", async (_, res: Response) => {
   try {
      const result = await pool.query("SELECT * FROM quotes")
      res.json(result.rows)
   } catch (err) {
      res.status(500).json({ error: "Failed to fetch quotes" })
   }
})

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`)
})
