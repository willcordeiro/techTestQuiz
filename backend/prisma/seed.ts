import { PrismaClient, QuestionType } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seeding...")

  // Create sample quizzes
  const quiz1 = await prisma.quiz.create({
    data: {
      title: "JavaScript Fundamentals",
      description: "Test your knowledge of JavaScript basics",
      questions: {
        create: [
          {
            text: "Is JavaScript a compiled language?",
            type: QuestionType.BOOLEAN,
            options: [],
          },
          {
            text: "What is your favorite JavaScript framework?",
            type: QuestionType.INPUT,
            options: [],
          },
          {
            text: "Which of these are JavaScript frameworks? (Select all that apply)",
            type: QuestionType.CHECKBOX,
            options: ["React", "Vue", "Angular", "Django", "Flask"],
          },
          {
            text: 'What does "DOM" stand for?',
            type: QuestionType.INPUT,
            options: [],
          },
        ],
      },
    },
  })

  const quiz2 = await prisma.quiz.create({
    data: {
      title: "Web Development Basics",
      description: "Essential concepts for web developers",
      questions: {
        create: [
          {
            text: "Is HTML a programming language?",
            type: QuestionType.BOOLEAN,
            options: [],
          },
          {
            text: "Which of these are CSS preprocessors?",
            type: QuestionType.CHECKBOX,
            options: ["Sass", "Less", "Stylus", "PostCSS", "Bootstrap"],
          },
          {
            text: "What does HTTP stand for?",
            type: QuestionType.INPUT,
            options: [],
          },
        ],
      },
    },
  })

  const quiz3 = await prisma.quiz.create({
    data: {
      title: "Node.js Knowledge Check",
      description: "Test your understanding of Node.js and backend development",
      questions: {
        create: [
          {
            text: "Is Node.js single-threaded?",
            type: QuestionType.BOOLEAN,
            options: [],
          },
          {
            text: "Which of these are Node.js frameworks?",
            type: QuestionType.CHECKBOX,
            options: ["Express", "Koa", "Fastify", "NestJS", "React"],
          },
          {
            text: "What is the default package manager for Node.js?",
            type: QuestionType.INPUT,
            options: [],
          },
          {
            text: "Can Node.js handle file system operations?",
            type: QuestionType.BOOLEAN,
            options: [],
          },
        ],
      },
    },
  })

  console.log("✅ Database seeded successfully!")
  console.log(`Created quizzes:`)
  console.log(`- ${quiz1.title} (ID: ${quiz1.id})`)
  console.log(`- ${quiz2.title} (ID: ${quiz2.id})`)
  console.log(`- ${quiz3.title} (ID: ${quiz3.id})`)
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
