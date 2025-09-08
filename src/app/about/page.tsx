

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/icons';
import { Target, Lightbulb, Heart } from 'lucide-react';
import Image from 'next/image';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1 && names[1]) {
        return names[0][0] + names[names.length - 1][0];
    }
    return name[0] ? name[0].toUpperCase() : '';
}

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
                <Card className="text-center rounded-2xl border-0 shadow-none">
                    <CardContent className="p-6">
                        <Avatar className="w-24 h-24 mx-auto mb-4 text-2xl">
                          <AvatarFallback>{getInitials("Amit kumar Metha")}</AvatarFallback>
                        </Avatar>
                        <h3 className="mt-6 text-lg font-semibold text-foreground">Amit kumar Metha</h3>
                        <p className="text-primary">CEO & Founder</p>
                        <p className="text-sm text-muted-foreground mt-4">With a deep-seated belief that education is the most powerful tool for social change, Amit founded YouthSkillset to address the critical gap between traditional schooling and real-world readiness. He witnessed firsthand how many bright young students struggled after graduation due to a lack of practical skills in personal finance, digital literacy, and career navigation. Drawing on his extensive background in mentoring youth and his passion for technology, Amit conceptualized a platform that was both accessible and engaging. He is dedicated to creating a learning environment where every young person in India, regardless of their background, can gain the confidence and competence needed to build a successful and fulfilling future in the modern economy.</p>
                    </CardContent>
                </Card>
                <Card className="text-center rounded-2xl border-0 shadow-none">
                    <CardContent className="p-6">
                        <Avatar className="w-24 h-24 mx-auto mb-4 text-2xl">
                          <AvatarFallback>{getInitials("Yashneet")}</AvatarFallback>
                        </Avatar>
                        <h3 className="mt-6 text-lg font-semibold text-foreground">Yashneet</h3>
                        <p className="text-primary">Head of Product and Co-founder</p>
                        <p className="text-sm text-muted-foreground mt-4">As the Head of Product, Yash is the chief architect of the YouthSkillset experience. He translates the company's vision into a tangible, user-friendly platform that students love to use. Yash is obsessed with understanding the needs and challenges of young learners. He spends his time talking to users, analyzing data, and collaborating with the design and content teams to build features that are not just innovative but truly impactful. From designing the AI Mentor interactions to structuring the flow of our learning modules, Yash ensures that every click and every lesson is part of a seamless journey towards empowerment. He is committed to building a product that is not just a tool, but a trusted companion in every student's path to success.</p>
                    </CardContent>
                </Card>
                <Card className="text-center rounded-2xl border-0 shadow-none">
                    <CardContent className="p-6">
                         <Avatar className="w-24 h-24 mx-auto mb-4 text-2xl">
                          <AvatarFallback>{getInitials("Adarsh")}</AvatarFallback>
                        </Avatar>
                        <h3 className="mt-6 text-lg font-semibold text-foreground">Adarsh</h3>
                        <p className="text-primary">Head of Content and Co-founder</p>
                        <p className="text-sm text-muted-foreground mt-4">Adarsh is the heart of our educational mission, serving as the Head of Content. He possesses a unique talent for deconstructing complex, often intimidating subjects like finance, AI ethics, and cybersecurity, and rebuilding them into lessons that are structured, engaging, and perfectly tailored for the teenage mind. He believes that learning should be a process of discovery, not just memorization. Adarsh works tirelessly with subject matter experts to ensure our curriculum is not only accurate and up-to-date but also practical and relevant to the challenges young Indians face today. His work ensures that every module on YouthSkillset provides actionable knowledge that students can apply to their lives immediately.</p>
                    </CardContent>
                </Card>
                <Card className="text-center rounded-2xl border-0 shadow-none">
                    <CardContent className="p-6">
                         <Avatar className="w-24 h-24 mx-auto mb-4 text-2xl">
                          <AvatarFallback>{getInitials("Nancy")}</AvatarFallback>
                        </Avatar>
                        <h3 className="mt-6 text-lg font-semibold text-foreground">Nancy</h3>
                        <p className="text-primary">Head of Design and Co-founder</p>
                        <p className="text-sm text-muted-foreground mt-4">Nancy is the creative force who shapes the look and feel of YouthSkillset as our Head of Design. She believes that a great user experience is fundamental to effective learning. Her design philosophy is centered on creating a platform that is intuitive, beautiful, and accessible to all. Nancy leads the design process from initial concept sketches to final pixel-perfect interfaces, ensuring that every button, color, and animation serves a purpose and enhances the learning journey. She is passionate about user-centric design, constantly seeking feedback to make the platform more engaging and less intimidating. For Nancy, great design isn't just about aesthetics; it's about removing barriers and making the path to knowledge a joyful and empowering experience for every student.</p>
                    </CardContent>
                </Card>
                <Card className="text-center rounded-2xl border-0 shadow-none">
                    <CardContent className="p-6">
                         <Avatar className="w-24 h-24 mx-auto mb-4 text-2xl">
                          <AvatarFallback>{getInitials("Nidhi")}</AvatarFallback>
                        </Avatar>
                        <h3 className="mt-6 text-lg font-semibold text-foreground">Nidhi</h3>
                        <p className="text-primary">Head of Research and Co-founder</p>
                        <p className="text-sm text-muted-foreground mt-4">As the Head of Research, Nidhi is our connection to the ever-evolving landscape of education and career development. Her role is to ensure that our curriculum is not just current, but forward-looking. Nidhi dives deep into educational trends, analyzes the future job market, and studies the learning psychology of young adults. She identifies the specific skills that will be most in-demand tomorrow, guaranteeing that our modules are practical and provide a real competitive advantage. By translating complex research into actionable insights for our content team, Nidhi ensures that YouthSkillset remains a relevant and powerful tool, equipping students with the knowledge they need not just for their first job, but for a lifetime of success in a changing world.</p>
                    </CardContent>
                </Card>
                <Card className="text-center rounded-2xl border-0 shadow-none">
                    <CardContent className="p-6">
                         <Avatar className="w-24 h-24 mx-auto mb-4 text-2xl">
                          <AvatarFallback>{getInitials("Love Thakur")}</AvatarFallback>
                        </Avatar>
                        <h3 className="mt-6 text-lg font-semibold text-foreground">Love Thakur</h3>
                        <p className="text-primary">Head of Human Resources and Co-Founder</p>
                        <p className="text-sm text-muted-foreground mt-4">Love is the champion of our most valuable asset: our people. As Head of Human Resources, he cultivates a vibrant and supportive company culture where creativity and collaboration can flourish. He believes that a happy team is an innovative team, and he works to ensure that every member of the YouthSkillset family feels valued, heard, and empowered to do their best work. Love manages everything from talent acquisition to professional development, ensuring that we attract and retain the passionate individuals who make our mission possible. His focus on building a strong, ethical, and empathetic organizational foundation is key to our long-term success and our ability to serve our users effectively.</p>
                    </CardContent>
                </Card>
            </div>
        </div>

      </div>
    </div>
  );
}
