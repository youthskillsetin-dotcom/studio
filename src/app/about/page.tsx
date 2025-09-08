

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/icons';
import { Target, Lightbulb, Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1 && names[1]) {
        return names[0][0] + names[names.length - 1][0];
    }
    return name[0] ? name[0].toUpperCase() : '';
}

const teamMembers = [
    { name: "Amit kumar Metha", role: "CEO & Founder", description: "Driven by a passion for education and technology, Amit founded YouthSkillset to bridge the gap between academic learning and real-world readiness. He is dedicated to empowering India's youth with the practical skills needed to build a successful and fulfilling future.", avatar: "https://picsum.photos/200/200?random=1", hint: "man portrait" },
    { name: "Yashneet", role: "Head of Product and Co-founder", description: "As the Head of Product, Yashneet is the architect of the YouthSkillset experience. He translates our vision into a tangible, user-friendly platform, ensuring every feature is impactful and part of a seamless journey towards empowerment for young learners.", avatar: "https://picsum.photos/200/200?random=2", hint: "man portrait" },
    { name: "Adarsh", role: "Head of Content and Co-founder", description: "Adarsh leads our educational mission by breaking down complex subjects into engaging, practical lessons. He ensures our curriculum is accurate, up-to-date, and provides actionable knowledge that students can apply to their lives immediately.", avatar: "https://picsum.photos/200/200?random=3", hint: "man portrait" },
    { name: "Nancy", role: "Head of Design and Co-founder", description: "Nancy is the creative force shaping the look and feel of YouthSkillset. She focuses on user-centric design to make learning intuitive, beautiful, and accessible, ensuring the path to knowledge is a joyful and empowering experience for every student.", avatar: "https://picsum.photos/200/200?random=4", hint: "woman portrait" },
    { name: "Nidhi", role: "Head of Research and Co-founder", description: "Nidhi ensures our curriculum is not just current, but forward-looking. By researching educational trends and the future job market, she guarantees our modules provide a real competitive advantage, equipping students for a lifetime of success.", avatar: "https://picsum.photos/200/200?random=5", hint: "woman portrait" },
    { name: "Love Thakur", role: "Head of Human Resources and Co-Founder", description: "Love is the champion of our most valuable asset: our people. As Head of Human Resources, he cultivates a vibrant and supportive company culture, ensuring our passionate team feels valued, heard, and empowered to do their best work.", avatar: "https://picsum.photos/200/200?random=6", hint: "man portrait" },
]

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="text-center mb-16">
          <Logo className="h-20 w-20 mx-auto text-primary" />
          <h1 className="mt-4 text-4xl font-extrabold font-headline tracking-tight sm:text-5xl lg:text-6xl">
            Our Mission: Empowering India's Next Generation
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-muted-foreground">
            We believe that the most important skills for the future aren't always taught in traditional classrooms. YouthSkillset was born from a simple idea: to give every young person a fair chance to succeed by equipping them with practical, real-world knowledge in finance, technology, and career development. We're here to bridge the gap between academic learning and real-world opportunity.
          </p>
        </div>

        <div className="mb-24">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold font-headline mb-4">Our Story</h2>
                <p className="text-muted-foreground text-lg mb-4">
                    YouthSkillSet was born from a simple observation: schools teach academics, but often miss the practical life and career skills essential for the real world. We saw bright teens graduate unprepared for personal finance, career building, or safe digital navigation.
                </p>
                <p className="text-muted-foreground text-lg">
                    So, we created the resource we wish we had—an engaging, AI-powered platform that makes learning these vital skills accessible, fun, and directly applicable to the challenges and opportunities of today.
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center mb-24">
          <Card className="rounded-xl p-6 border-0 shadow-none bg-transparent">
            <CardHeader className="items-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Target className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="font-headline text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To democratize access to essential life and career education for every young person, regardless of their background or location.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-xl p-6 border-0 shadow-none bg-transparent">
            <CardHeader className="items-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Lightbulb className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="font-headline text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We envision a world where every teen graduates with the confidence and competence to build a successful and fulfilling financial future.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-xl p-6 border-0 shadow-none bg-transparent">
            <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                    <Heart className="w-10 h-10 text-primary" />
                </div>
              <CardTitle className="font-headline text-2xl">Our Values</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We believe in practical learning, continuous innovation, and the power of mentorship to create a positive impact.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-headline">Meet the Team</h2>
                <p className="mt-2 text-lg text-muted-foreground">The passionate individuals behind YouthSkillset.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                 {teamMembers.map((member) => (
                    <Card key={member.name} className="text-center rounded-2xl border-0 shadow-none">
                        <CardContent className="p-6">
                            <Avatar className="w-24 h-24 mx-auto mb-4 text-2xl">
                                <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.hint} />
                                <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                            </Avatar>
                            <h3 className="mt-6 text-lg font-semibold text-foreground">{member.name}</h3>
                            <p className="text-primary">{member.role}</p>
                            <p className="text-sm text-muted-foreground mt-4">{member.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
}
