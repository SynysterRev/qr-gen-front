
import { Palette } from 'lucide-react';
import Input from '../ui/Input';

export default function CreateQrForm({ onSubmit }: { onSubmit: (data: any) => void }) {
    return (
        <>
            <form>
                <Input
                    label="QR Code Name"
                    name="qr-name"
                    type={"text"}
                    value={""}
                    placeholder="My QR Code"
                    className="border border-gray-200"
                    required={true}
                ></Input>
            </form>
        </>
    )
}
