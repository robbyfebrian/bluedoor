import { Head, Link } from '@inertiajs/react';
import { useLenis } from '@/hooks/useLenis';

interface Employee {
    id: number;
    name: string;
    position: string;
    bio: string | null;
    photo: string | null;
    photo_url: string | null;
    email: string | null;
}

interface TeamProps {
    team: Employee[];
}

export default function Team({ team }: TeamProps) {
    useLenis(); // Enable smooth scrolling

    return (
        <>
            <Head title="Our Team - Blue Door Coffee" />

            <div className="min-h-screen bg-white">
                {/* Navigation */}
                <nav className="bg-amber-900 text-white shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            <Link href="/" className="text-2xl font-bold">Blue Door Coffee</Link>
                            <div className="flex space-x-8">
                                <Link href="/" className="hover:text-amber-200 transition">Home</Link>
                                <Link href="/menu" className="hover:text-amber-200 transition">Menu</Link>
                                <Link href="/team" className="text-amber-200 font-semibold">Team</Link>
                                <Link href="/careers" className="hover:text-amber-200 transition">Careers</Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Header */}
                <div className="bg-gradient-to-r from-amber-50 to-amber-100 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl font-bold text-amber-900 mb-2">Meet Our Team</h1>
                        <p className="text-lg text-amber-800">The passionate people behind Blue Door Coffee</p>
                    </div>
                </div>

                {/* Team Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {team.map((member) => (
                            <div key={member.id} className="bg-white border border-amber-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
                                <div className="aspect-square bg-amber-100 flex items-center justify-center">
                                    {member.photo_url ? (
                                        <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-amber-200">
                                            <span className="text-6xl text-amber-900">{member.name[0]}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold text-amber-900 mb-1">{member.name}</h3>
                                    <p className="text-amber-700 font-medium mb-3">{member.position}</p>
                                    {member.bio && (
                                        <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-amber-950 text-amber-100 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p>&copy; 2026 Blue Door Coffee. All rights reserved.</p>
                        <p className="mt-2 text-sm">123 Coffee Street, Brewtown | (555) 123-4567</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
