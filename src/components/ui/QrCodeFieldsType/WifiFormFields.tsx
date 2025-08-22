import { WifiFormFieldsProps } from "@/lib/types/qr";
import Input from "../Input";

export default function WifiFormFields({ ssid, password, onChange }: WifiFormFieldsProps) {
    return (
        <div className="mt-3 space-y-2">
            <Input
                type="text"
                name="ssid"
                label="SSID"
                value={ssid}
                onChange={(e) => onChange({ ssid: e.target.value, password })}
                required={true}
            />
            <Input
                type="password"
                name="password"
                label="Password"
                value={password}
                onChange={(e) => onChange({ ssid, password: e.target.value })}
                required={true}
            />
        </div>
    );
}