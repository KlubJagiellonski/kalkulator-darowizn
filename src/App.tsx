import { useState } from 'react'
import './App.scss'
import Toggle from './components/UI/toggle/Toggle'
import Stepper from './components/stepper/Stepper'
import FirstStep from './components/stepper/firstStep/FirstStep'
import SecondStep from './components/stepper/secondStep/SecondStep'
import ThirdStep from './components/stepper/thirdStep/ThirdStep'
import FourthStep from './components/stepper/FourthStep'
import type { Values } from './types/type'
import StepperNav from './components/stepper/StepperNav'

function App() {

  const defaultValues: Values = {
    pit: false,
    cit: false,
    pitType: "scale",
    citType: "cit19",
    income: 96000
  }

  const [position, setPosition] = useState<"first" | "second">("first")
  const [step, setStep] = useState(1)
  const [values, setValues] = useState(defaultValues)

  const steps = [
    {
      title: "Kto przekazuje darowiznę?",
      subtitle: "Osoba prywatna czy firma",
      name: "Kto",
      isValid: values.cit || values.pit,
      children: <FirstStep values={values} setValues={setValues} />
    },
    {
      title: "Forma rozliczenia PIT",
      subtitle: "Decyduje o stawce i o tym, czy odliczenie jest możliwe",
      name: "Rozliczenie",
      children: <SecondStep values={values} setValues={setValues} />
    },
    {
      title: "Twój roczny dochód brutto",
      subtitle: "Wyznacza limit odliczenia",
      name: "Dochód",
      children: <ThirdStep values={values} setValues={setValues} />
    },
    {
      title: "Kwota darowizny",
      subtitle: "Jednorazowo albo co miesiąc",
      name: "Kwota",
      children: <FourthStep />
    },
  ]

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
              <Toggle position={position} setPosition={setPosition} firstItem='Tryb prosty' secondItem='Tryb rozszerzony' />
              <p className='text'>Jedno pytanie na ekran, cztery kroki. Wynik liczy się od razu.</p>
            </div>
          </div>
        </div>
        <div className='content-wrapper'>
          <div className='stepper-wrapper'>
            <Stepper step={step} items={steps} setStep={setStep} />
            <StepperNav step={step} setStep={setStep}/>
          </div>
          <div className='left-panel'></div>
        </div>
      </div>
    </div>
  )
}

export default App
