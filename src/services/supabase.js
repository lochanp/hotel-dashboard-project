import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://kreclzxqmwlympvycwnn.supabase.co';
export const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyZWNsenhxbXdseW1wdnljd25uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NTM2MDUsImV4cCI6MjA2NTEyOTYwNX0.4kPamHCvrVYDJ5EtWlUyKtwl5KcKjBw0CI-r-2VG8ng';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
