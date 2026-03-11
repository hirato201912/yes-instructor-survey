import { createClient } from '@supabase/supabase-js'

// Lazy initialization to avoid errors when env vars are not set at build time
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _supabase: ReturnType<typeof createClient<any>> | null = null

function getSupabase() {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) {
      throw new Error('Supabase の環境変数が設定されていません。.env.local を確認してください。')
    }
    _supabase = createClient<any>(url, key)
  }
  return _supabase
}

export const supabase = {
  from: (...args: Parameters<ReturnType<typeof createClient>['from']>) => getSupabase().from(...args),
}
