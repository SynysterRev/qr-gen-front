import Link from "next/link";

export default function Header() {
    return (
        <header className="border-b-1 border-gray-300 backdrop-blur sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <a className="flex">
                        <span className="bg-gradient-to-r from-blue-600 via-primary to-pink-600 bg-clip-text text-transparent font-bold text-3xl leading-snug">QRForge</span>
                    </a>
                    <nav className="flex gap-2">
                        <Link className="transition-all duration-300 rounded-full hover:border-border/50 hover:bg-border py-2 px-6" href="">Pricing</Link>
                        <Link className="transition-all duration-300 rounded-full hover:border-border/50 hover:bg-border py-2 px-6" href="">Login </Link>
                        <Link className="rounded-full bg-primary py-2 px-6 text-white cursor-pointer scroll-smooth transition-all group duration-300 hover:shadow-[var(--shadow-elegant)] 
                    hover:bg-primary/90 bg-gradient-to-r from-primary to-primary-glow" href="/signup">Sign Up</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}