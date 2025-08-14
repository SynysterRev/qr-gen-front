export default function Card({ backgroundColor="#ffffff", borderColor, children, className="" }) {
    return (
        <div className={`rounded-2xl flex flex-col gap-2 text-start shadow-sm ${className}`}
            style={{
                backgroundColor,
                borderColor
            }}>
            {children}
        </div>
    )
}