import { Link } from 'react-scroll';

export default function Hero() {
    return (
        <section>
            <div className="container px-4 md:px-6 max-w-6xl mx-auto">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/40 px-4 py-2 text-primary mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 lucide lucide-sparkles-icon lucide-sparkle">
                        <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                        <path d="M20 2v4" /><path d="M22 4h-4" /><circle cx="4" cy="20" r="2" /></svg>
                    <span>Free Qr Code Generator</span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">Create Beautiful<br />
                    <span className="bg-gradient-to-r from-blue-600 via-primary to-pink-600 bg-clip-text text-transparent">QR Codes</span>
                    <br />in Seconds
                </h1>
                <p className="text-muted-foreground text-xl max-w-3xl mx-auto mb-10">Generate beautiful, customizable QR codes for your business, events, or personal use. Track scans, analyze performance, no signup required to get started.</p>
                <div className="flex justify-center items-center gap-4">
                    <Link className="rounded-xl bg-primary py-2 px-6 text-white cursor-pointer scroll-smooth transition-all group duration-300 hover:shadow-[var(--shadow-elegant)] 
                    hover:bg-primary/90 bg-gradient-to-r from-primary to-primary-glow"
                        to="qr-generation-section"
                        smooth={true}
                        duration={500}
                        offset={-40}>Try Free Generator
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="ml-4 inline h-4 w-4 lucide lucide-arrow-right-icon lucide-arrow-right group-hover:translate-x-1">
                            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                    </Link>
                    <a className="rounded-xl border border-primary/40 py-2 px-4 cursor-pointer bg-white transition-all duration-300 hover:border-primary hover:bg-primary/20">Create Account</a>
                </div>
            </div>
        </section>
    );
}