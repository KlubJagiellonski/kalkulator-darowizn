import type { Values } from "../../../types/type"
import { formatInputValue } from "../../../utils/formatInputValues"
import "./../finish-result/FinishResult.scss"

interface FinishResultProps {
    values: Values
}

function FinisEmptyhResult({ values }: FinishResultProps) {

    const { donationPerid, donationAmount } = values

    const annualDonation =
        donationPerid === "monthly"
            ? (donationAmount ?? 0) * 12
            : (donationAmount ?? 0)

    return (
        <div className="finish-result finish-result-empty">

            <p className="tag">
                TWOJA DAROWIZNA ·{" "}
                {donationPerid === "once"
                    ? "JEDNORAZOWO"
                    : "MIESIĘCZNIE"}
            </p>

            <div className="texts-wrapper">
                <div className="texts">
                    <p className="text text-1">
                        Realnie zapłacisz
                    </p>

                    <h2 className="prec">
                        {formatInputValue(`${annualDonation}`)} zł
                    </h2>
                </div>

                <a className="details">
                    Szczegóły wyliczenia
                </a>
            </div>

            <p className="text text-2">
                z darowizny{" "}
                <span className="bold">
                    {formatInputValue(`${annualDonation}`)} zł
                </span>{" "}
                rocznie
            </p>

            <div className="belt-wrapper">
            </div>

            <div className="belt-legend">

                <div className="belt-1">
                    <p className="belt-text">
                        Z Twojej kieszeni
                    </p>

                    <p className="belt-count">
                        {formatInputValue(`${annualDonation}`)} zł
                    </p>
                </div>

                <div className="belt-2">
                    <p className="belt-text">
                        Pokrywa niższy podatek
                    </p>

                    <p className="belt-count">
                        0 zł
                    </p>
                </div>

                <p className="belt-text-2">
                    z darowizny{" "}
                    {formatInputValue(`${annualDonation}`)} zł
                </p>

                <p className="belt-text-3">
                    0 zł pokrywa niższy podatek
                </p>

            </div>

            <div className="info-wrapper">

                <div className="info-box">
                    <p className="info-text">
                        Kwota odliczenia
                    </p>

                    <p className="info-count">
                        0 zł
                    </p>
                </div>

                <div className="info-box">
                    <p className="info-text">
                        Stawka podatku
                    </p>

                    <p className="info-count">
                        —
                    </p>
                </div>

                <div className="info-box">
                    <p className="info-text">
                        Wykorzystanie limitu
                    </p>

                    <p className="info-count">
                        —
                    </p>
                </div>

            </div>

            <p className="info-alg">
                brak odliczenia przy tej formie rozliczenia
            </p>

            <p className="text text-3">
                Wyliczenie szacunkowe, na podstawie stawki
                obowiązującej dla podanego dochodu. Nie stanowi
                porady podatkowej.
            </p>

        </div>
    )
}

export default FinisEmptyhResult