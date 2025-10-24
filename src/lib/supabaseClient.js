import { createClient } from '@supabase/supabase-js'

const url = process.env.REACT_APP_SUPABASE_URL
const key = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!url || !key) {
  throw new Error('Supabase env variables are missing. Check your .env file and restart the dev server.')
}

export const supabase = createClient(url, key)
