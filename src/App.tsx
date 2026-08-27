import { useState } from 'react'
import './App.scss'
import Stepper from './components/stepper/Stepper'
import FirstStep from './components/stepper/firstStep/FirstStep'
import SecondStep from './components/stepper/secondStep/SecondStep'
import ThirdStep from './components/stepper/thirdStep/ThirdStep'
import FourthStep from './components/stepper/fourthStep/FourthStep'
import type { Values } from './types/type'
import StepperNav from './components/stepper/nav/StepperNav'
import Result from './components/result/Result'

function App() {

  const defaultValues: Values = {
    pit: false,
    cit: false,
    incomePeriod: "yearly",
    donationPerid: "once",
    donationAmount: 500
  }

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
      subtitle: values.pit ? "Decyduje o tym, czy odliczenie jest możliwe" : "Decyduje o wysokości korzyści podatkowej",
      name: "Rozliczenie",
      isValid: (!!values.cit && !!values.citType) || (!!values.pit && !!values.pitType),
      children: <SecondStep values={values} setValues={setValues} />
    },
    {
      title: "Twój roczny dochód brutto",
      subtitle: "Wyznacza limit odliczenia",
      name: "Dochód",
      children: <ThirdStep values={values} setValues={setValues} />,
      isValid: (!!values.income),
    },
    {
      title: "Kwota darowizny",
      subtitle: "Jednorazowo albo co miesiąc",
      name: "Kwota",
      children: <FourthStep values={values} setValues={setValues} />,
      isValid: (step===4 && !!values.donationAmount),
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
              <p className='text'>Cztery pytania. Policzymy Twój limit odliczenia i pokażemy, ile z darowizny pokrywa niższy podatek.</p>
            </div>
            <p className='header-year'>
              ROK PODATKOWY 2026
            </p>
          </div>
        </div>
        <div className='content-wrapper'>
          <div className='stepper-wrapper'>
            <Stepper step={step} items={steps} setStep={setStep} />
            <StepperNav values={values} step={step} setStep={setStep} />
          </div>
          <Result setValues={setValues} values={values} step={step} setStep={setStep} />
        </div>
      </div>
    </div>
  )
}

export default App
