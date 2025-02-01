import { Provider } from "@/components/ui/provider"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
// 開発環境からユーザー登録する時、2回リクエストが飛んで、同じidが登録されてエラーになるためコメントアウト
//   <StrictMode>
    <Provider>
      <App />
    </Provider>
// </StrictMode>
)
