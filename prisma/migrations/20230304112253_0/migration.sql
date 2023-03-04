-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('Daily', 'Weekly', 'Monthly', 'Yearly');

-- CreateTable
CREATE TABLE "ProfilingSchedule" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "processName" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "frequency" "Frequency" NOT NULL,
    "selectedData" JSONB NOT NULL,
    "connectionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfilingSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfilingScheduleToBeRun" (
    "id" SERIAL NOT NULL,
    "profilingScheduleId" INTEGER NOT NULL,
    "result" JSONB,
    "isFaild" BOOLEAN NOT NULL DEFAULT false,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "runAt" TIMESTAMP(3) NOT NULL,
    "startAt" TIMESTAMP(3),
    "endsAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfilingScheduleToBeRun_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProfilingSchedule" ADD CONSTRAINT "ProfilingSchedule_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "Connection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfilingScheduleToBeRun" ADD CONSTRAINT "ProfilingScheduleToBeRun_profilingScheduleId_fkey" FOREIGN KEY ("profilingScheduleId") REFERENCES "ProfilingSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
