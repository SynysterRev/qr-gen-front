import { QrCodeType, QrData } from "../types/qr";

export function formatLocalDate(dateString: string, locale: string | null = null): string {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return '';
    }
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };

    const currentLocale = locale || navigator.language;

    return new Intl.DateTimeFormat(currentLocale, options).format(date);
}

export const convertFormDataToText = (data: Partial<QrData>): string => {
    switch (data.type) {
        case "website":
            return data.website || "";
        case "text":
            return data.text || "";
        case "wifi":
            if (data.wifi?.ssid) {
                return `WIFI:T:WPA;S:${data.wifi.ssid};P:${data.wifi.password || ""};H:false;`;
            }
            return "";
        case "contact":
            if (data.contact) {
                const { firstName, lastName, phone, email, organization, website, address } = data.contact;
                const name = [firstName, lastName].filter(Boolean).join(' ');
                return [
                    'BEGIN:VCARD',
                    'VERSION:3.0',
                    name ? `FN:${name}` : '',
                    organization ? `ORG:${organization}` : '',
                    phone ? `TEL;TYPE=WORK,VOICE:${phone}` : '',
                    email ? `EMAIL;TYPE=PREF,INTERNET:${email}` : '',
                    website ? `URL:${website}` : '',
                    address ? `ADR;TYPE=WORK:;;${address};;;` : '',
                    'END:VCARD'
                ].filter(Boolean).join('\n');
            }
            return "";
        case "email":
            if (data.email?.email) {
                const subject = data.email.subject ? `?subject=${encodeURIComponent(data.email.subject)}` : '';
                const body = data.email.message ? `${subject ? '&' : '?'}body=${encodeURIComponent(data.email.message)}` : '';
                return `mailto:${data.email.email}${subject}${body}`;
            }
            return "";
        case "sms":
            if (data.sms?.number) {
                return `sms:${data.sms.number}?body=${data.sms.message || ''}`;
            }
            return "";
        default:
            return "";
    }
};

export const convertTextToFormData = (type: QrCodeType, text: string): Partial<QrData> => {
    switch (type) {
        case "website":
            return { type, website: text };
        case "text":
            return { type, text };
        case "wifi":
            if (!text.startsWith("WIFI:")) return { type };
            const ssidMatch = text.match(/S:([^;]*)/);
            const passwordMatch = text.match(/P:([^;]*)/);
            return {
                type,
                wifi: {
                    ssid: ssidMatch?.[1] || "",
                    password: passwordMatch?.[1] || ""
                }
            };
        case "contact":
            if (!text.startsWith("BEGIN:VCARD")) return { type };
            const contact: any = {};
            const lines = text.split("\n");
            lines.forEach(line => {
                if (line.startsWith("FN:")) {
                    const name = line.replace("FN:", "");
                    const [firstName, ...rest] = name.split(" ");
                    contact.firstName = firstName;
                    contact.lastName = rest.join(" ") || "";
                } else if (line.startsWith("ORG:")) {
                    contact.organization = line.replace("ORG:", "");
                } else if (line.startsWith("TEL;")) {
                    contact.phone = line.split(":")[1] || "";
                } else if (line.startsWith("EMAIL;")) {
                    contact.email = line.split(":")[1] || "";
                } else if (line.startsWith("URL:")) {
                    contact.website = line.replace("URL:", "");
                } else if (line.startsWith("ADR;")) {
                    const parts = line.split(":");
                    contact.address = parts[1]?.replace(/;;;/g, "") || "";
                }
            });
            return { type, contact };
        case "email":
            if (!text.startsWith("mailto:")) return { type };
            const mail = text.replace("mailto:", "");
            const [emailAddr, query] = mail.split("?");
            const emailObj: any = { email: emailAddr };
            if (query) {
                const params = new URLSearchParams(query);
                emailObj.subject = params.get("subject") || "";
                emailObj.message = params.get("body") || "";
            }
            return { type, email: emailObj };
        case "sms":
            if (!text.startsWith("sms:")) return { type };
            const [smsNumberPart, smsQuery] = text.split("?");
            const number = smsNumberPart.replace("sms:", "");
            const smsObj: any = { number, message: "" };
            if (smsQuery) {
                const params = new URLSearchParams(smsQuery);
                smsObj.message = params.get("body") || "";
            }
            return { type, sms: smsObj };
        default:
            return { type };
    }
};