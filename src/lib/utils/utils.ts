import { QrData } from "../types/qr";

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