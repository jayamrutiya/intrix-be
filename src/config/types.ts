export const TYPES = {
  // service
  DatabaseService: Symbol("IDatabaseService"),
  LoggerService: Symbol("ILoggerService"),
  TestService: Symbol("ITestService"),
  UseCaseService: Symbol("IUseCaseService"),
  ConnectionService: Symbol("IConnectionService"),
  ProfilingRuleService: Symbol("IProfilingRuleService"),

  // repositories
  TestRepository: Symbol("ITestRepository"),
  UseCaseRepository: Symbol("IUseCaseRepository"),
  ConnectionRepository: Symbol("IConnectionRepository"),
  ProfilingRuleRepository: Symbol("IProfilingRepository"),
};
