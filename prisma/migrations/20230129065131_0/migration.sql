-- CreateEnum
CREATE TYPE "YESorNO" AS ENUM ('Yes', 'No');

-- CreateEnum
CREATE TYPE "BusinessImpact" AS ENUM ('Cost', 'Revenue', 'Both');

-- CreateTable
CREATE TABLE "UseCase" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "useCaseName" TEXT,
    "businessUnit" TEXT,
    "businessOwner" TEXT,
    "vertical" TEXT,
    "description" TEXT,
    "assumptions" TEXT,
    "constraints" TEXT,
    "dependencies" TEXT,
    "crossDomainYesOrNo" "YESorNO" NOT NULL,
    "crossDomainValue" TEXT,
    "parentTheme" TEXT,
    "useCaseTheme" TEXT,
    "businessImpact" "BusinessImpact" NOT NULL,
    "businessImpactCostValue" TEXT,
    "businessImpactRevenueValue" TEXT,
    "impact" TEXT,
    "time" TEXT,
    "systemsInvolved" TEXT,
    "source" TEXT,
    "externalData" TEXT,
    "criticalDataElement" TEXT,
    "investmentCategory" TEXT,
    "competitiveThrust" TEXT,
    "dataTrust" TEXT,
    "approver" TEXT,
    "status" TEXT,
    "priority" TEXT,

    CONSTRAINT "UseCase_pkey" PRIMARY KEY ("id")
);
