import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Slider from "./Slider";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from 'clsx'
import toast from 'react-hot-toast';

const formats = [
    { id: 1, name: "PNG" },
    { id: 2, name: "SVG" },
    { id: 3, name: "PDF" },
];

export default function QrGenerator() {
    const [qrConfig, setQrConfig] = useState({
        text: "https://qrcraft.app",
        fillColor: "#8B5CF6",
        backgroundColor: "#ffffff",
        scale: 10,
        borderSize: 2,
        format: formats[1].name
    });


    const [qrPreviewUrl, setQrPreviewUrl] = useState(null);
    const [qrModulesSize, setQrModulesSize] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    async function generateQrCode(config) {
        setIsLoading(true);
        const requestData = {
            url: config.text,
            customization: {
                dark: config.fillColor,
                light: config.backgroundColor,
                scale: config.scale,
                border: config.borderSize,
            },
            format: formats[1].name
        };
        try {
            const response = await fetch("http://127.0.0.1:8000/qr/preview", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error('Preview failed');
            }

            const data = await response.json();
            const { qr_base64, qr_modules_size } = data;
            const previewUrl = `data:image/svg+xml;base64,${qr_base64}`;
            setQrPreviewUrl(previewUrl);
            setQrModulesSize(qr_modules_size);
            setIsLoading(false);
        }
        catch (error) {
            console.error('Error preview:', error);
            toast.error('Preview failed, please try again.');
        }
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

    function handleInputChange(e) {
        const { value, name } = e.currentTarget;
        setQrConfig(prevQrConfig => ({
            ...prevQrConfig,
            [name]: value
        }));
    }

    function handleSliderChange(name, value) {
        setQrConfig(prevQrConfig => ({
            ...prevQrConfig,
            [name]: value
        }));
    }

    async function handleDownload() {
        const requestData = {
            url: qrConfig.text,
            customization: {
                dark: qrConfig.fillColor,
                light: qrConfig.backgroundColor,
                scale: qrConfig.scale,
                border: qrConfig.borderSize,
            },
            format: qrConfig.format.toLocaleLowerCase()
        };
        try {
            const response = await fetch("http://127.0.0.1:8000/qr/download", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error('Download failed');
            }

            const blob = await response.blob();

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `qrcode.${qrConfig.format}`;
            a.click();
            URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Error download:', error);
            toast.error('Download failed, please try again.');
        }
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
                            {/* change input color to something a bit more friendly */}
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
            </div>
            <div className="rounded-xl shadow-2xl border-0 bg-white p-8 flex-1/2">
                <h3 className="font-semibold text-2xl">Preview</h3>
                <div className="flex justify-center items-center animate-float h-[400px]">
                    {isLoading && <div className="spinner">Loading...</div>}
                    {!isLoading && qrPreviewUrl && (
                        <div className="relative rounded-2xl overflow-hidden shadow-lg w-80 h-80">
                            <img
                                src={qrPreviewUrl}
                                alt="qr preview"
                                className="w-full h-full object-contain"
                            />
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                {finalSizePx}×{finalSizePx}px
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex justify-center items-end gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="format">Output Format</label>
                        <div className="flex gap-2">
                            <Listbox value={qrConfig.format}
                                onChange={(value) =>
                                    setQrConfig((prev) => ({
                                        ...prev,
                                        format: value,
                                    }))}
                                name="format">
                                <ListboxButton
                                    className={clsx(
                                        'relative block w-full rounded-xl bg-white py-2 pr-8 pl-3 h-10 text-left text-sm text-black border border-black/10',
                                        'focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                    )}
                                >
                                    {qrConfig.format}
                                    <ChevronDownIcon
                                        className="pointer-events-none absolute top-2.5 right-2.5 size-4 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </ListboxButton>

                                <ListboxOptions
                                    anchor="bottom"
                                    transition
                                    className={clsx(
                                        'w-(--button-width) rounded-xl border border-gray-200 bg-white p-1 shadow-lg [--anchor-gap:--spacing(1)] focus:outline-none',
                                        'transition duration-100 ease-in data-leave:data-closed:opacity-0'
                                    )}
                                >
                                    {formats.map((format) => (
                                        <ListboxOption
                                            key={format.id}
                                            value={format.name}
                                            className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-gray-100"
                                        >
                                            <CheckIcon className="invisible size-4 text-indigo-600 group-data-selected:visible" />
                                            <div className="text-sm text-black">{format.name}</div>
                                        </ListboxOption>
                                    ))}
                                </ListboxOptions>
                            </Listbox>
                        </div>
                    </div>
                    <button onClick={handleDownload} className="rounded-xl border border-primary/40 py-2 px-4 cursor-pointer bg-white transition-all duration-300 hover:border-primary hover:bg-primary/20 h-10">Download</button>
                </div>
            </div>
        </div>
    );
}