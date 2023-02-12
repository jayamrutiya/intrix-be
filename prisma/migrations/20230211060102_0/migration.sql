-- CreateEnum
CREATE TYPE "ProfilingType" AS ENUM ('COLUMN', 'TABLE');

-- CreateTable
CREATE TABLE "ProfilingRules" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rule" TEXT NOT NULL,
    "profilingType" "ProfilingType" NOT NULL,
    "databaseType" "ConnectionType" NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfilingRules_pkey" PRIMARY KEY ("id")
);
