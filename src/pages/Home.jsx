import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import Hero from "../components/Hero";
import QrGenerator from "../components/QRGenerator";

export default function Home() {
    return (
        <div>
            <Hero />
            <section className="py-20">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Creating Your QR Code</h2>
                <p className="text-muted-foreground text-xl max-w-3xl mx-auto mb-10">No account needed! Try our generator now and see how easy it is to create professional QR codes.</p>
                <QrGenerator />
            </section>
        </div>
    );
}