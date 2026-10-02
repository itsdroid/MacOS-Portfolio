import { useEffect, useRef } from "react";
import MacWindow from "./MacWindow";
import "./Clock.css";

export default function Clock({setWindowState}) {
    const clockRef = useRef(null);
    const chooserRef = useRef(null);

    useEffect(() => {
        const clock = clockRef.current;
        const chooser = chooserRef.current;

        if (!clock || !chooser) return;

        utilityClock(clock);
        autoResize(clock, 295 + 32);
        choose(clock, chooser, [
            ["hour", ["text", "text-quarters", "pill"]],
            ["hour-text", ["large", "small"]],
            ["hour-display", ["all", "quarters", "none"]],
            ["minute", ["line", "dot"]],
            ["minute-display", ["fine", "fine-2", "coarse", "major", "none"]],
            ["minute-text", ["inside", "outside", "none"]],
            ["hand", ["normal", "hollow"]],
        ]);

        return () => {

        };
    }, []);

    function utilityClock(container) {
        const dynamic = container.querySelector(".dynamic");
        const hourElement = container.querySelector(".hour");
        const minuteElement = container.querySelector(".minute");
        const secondElement = container.querySelector(".second");

        const div = (className, innerHTML = "") => {
            const element = document.createElement("div");

            element.className = className;
            element.innerHTML = innerHTML;

            return element;
        };

        const append = (element) => ({
            to(parent) {
                parent.appendChild(element);
                return append(parent);
            },
        });

        const anchor = (element, rotation) => {
            const anchorElement = div("anchor");

            rotate(anchorElement, rotation);

            append(element)
                .to(anchorElement)
                .to(dynamic);
        };

        const minute = (n) => {
            const klass =
                n % 5 === 0
                    ? "major"
                    : n % 1 === 0
                        ? "whole"
                        : "part";

            const line = div(`element minute-line ${klass}`);

            anchor(line, n);

            if (n % 5 === 0) {
                const text = div(`anchor minute-text ${klass}`);

                const content = div(
                    "expand content",
                    (n < 10 ? "0" : "") + n
                );

                append(content).to(text);

                rotate(text, -n);

                anchor(text, n);
            }
        };

        const hour = (n) => {
            const klass = `hour-item hour-${n}`;

            const line = div(`element hour-pill ${klass}`);

            anchor(line, n * 5);

            const text = div(`anchor hour-text ${klass}`);

            const content = div("expand content", n);

            append(content).to(text);

            rotate(text, -n * 5);

            anchor(text, n * 5);
        };

        const rotate = (element, second) => {
            element.style.transform = `rotate(${second * 6}deg)`;
            element.style.webkitTransform = `rotate(${second * 6}deg)`;
        };

        let animationFrame;

        const animate = () => {
            const now = new Date();

            const time =
                now.getHours() * 3600 +
                now.getMinutes() * 60 +
                now.getSeconds() +
                now.getMilliseconds() / 1000;

            rotate(secondElement, time);
            rotate(minuteElement, time / 60);
            rotate(hourElement, time / 60 / 12);

            animationFrame = requestAnimationFrame(animate);
        };

        // Generate minute marks
        for (let i = 1 / 4; i <= 60; i += 1 / 4) {
            minute(i);
        }

        // Generate hour marks
        for (let i = 1; i <= 12; i++) {
            hour(i);
        }

        animate();

        // Cleanup animation
        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }

    function autoResize(element, nativeSize) {
        const update = () => {
            const parent = element.offsetParent;

            if (!parent) return;

            const scale =
                Math.min(
                    parent.offsetWidth,
                    parent.offsetHeight
                ) / nativeSize;

            element.style.transform = `scale(${scale.toFixed(3)})`;
            element.style.webkitTransform =
                `scale(${scale.toFixed(3)})`;
        };

        update();

        window.addEventListener("resize", update);

        // Cleanup resize listener
        return () => {
            window.removeEventListener("resize", update);
        };
    }

    function choose(clock, chooser, items) {
        items.forEach(([name, styles]) => {
            const element = document.createElement("div");

            element.addEventListener("click", click);

            update();

            chooser.appendChild(element);

            function update() {
                element.innerHTML =
                    `${name}-style-<b>${getValue()}</b>`;
            }

            function klass(value) {
                return `${name}-style-${value}`;
            }

            function getValue() {
                for (let i = 0; i < styles.length; i++) {
                    if (clock.classList.contains(klass(styles[i]))) {
                        return styles[i];
                    }
                }

                return styles[0];
            }

            function click(event) {
                for (let i = 0; i < styles.length; i++) {
                    if (clock.classList.contains(klass(styles[i]))) {
                        clock.classList.remove(
                            klass(styles[i])
                        );

                        clock.classList.add(
                            klass(styles[(i + 1) % styles.length])
                        );

                        break;
                    }
                }

                update();

                event.preventDefault();
            }
        });
    }

    return (
        <MacWindow minHeight="60vh" minWidth="37vw"
            setWindowState={setWindowState}
            windowName="Clock">
            <div ref={chooserRef} id="chooser"></div>

            <div className="fill">
                <div
                    ref={clockRef}
                    className="
                        clock
                        hour-style-pill
                        hour-text-style-large
                        hour-display-style-all
                        minute-style-line
                        minute-display-style-fine-2
                        minute-text-style-outside
                        hand-style-hollow
                    "
                    id="utility-clock"
                >
                    <div className="centre">

                        <div className="dynamic"></div>

                        <div className="expand round circle-1"></div>

                        <div className="anchor hour">
                            <div className="element thin-hand"></div>
                            <div className="element fat-hand"></div>
                        </div>

                        <div className="anchor minute">
                            <div className="element thin-hand"></div>
                            <div className="element fat-hand minute-hand"></div>
                        </div>

                        <div className="anchor second">
                            <div className="element second-hand second-hand-front"></div>
                            <div className="element second-hand second-hand-back"></div>
                        </div>

                        <div className="expand round circle-2"></div>

                    </div>
                </div>
            </div>
        </MacWindow>
    );
}