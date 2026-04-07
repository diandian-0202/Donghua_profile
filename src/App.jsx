import Navbar from './components/Navbar'
import About from './components/About'
import Publications from './components/Publications'
import Experience from './components/Experience'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <About />
        <Publications />
        <Experience />
      </main>
    </>
  )
}

export default App
