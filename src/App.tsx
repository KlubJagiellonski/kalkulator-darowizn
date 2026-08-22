import { useState } from 'react'
import './App.scss'
import Toggle from './components/Toggle'

function App() {
  const [position, setPosition] = useState<"first" | "second">("first")

  return (
    <div className='calculator-container'>
      <div className='calculator-wrapper'>
        <div className='header-wrapper'>
          <div className='header-box'>
            <div className='header-text'>
              <h5 className='company-name'>Klub Jagielloński</h5>
              <h1 className='title'>Ile naprawdę kosztuje Cię darowizna?</h1>
              <p className='text'>Cztery pytania. Policzymy odliczenie zgodnie z Twoją formą rozliczenia i pokażemy, ile z tej kwoty pokrywa podatek.</p>
            </div>
            <div className='header-toggle'>
              <Toggle position={position} setPosition={setPosition} firstItem='Tryb prosty' secondItem='Tryb rozszerzony'/>
              <p className='text'>Jedno pytanie na ekran, cztery kroki. Wynik liczy się od razu.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
