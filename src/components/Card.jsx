export default function Card({ backgroundColor="#ffffff", borderColor, children, className="" }) {
    return (
        <div className={`rounded-2xl flex flex-col p-6 gap-2 text-start shadow-sm hover:shadow-lg transition-shadow ${className}`}
            style={{
                backgroundColor,
                borderColor
            }}>
            {children}
        </div>
    )
}