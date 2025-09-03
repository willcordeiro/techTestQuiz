import { Injectable, type OnModuleInit, type OnModuleDestroy, Logger } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name)

  constructor() {
    super({
      log: ["query", "info", "warn", "error"],
    })
  }

  async onModuleInit() {
    try {
      await this.$connect()
      this.logger.log("Successfully connected to database")
    } catch (error) {
      this.logger.error("Failed to connect to database", error)
      throw error
    }
  }

  async onModuleDestroy() {
    await this.$disconnect()
    this.logger.log("Disconnected from database")
  }
}
