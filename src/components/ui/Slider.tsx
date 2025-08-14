interface SliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
    color: string;
    name: string;
}

const Slider = ({ label, value, min, max, onChange, color, name }: SliderProps) => {
    return (
        <div className="flex flex-col items-start gap-2">
            <label htmlFor={`slider-${label.replace(/\s/g, '-')}`} className="text-gray-700 mb-4">
                {label}: {value}
            </label>
            <input
                type="range"
                id={`slider-${label.replace(/\s/g, '-')}`}
                min={min}
                max={max}
                value={value}
                name={name}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                    background: `linear-gradient(to right, ${color} 0%, ${color} ${((value - min) / (max - min)) * 100}%, #E5E7EB ${((value - min) / (max - min)) * 100}%, #E5E7EB 100%)`,
                }}
            />
        </div>
    );
};

export default Slider;