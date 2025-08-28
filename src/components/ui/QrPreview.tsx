
import { QrPreviewProps } from '@/lib/types/qr';

export default function QrPreview({
    qrConfig,
    isLoading,
    qrModulesSize,
    qrPreviewUrl,
}: QrPreviewProps) {

    const finalSizePx = qrModulesSize?.[0]
        ? (qrModulesSize[0] + 2 * qrConfig.borderSize) * qrConfig.scale
        : 0;
    return (
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
    );
}