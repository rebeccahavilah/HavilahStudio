import { createClient } from '@supabase/supabase-js';

// Configuração direta do Supabase
const supabaseUrl = 'https://cdpgwbezombqwlvbkigo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkcGd3YmV6b21icXdsdmJraWdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1MDcwNDMsImV4cCI6MjA4MTA4MzA0M30.ETWVL3pa3RJW-0dz_Rf5d1K4EkXmmKnpIGXfVH6Uzto';

export const supabase = createClient(supabaseUrl, supabaseKey);