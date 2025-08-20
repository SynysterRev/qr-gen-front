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