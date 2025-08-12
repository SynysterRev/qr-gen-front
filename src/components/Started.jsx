export default function Started() {
    return (
        <section className="py-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto mb-10">Start for free, no credit card required. Create an account to unlock advanced features and analytics.</p>
            <div className="flex justify-center gap-4">
                <a className="rounded-xl bg-primary py-2 px-6 text-white cursor-pointer scroll-smooth transition-all group duration-300 hover:shadow-[var(--shadow-elegant)] 
                    hover:bg-primary/90 bg-gradient-to-r from-primary to-primary-glow">Start for Free</a>
                <a className="rounded-xl border border-primary/40 py-2 px-4 cursor-pointer bg-white transition-all duration-300 hover:border-primary hover:bg-primary/20">View pricing</a>
            </div>
        </section>
    );
}