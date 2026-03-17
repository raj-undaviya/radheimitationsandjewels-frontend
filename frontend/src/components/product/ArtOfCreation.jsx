export default function ArtOfCreation() {

    return (
        <section className="mt-24">

            <h2 className="text-center text-3xl mb-4">
                The Art of Creation
            </h2>

            <p className="text-center text-gray-400 mb-12">
                Every Aura piece undergoes a rigorous process
            </p>

            <div className="grid md:grid-cols-3 gap-6">

                <div className="bg-[#24130c] p-6 rounded-lg">
                    <h3 className="mb-2">Micro-Pavé Setting</h3>
                    <p className="text-gray-400 text-sm">
                        Hand-set stones for brilliance.
                    </p>
                </div>

                <div className="bg-[#24130c] p-6 rounded-lg">
                    <h3 className="mb-2">Ethical Sourcing</h3>
                    <p className="text-gray-400 text-sm">
                        Conflict-free diamonds sourced responsibly.
                    </p>
                </div>

                <div className="bg-[#24130c] p-6 rounded-lg">
                    <h3 className="mb-2">Bespoke Design</h3>
                    <p className="text-gray-400 text-sm">
                        Crafted perfectly to complement the wearer.
                    </p>
                </div>

            </div>

        </section>
    );
}