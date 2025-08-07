import { useState } from "react";

export default function QrGenerator() {
    const [fillColor, setFillColor] = useState("#8B5CF6")
    const [backgroundColor, setBackgroundColor] = useState("#8B5CF6")

    function changeFillColor(e) {
        setFillColor(e.target.value)
    }

    function changeBackgroundColor(e) {
        setBackgroundColor(e.target.value)
    }

    return (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-center gap-8 text-start">
            <div className="rounded-xl shadow-2xl border-0 bg-white p-8 flex-1/2">
                <h3 className="font-semibold text-2xl">Customize Your QR Code</h3>
                <div className="flex flex-col my-4 gap-2">
                    <label htmlFor="url">Text or URL</label>
                    <input id="url" className="border-1 border-black/10 rounded-xl p-2" placeholder="https://qrcraft.app"></input>
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col my-4 gap-2 flex-1/2">
                        <label htmlFor="size">Size</label>
                        <select id="size" className="border-1 border-black/10 rounded-xl p-2" placeholder="https://qrcraft.app" defaultValue={10}>
                            <option value="5" className="rounded-xl">128x128</option>
                            <option value="10">256x256</option>
                            <option value="20">512x512</option>
                            <option value="40">1024x1024</option>
                        </select>
                    </div>
                    <div className="flex flex-col my-4 gap-2 flex-1/2">
                        <label htmlFor="url">QR Color</label>
                        <div className="flex gap-2">
                            <input type="color" className="border-1 border-black/10 rounded-xl p-1 w-12 h-10" value={fillColor} onChange={changeFillColor}></input>
                            <input className="border-1 border-black/10 rounded-xl p-2" value={fillColor} onChange={changeFillColor}></input>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col my-4 gap-2">
                    <label htmlFor="background-color">Background Color</label>
                    <div className="flex gap-2">
                        <input type="color" className="border-1 border-black/10 rounded-xl p-1 w-12 h-10" value={backgroundColor} onChange={changeBackgroundColor}></input>
                        <input className="border-1 border-black/10 rounded-xl p-2 w-full" value={backgroundColor} onChange={changeBackgroundColor}></input>
                    </div>
                </div>
                <button className="bg-primary rounded-xl text-white w-full py-2 cursor-pointer transition-all group duration-300 hover:shadow-[var(--shadow-elegant)] 
                    hover:bg-primary/90 bg-gradient-to-r from-primary to-primary-glow">Generate QR Code</button>
            </div>
            <div className="rounded-xl shadow-2xl border-0 bg-white p-8 flex-1/2">
                <h3 className="font-semibold text-2xl">Preview</h3>
            </div>
        </div>
    );
}