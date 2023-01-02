import { BusinessImpact, YESorNO } from "@prisma/client";

export declare type CreateUseCase = {
  // id: number
  //   createdAt: Date;
  //   updatedAt: Date;
  businessUnit: string | null;
  businessOwner: string | null;
  vertical: string | null;
  description: string | null;
  assumptions: string | null;
  constraints: string | null;
  dependencies: string | null;
  crossDomainYesOrNo: YESorNO;
  crossDomainValue: string | null;
  parentTheme: string | null;
  useCaseTheme: string | null;
  businessImpact: BusinessImpact;
  businessImpactCostValue: string | null;
  businessImpactRevenueValue: string | null;
  impact: string | null;
  time: string | null;
  systemsInvolved: string | null;
  source: string | null;
  externalData: string | null;
  criticalDataElement: string | null;
  investmentCategory: string | null;
  competitiveThrust: string | null;
  dataTrust: string | null;
};

export declare type UseCase = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  businessUnit: string | null;
  businessOwner: string | null;
  vertical: string | null;
  description: string | null;
  assumptions: string | null;
  constraints: string | null;
  dependencies: string | null;
  crossDomainYesOrNo: YESorNO;
  crossDomainValue: string | null;
  parentTheme: string | null;
  useCaseTheme: string | null;
  businessImpact: BusinessImpact;
  businessImpactCostValue: string | null;
  businessImpactRevenueValue: string | null;
  impact: string | null;
  time: string | null;
  systemsInvolved: string | null;
  source: string | null;
  externalData: string | null;
  criticalDataElement: string | null;
  investmentCategory: string | null;
  competitiveThrust: string | null;
  dataTrust: string | null;
};
