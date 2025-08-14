import Card from "../ui/Card";
import { FEATURES, USE_CASES } from "@/lib/constants/qr";

export default function Features() {

    function renderIcon(type: string) {
        switch (type) {
            case "dots":
                return (
                    <>
                        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" > </circle>
                        < circle cx="17.5" cy="10.5" r=".5" fill="currentColor" > </circle>
                        < circle cx="8.5" cy="7.5" r=".5" fill="currentColor" > </circle>
                        < circle cx="6.5" cy="12.5" r=".5" fill="currentColor" > </circle>
                        < path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" > </path>
                    </>
                );
            case "chart":
                return (
                    <>
                        <path d="M3 3v18h18" > </path>
                        < path d="M18 17V9" > </path>
                        < path d="M13 17V5" > </path>
                        < path d="M8 17v-3" > </path>
                    </>
                );
            case "download":
                return (
                    <>
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" > </path>
                        < polyline points="7 10 12 15 17 10" > </polyline>
                        < line x1="12" x2="12" y1="15" y2="3" > </line>
                    </>
                )
            default:
                return null;
        }
    }

    return (
        <section className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 py-8">
            <div className="container px-4 md:px-6 max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-blue-600 via-primary to-pink-600 bg-clip-text text-transparent">Powerful Features </span>
                    for Every Need
                </h2>
                <p className="text-muted-foreground text-xl max-w-3xl mx-auto mb-10">From basic QR codes to advanced analytics, we've got everything you need to create, customize, and track your QR codes.</p>
                <h3 className="text-xl md:text-2xl font-bold mb-4">Perfect for Every Use Case</h3>
                <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-10">From small businesses to enterprise solutions, QRCraft adapts to your needs.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {USE_CASES.map((useCase) => {
                        return (
                            <Card key={useCase.id} backgroundColor={useCase.backgroundColor} borderColor={useCase.borderColor} className="border-1 p-6 hover:shadow-lg transition-shadow">
                                <h4 className={`font-semibold leading-none ${useCase.titleColor}`}>{useCase.title}</h4>
                                <p className="text-muted-foreground text-sm">{useCase.description}</p>
                            </Card>
                        );
                    })}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-16">
                    {FEATURES.map((feature) => {
                        return (
                            <Card key={feature.id} borderColor={feature.borderColor} className="border-l-4 p-6 hover:shadow-lg transition-shadow">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-palette h-8 w-8 mb-2 ${feature.iconColor}`}>
                                    {renderIcon(feature.iconType)}
                                </svg>
                                <h4 className="font-semibold leading-none">{feature.title}</h4>
                                <p className="text-muted-foreground text-sm p-0">{feature.description}</p>
                            </Card>
                        );
                    })

                    }
                </div>
            </div>
        </section>
    );
}