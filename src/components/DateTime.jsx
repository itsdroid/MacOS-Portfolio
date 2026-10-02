import { useEffect, useState } from "react";
export default function MenuTime() {
    const [date, setDate] = useState(new Date());

    const dateTime = date.toLocaleDateString("EN-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    }).replace(",", "");

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <div>
                {dateTime.replace(",", "ㅤ")}
            </div>
        </>
    )

}