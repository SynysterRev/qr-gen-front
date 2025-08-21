import { usePathname } from 'next/navigation';

export const useActiveLink = () => {
    const pathname = usePathname();

    const isActiveLink = (href: string) => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(href);
    };

    return { isActiveLink, pathname };
};