import { createClient, SupabaseClient } from '@supabase/supabase-js'

// SupabaseのURLとAPIキーを環境変数から取得
const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL as string
const supabaseKey: string = import.meta.env.VITE_SUPABASE_KEY as string

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey)

export default supabase


// 以下でも使えるっぽい
// import { createClient, SupabaseClient } from '@supabase/supabase-js'

// // SupabaseのURLとAPIキーを環境変数から取得
// const supabaseUrl: string = process.env.VITE_SUPABASE_URL as string
// const supabaseKey: string = process.env.VITE_SUPABASE_KEY as string
// const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey)

// export default supabase