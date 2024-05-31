import 'dotenv/config'

export const config = {
  port: process.env.PORT || 8080,
  db_url: process.env.DB_URL,
  stripe_secret: process.env.STRIPE_SECRET_KEY
}