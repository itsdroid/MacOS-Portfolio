import { useEffect, useState } from "react";
import "./TimeWidget.scss";

export default function ClockWidget() {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Hours and minutes separately for full control
    const hours = now.toLocaleString("en-US", {
        hour: "2-digit",
        hour12: true,
    }).split(" ")[0];

    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = now.getHours() >= 12 ? "PM" : "AM";

    const clockTime = `${hours}:${minutes}`;

    const dayName = now.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
    const dayNum = String(now.getDate()).padStart(2, "0");
    const month = now.toLocaleDateString("en-US", { month: "short" }).toUpperCase();

    // Monday=0 … Sunday=6
    const mondayIndex = (now.getDay() + 6) % 7;

    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(now);
        d.setDate(now.getDate() - mondayIndex + i);
        return {
            name: d.toLocaleDateString("en-US", { weekday: "short" }),
            date: d.getDate(),
            active: i === mondayIndex,
        };
    });

    return (
        <div className="cw-root">

            {/* ── Top section: big time  +  right column (ampm / date) ── */}
            <div className="cw-top">

                <div className="cw-time">{clockTime}</div>

                <div className="cw-right-col">
                    <span className="cw-ampm">{ampm}</span>
                    <span className="cw-date">{dayName}, {dayNum} {month}</span>
                </div>

            </div>

            {/* ── Week row ── */}
            <div className="cw-week">
                {weekDays.map((day, i) => (
                    <div className={`cw-day${day.active ? " cw-day--active" : ""}`} key={i}>
                        <span className="cw-day-name">{day.name}</span>
                        <span className="cw-day-num">{day.date}</span>
                    </div>
                ))}
            </div>

        </div>
    );
}