import { Head } from '@inertiajs/react';
import { useLenis } from '@/hooks/useLenis';
import AppLayout from '@/layouts/AppLayout';

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
        <AppLayout>
            <Head title="Our Team  " />

            <div className="min-h-screen bg-transparent">
                {/* Navigation */}


                {/* Header */}
                <div className="bg-ocean-gradient py-12 text-crema">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="mb-2 font-serif text-4xl font-bold text-crema">Meet Our Team</h1>
                        <p className="text-lg text-crema/90">The passionate people behind Blue Door Coffee</p>
                    </div>
                </div>

                {/* Team Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {team.map((member) => (
                            <div key={member.id} className="bg-transparent border border-mocha/20 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
                                <div className="aspect-square bg-ocean-grain/70 flex items-center justify-center">
                                    {member.photo_url ? (
                                        <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-ocean-grain">
                                            <span className="text-6xl text-espresso">{member.name[0]}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold text-espresso mb-1">{member.name}</h3>
                                    <p className="text-crema font-medium mb-3">{member.position}</p>
                                    {member.bio && (
                                        <p className="text-crema leading-relaxed">{member.bio}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}

            </div>
        </AppLayout>
    );
}
