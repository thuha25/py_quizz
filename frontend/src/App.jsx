import { Toaster } from '@/components/ui/toaster'
import  Navbar  from '@/components/ui/navbar'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />
      <main className='container pt-8 pb-16'>
        <Outlet />
      </main>
      <Toaster />
    </>
  )
}

export default App
