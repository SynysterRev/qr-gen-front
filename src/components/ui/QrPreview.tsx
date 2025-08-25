import { FORMATS } from '@/lib/constants/qr';
import { QrPreviewProps } from '@/lib/types/qr';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from 'clsx';

export default function QrPreview({
    qrConfig,
    isLoading,
    qrModulesSize,
    qrPreviewUrl,
    onDownload,
    onFormatChange
}: QrPreviewProps) {

    const finalSizePx = qrModulesSize?.[0]
        ? (qrModulesSize[0] + 2 * qrConfig.borderSize) * qrConfig.scale
        : 0;

    return (
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
                        {finalSizePx > 0 ?
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                {finalSizePx}×{finalSizePx}px
                            </div>
                            : ""
                        }
                    </div>
                )}
            </div>
            {onDownload ?
                <div className="flex justify-center items-end gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="format">Output Format</label>
                        <div className="flex gap-2">
                            <Listbox value={qrConfig?.format}
                                onChange={onFormatChange}
                                name="format">
                                <ListboxButton
                                    className={clsx(
                                        'relative block w-full rounded-xl bg-white py-2 pr-8 pl-3 h-10 text-left text-sm text-black border border-black/10',
                                        'focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                    )}
                                >
                                    {qrConfig?.format}
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
                                    {FORMATS.map((format) => (
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
                    <button onClick={onDownload} className="rounded-xl border border-primary/40 py-2 px-4 cursor-pointer bg-white transition-all duration-300 hover:border-primary hover:bg-primary/20 h-10">Download</button>
                </div>
                : ""
            }
        </div>
    );
}