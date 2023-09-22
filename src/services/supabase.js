import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://pyuboltwazlsmlqusokj.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5dWJvbHR3YXpsc21scXVzb2tqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUwNjcwNzEsImV4cCI6MjAxMDY0MzA3MX0.K-Ps-3ZgH4ktb8Tuv1WoOVum0_OLV8ms6N1SSagi59I';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
