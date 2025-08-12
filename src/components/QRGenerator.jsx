import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Slider from "./Slider";

export default function QrGenerator() {
    const [qrConfig, setQrConfig] = useState({
        text: "https://qrcraft.app",
        fillColor: "#8B5CF6",
        backgroundColor: "#ffffff",
        scale: 8,
        borderSize: 2,
    });
    const [qrPreviewUrl, setQrPreviewUrl] = useState(null);
    const [qrModulesSize, setQrModulesSize] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    function generateQrCode(config) {
        setIsLoading(true);
        const requestData = {
            url: config.text,
            customization: {
                dark: config.fillColor,
                light: config.backgroundColor,
                scale: config.scale,
                border: config.borderSize
            }
        };
        fetch("http://127.0.0.1:8000/qr/preview", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        })
            .then(res => res.json())
            .then(data => {
                const { qr_base64, qr_modules_size } = data;
                const previewUrl = `data:image/png;base64,${qr_base64}`;
                setQrPreviewUrl(previewUrl);
                setQrModulesSize(qr_modules_size);
            })
            .catch(error => {
                console.error("Erreur lors de la génération du QR code:", error);
                setQrPreviewUrl(null);
                setQrModulesSize(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const debouncedUpdate = useDebouncedCallback(
        (config) => generateQrCode(config),
        300
    );

    useEffect(() => {
        if (qrConfig.text.length > 0) {
            debouncedUpdate(qrConfig);
        } else {
            setQrPreviewUrl(null);
            setQrModulesSize(null);
        }
    }, [qrConfig, debouncedUpdate]);

    // Fonction de mise à jour pour les inputs de type texte ou couleur
    function handleInputChange(e) {
        const { value, name } = e.currentTarget;
        setQrConfig(prevQrConfig => ({
            ...prevQrConfig,
            [name]: value
        }));
    }

    // Fonction de mise à jour pour les sliders
    function handleSliderChange(name, value) {
        setQrConfig(prevQrConfig => ({
            ...prevQrConfig,
            [name]: value
        }));
    }

    const finalSizePx = (qrModulesSize && qrModulesSize.length > 0)
        ? (qrModulesSize[0] + 2 * qrConfig.borderSize) * qrConfig.scale
        : 0;
    return (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-center gap-8 text-start">
            <div className="rounded-xl shadow-2xl border-0 bg-white p-8 flex-1/2">
                <h3 className="font-semibold text-2xl">Customize Your QR Code</h3>
                <div className="flex flex-col my-4 gap-2">
                    <label htmlFor="url">Text or URL</label>
                    <input id="url" className="border-1 border-black/10 rounded-xl p-2" placeholder="https://qrcraft.app" value={qrConfig.text} name="text" onChange={handleInputChange}></input>
                </div>
                <div className="flex gap-4">
                    <div className="my-4 flex-1/2">
                        <Slider
                            label="Border Size"
                            value={qrConfig.borderSize}
                            min={0}
                            max={10}
                            onChange={(value) => handleSliderChange("borderSize", value)}
                            color="#8B5CF6"
                        />
                    </div>
                    <div className="flex flex-col my-4 gap-2 flex-1/2">
                        <label htmlFor="url">QR Color</label>
                        <div className="flex gap-2">
                            <input type="color" className="border-1 border-black/10 rounded-xl p-1 w-12 h-10" value={qrConfig.fillColor} onChange={handleInputChange} name="fillColor"></input>
                            <input className="border-1 border-black/10 rounded-xl p-2" value={qrConfig.fillColor} onChange={handleInputChange} name="fillColor"></input>
                        </div>
                    </div>
                </div>
                <div className="mb-8">
                    <Slider
                        label="Scale"
                        value={qrConfig.scale}
                        min={1}
                        max={20}
                        onChange={(value) => handleSliderChange("scale", value)}
                        color="#8B5CF6"
                    />
                </div>
                <div className="flex flex-col my-4 gap-2">
                    <label htmlFor="background-color">Background Color</label>
                    <div className="flex gap-2">
                        <input type="color" className="border-1 border-black/10 rounded-xl p-1 w-12 h-10" value={qrConfig.backgroundColor} onChange={handleInputChange} name="backgroundColor"></input>
                        <input className="border-1 border-black/10 rounded-xl p-2 w-full" value={qrConfig.backgroundColor} onChange={handleInputChange} name="backgroundColor"></input>
                    </div>
                </div>
                {/* <button className="bg-primary rounded-xl text-white w-full py-2 cursor-pointer transition-all group duration-300 hover:shadow-[var(--shadow-elegant)] 
            hover:bg-primary/90 bg-gradient-to-r from-primary to-primary-glow">Generate QR Code</button> */}
            </div>

            <div className="rounded-xl shadow-2xl border-0 bg-white p-8 flex-1/2">
                <h3 className="font-semibold text-2xl">Preview</h3>
                <div className="flex justify-center items-center animate-float h-full">
                    {isLoading && <div className="spinner">Loading...</div>}
                    {!isLoading && qrPreviewUrl && qrModulesSize && qrModulesSize.length > 0 && (
                        <div
                            className="relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300"
                            style={{
                                width: `${finalSizePx}px`,
                                height: `${finalSizePx}px`
                            }}
                        >
                            <img
                                src={qrPreviewUrl}
                                alt="qr preview"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}