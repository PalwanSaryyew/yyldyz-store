'use client'
import { useStore } from "./UniStore";

export function Count() {
    const count = useStore((state) => state.count);

    return (
        <div>
            <p>Sayı: {count}</p>
        </div>
    );
}
export function Counter() {
    const increment = useStore((state) => state.increment);

    return (
        <div>
            <button onClick={increment}>Arttır</button>
        </div>
    );
}