import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://eeewrjggkkqbdtdrfvcu.supabase.co";
const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzU3MjYzOCwiZXhwIjoxOTU5MTQ4NjM4fQ.3CDCiDIRmD7vU-YviNLhmXj83mk6L-QMjucyKFYjaZE";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export { supabase };
