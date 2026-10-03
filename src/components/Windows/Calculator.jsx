import MacWindow from "./MacWindow";
import "./Calculator.scss";
import { useEffect, useState } from "react";

export default function Calculator({ setWindowState }) {
    const [currentValue, setCurrentValue] = useState("0");
    const [previousValue, setPreviousValue] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const formatNumber = (value) => {
        if (value === "Error") return value;

        const [integer, decimal] = value.split(".");

        const formattedInteger = Number(integer).toLocaleString("en-IN");

        return decimal !== undefined
            ? `${formattedInteger}.${decimal}`
            : formattedInteger;
    };

    const inputNumber = (number) => {
        if (currentValue === "Error") {
            setCurrentValue(String(number));
            return;
        }

        if (waitingForOperand) {
            setCurrentValue(String(number));
            setWaitingForOperand(false);
            return;
        }

        if (currentValue === "0") {
            setCurrentValue(String(number));
        } else {
            setCurrentValue((prev) => prev + number);
        }
    };

    const inputDecimal = () => {
        if (waitingForOperand) {
            setCurrentValue("0.");
            setWaitingForOperand(false);
            return;
        }

        if (!currentValue.includes(".")) {
            setCurrentValue((prev) => prev + ".");
        }
    };

    const clearCalculator = () => {
        setCurrentValue("0");
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(false);
    };

    const toggleSign = () => {
        if (currentValue === "0" || currentValue === "Error") return;

        setCurrentValue((prev) =>
            prev.startsWith("-") ? prev.slice(1) : `-${prev}`
        );
    };

    const percentage = () => {
        if (currentValue === "Error") return;

        const result = Number(currentValue) / 100;
        setCurrentValue(String(result));
    };

    const calculate = (first, second, operation) => {
        const a = Number(first);
        const b = Number(second);

        switch (operation) {
            case "+":
                return a + b;

            case "-":
                return a - b;

            case "*":
                return a * b;

            case "/":
                if (b === 0) return "Error";
                return a / b;

            default:
                return b;
        }
    };

    const chooseOperator = (nextOperator) => {
        if (currentValue === "Error") return;

        const inputValue = Number(currentValue);

        if (operator && waitingForOperand) {
            setOperator(nextOperator);
            return;
        }

        if (previousValue === null) {
            setPreviousValue(inputValue);
        } else if (operator) {
            const result = calculate(
                previousValue,
                inputValue,
                operator
            );

            setCurrentValue(String(result));
            setPreviousValue(result === "Error" ? null : result);
        }

        setOperator(nextOperator);
        setWaitingForOperand(true);
    };

    const equal = () => {
        if (
            operator === null ||
            previousValue === null ||
            currentValue === "Error"
        ) {
            return;
        }

        const result = calculate(
            previousValue,
            Number(currentValue),
            operator
        );

        setCurrentValue(String(result));
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(true);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            const { key } = event;

            if (/^[0-9]$/.test(key)) {
                inputNumber(Number(key));
                return;
            }

            switch (key) {
                case ".":
                case ",":
                    inputDecimal();
                    break;

                case "+":
                case "-":
                case "*":
                case "/":
                    chooseOperator(key);
                    break;

                case "%":
                    percentage();
                    break;

                case "Enter":
                case "=":
                    equal();
                    break;

                case "Escape":
                case "Delete":
                    clearCalculator();
                    break;

                case "Backspace":
                    if (
                        currentValue.length > 1 &&
                        currentValue !== "Error"
                    ) {
                        setCurrentValue((prev) => prev.slice(0, -1));
                    } else {
                        setCurrentValue("0");
                    }
                    break;

                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    });

    return (
        <MacWindow
            setWindowState={setWindowState}
            windowName="Calculator"
        >
            <main className="calculator">
                <section className="calculator__display">
                    <p className="calculator__result">
                        {formatNumber(currentValue)}
                    </p>
                </section>

                <section className="calculator__buttons">

                    <div className="calculator__row">
                        <button
                            className="calculator__button calculator__button--dark"
                            onClick={clearCalculator}
                        >
                            AC
                        </button>

                        <button
                            className="calculator__button calculator__button--dark"
                            onClick={toggleSign}
                        >
                            ±
                        </button>

                        <button
                            className="calculator__button calculator__button--dark"
                            onClick={percentage}
                        >
                            %
                        </button>

                        <button
                            className="calculator__button calculator__button--operator"
                            onClick={() => chooseOperator("/")}
                        >
                            ÷
                        </button>
                    </div>

                    <div className="calculator__row">
                        <button
                            className="calculator__button"
                            onClick={() => inputNumber(7)}
                        >
                            7
                        </button>

                        <button
                            className="calculator__button"
                            onClick={() => inputNumber(8)}
                        >
                            8
                        </button>

                        <button
                            className="calculator__button"
                            onClick={() => inputNumber(9)}
                        >
                            9
                        </button>

                        <button
                            className="calculator__button calculator__button--operator"
                            onClick={() => chooseOperator("*")}
                        >
                            ×
                        </button>
                    </div>

                    <div className="calculator__row">
                        <button
                            className="calculator__button"
                            onClick={() => inputNumber(4)}
                        >
                            4
                        </button>

                        <button
                            className="calculator__button"
                            onClick={() => inputNumber(5)}
                        >
                            5
                        </button>

                        <button
                            className="calculator__button"
                            onClick={() => inputNumber(6)}
                        >
                            6
                        </button>

                        <button
                            className="calculator__button calculator__button--operator"
                            onClick={() => chooseOperator("-")}
                        >
                            −
                        </button>
                    </div>

                    <div className="calculator__row">
                        <button
                            className="calculator__button"
                            onClick={() => inputNumber(1)}
                        >
                            1
                        </button>

                        <button
                            className="calculator__button"
                            onClick={() => inputNumber(2)}
                        >
                            2
                        </button>

                        <button
                            className="calculator__button"
                            onClick={() => inputNumber(3)}
                        >
                            3
                        </button>

                        <button
                            className="calculator__button calculator__button--operator"
                            onClick={() => chooseOperator("+")}
                        >
                            +
                        </button>
                    </div>

                    <div className="calculator__row">
                        <button
                            className="calculator__button calculator__button--zero"
                            onClick={() => inputNumber(0)}
                        >
                            0
                        </button>

                        <button
                            className="calculator__button"
                            onClick={inputDecimal}
                        >
                            .
                        </button>

                        <button
                            className="calculator__button calculator__button--operator calculator__button--equal"
                            onClick={equal}
                        >
                            =
                        </button>
                    </div>

                </section>
            </main>
        </MacWindow>
    );
}