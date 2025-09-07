
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/icons';
import { Target, Lightbulb, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="text-center mb-16">
          <Logo className="h-20 w-20 mx-auto text-primary" />
          <h1 className="mt-4 text-4xl font-extrabold font-headline tracking-tight sm:text-5xl lg:text-6xl">
            About YouthSkillSet
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-muted-foreground">
            Empowering the next generation with the skills, confidence, and knowledge to thrive in the real world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div>
                <h2 className="text-3xl font-bold font-headline mb-4">Our Story</h2>
                <p className="text-muted-foreground text-lg mb-4">
                    YouthSkillSet was born from a simple observation: while schools are great at teaching academics, there's a huge gap when it comes to the practical life and career skills young people actually need. We saw bright, talented teens graduating without a real understanding of personal finance, how to build a career, or how to navigate the digital world safely.
                </p>
                <p className="text-muted-foreground text-lg">
                    We decided to build the resource we wish we'd had—an engaging, AI-powered platform that makes learning these essential skills accessible, fun, and directly applicable to the challenges and opportunities of today's world.
                </p>
            </div>
            <div className="rounded-lg bg-muted/40 p-8">
                <img src="https://picsum.photos/600/400" alt="Team working" className="rounded-lg shadow-lg" data-ai-hint="team collaboration" />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
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

      </div>
    </div>
  );
}
