import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Quiz Builder</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Create and manage custom quizzes with multiple question types
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Create Quiz</CardTitle>
                <CardDescription>
                  Build a new quiz with boolean, input, and checkbox questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/create">
                  <Button className="w-full">Create New Quiz</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>View Quizzes</CardTitle>
                <CardDescription>
                  Browse all created quizzes and view their details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/quizzes">
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Quizzes
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted/50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Supported Question Types
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <span className="text-primary font-bold">T/F</span>
                </div>

                <p className="text-sm text-muted-foreground">
                  True/False questions
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <span className="text-primary font-bold">ABC</span>
                </div>

                <p className="text-sm text-muted-foreground">
                  Short text answers
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <span className="text-primary font-bold">☑</span>
                </div>

                <p className="text-sm text-muted-foreground">Multiple choice</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
