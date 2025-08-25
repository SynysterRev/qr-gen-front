import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Started from "@/components/sections/Started";
import Header from "@/components/layout/Header";
import QrGenerator from "@/components/sections/QRGenerator";

export default function Home() {
    return (
        <>
            <Header></Header>
            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-16">
                <Hero />
                <section className="py-20" id="qr-generation-section">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Creating Your QR Code</h2>
                    <p className="text-muted-foreground text-xl max-w-3xl mx-auto mb-10">No account needed! Try our generator now and see how easy it is to create professional QR codes.</p>
                    <QrGenerator />
                </section>
            </div>
            <Features />
            <Started />
        </>
    );
}