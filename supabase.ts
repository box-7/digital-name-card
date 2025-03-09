
import { createClient, SupabaseClient } from '@supabase/supabase-js'

// import 'dotenv/config' // これがあると画面が表示されなくなるのでコメントアウト

//vite.config.tsで設定した方法で、.envから環境変数を取得
const supabaseUrl: string = process.env.VITE_SUPABASE_URL as string
const supabaseKey: string = process.env.VITE_SUPABASE_ANON_KEY as string

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey)

export default supabase


// import { createClient, SupabaseClient } from '@supabase/supabase-js'

// // SupabaseのURLとAPIキーを環境変数から取得
// // ci-cd.ymlと合わせてVITE_SUPABASE_ANON_KEYにする
// // import.meta.envだとテストがエラーになる
// const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL as string
// const supabaseKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY as string

// const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey)

// export default supabase


// 動いているtsプロジェクト
// const supabaseUrl = process.env.VITE_SUPABASE_URL as string;
// const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY as string;
