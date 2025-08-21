import { Palette } from "lucide-react";
import Modal from "./Modal";
import CreateQrForm from "../forms/CreateQrForm";

export default function CreateQrFormModal() {
    return (
        <>
            <Modal title={"Create New QR Code"} isOpen={true}>
                <div className="flex items-center space-x-2 mb-4">
                    <Palette className="text-primary" />
                    <h3 className="text-2xl font-bold">Customize Your QR Code</h3>
                </div>
                <div className="flex flex-col space-y-4">
                    <h4 className="text-lg font-semibold leading-none tracking-tight">Basic Information</h4>
                </div>
                <CreateQrForm onSubmit={() => { }} />
            </Modal>
        </>
    )
}