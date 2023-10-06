
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://maenrchaxghzazhgvykf.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hZW5yY2hheGdoemF6aGd2eWtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5ODUwNjcsImV4cCI6MjAwOTU2MTA2N30.zLTlcohTBa5IcP9YbEpHPYT-XJ2mHUgdgrOPOmo45E8"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;