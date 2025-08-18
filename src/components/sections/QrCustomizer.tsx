import Slider from "@/components/ui/Slider";
import { QrCustomizerProps } from "@/lib/types/qr";

export default function QrCustomizer({
    qrConfig,
    onChangeInput,
    onChangeSlider
}: QrCustomizerProps) {

    return (
        <div className="rounded-xl shadow-2xl border-0 bg-white p-8 flex-1/2">
            <h3 className="font-semibold text-2xl">Customize Your QR Code</h3>
            <div className="flex flex-col my-4 gap-2">
                <label htmlFor="url">Text or URL</label>
                <input id="url" className="border-1 border-black/10 rounded-xl p-2" placeholder="https://qrcraft.app" value={qrConfig.text} name="text" onChange={onChangeInput}></input>
            </div>
            <div className="flex gap-4">
                <div className="my-4 flex-1/2">
                    <Slider
                        label="Border Size"
                        value={qrConfig.borderSize}
                        min={0}
                        max={10}
                        onChange={(value) => onChangeSlider("borderSize", value)}
                        color="#8B5CF6"
                        name="borderSize"
                    />
                </div>
                <div className="flex flex-col my-4 gap-2 flex-1/2">
                    <label htmlFor="url">QR Color</label>
                    <div className="flex gap-2">
                        {/* change input color to something a bit more friendly */}
                        <input type="color" className="border-1 border-black/10 rounded-xl p-1 w-12 h-10" value={qrConfig.fillColor} onChange={onChangeInput} name="fillColor"></input>
                        <input className="border-1 border-black/10 rounded-xl p-2" value={qrConfig.fillColor} onChange={onChangeInput} name="fillColor"></input>
                    </div>
                </div>
            </div>
            <div className="mb-8">
                <Slider
                    label="Scale"
                    value={qrConfig.scale}
                    min={1}
                    max={20}
                    onChange={(value) => onChangeSlider("scale", value)}
                    color="#8B5CF6"
                    name="scale"
                />
            </div>
            <div className="flex flex-col my-4 gap-2">
                <label htmlFor="background-color">Background Color</label>
                <div className="flex gap-2">
                    <input type="color" className="border-1 border-black/10 rounded-xl p-1 w-12 h-10" value={qrConfig.backgroundColor} onChange={onChangeInput} name="backgroundColor"></input>
                    <input className="border-1 border-black/10 rounded-xl p-2 w-full" value={qrConfig.backgroundColor} onChange={onChangeInput} name="backgroundColor"></input>
                </div>
            </div>
        </div>
    );
}