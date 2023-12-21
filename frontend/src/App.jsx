import { Toaster } from '@/components/ui/toaster'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <main className='container pt-8 pb-16'>
        <Outlet />
      </main>
      <Toaster />
    </>
  )
}

export default App
