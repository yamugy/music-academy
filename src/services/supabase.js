import { createClient } from '@supabase/supabase-js';

// 환경변수를 사용하도록 올바르게 설정되어 있음 ✅
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);