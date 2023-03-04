import { ConnectionType, ProfilingType } from "@prisma/client";
import { inject, injectable } from "inversify";
import { TYPES } from "../config/types";
import { NotFound } from "../errors/NotFound";
import { IConnectionRepository } from "../interfaces/IConnectionRepository";
import { ILoggerService } from "../interfaces/ILoggerService";
import { IProfilingRuleRepository } from "../interfaces/IProfilingRuleRepository";
import { IProfilingRuleService } from "../interfaces/IProfilingRuleService";
import {
  CreateProfilingScheduleInput,
  ProfilingSchedule,
  ProfilingScheduleWithPagination,
  RunProfilingRuleInput,
} from "../types/ProfilingRule";
import * as mysql from "mysql";
import * as util from "util";

@injectable()
export class ProfilingRuleService implements IProfilingRuleService {
  private _loggerService: ILoggerService;
  private _connectionRepository: IConnectionRepository;
  private _profilingRuleRepository: IProfilingRuleRepository;

  constructor(
    @inject(TYPES.LoggerService) loggerService: ILoggerService,
    @inject(TYPES.ConnectionRepository)
    connectionRepository: IConnectionRepository,
    @inject(TYPES.ProfilingRuleRepository)
    profilingRuleRepository: IProfilingRuleRepository
  ) {
    this._connectionRepository = connectionRepository;
    this._loggerService = loggerService;
    this._profilingRuleRepository = profilingRuleRepository;
    this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
  }

  async runProfilingRules(selectedData: RunProfilingRuleInput): Promise<any> {
    const getConnection = await this._connectionRepository.getConnection(
      selectedData.connectionId
    );

    if (!getConnection) {
      throw new NotFound("Connection not found");
    }

    const response: any = [];
    const allRulesToBeRun: any = [];
    if (getConnection.type === ConnectionType.MySql) {
      //   const data = new Promise((resolve, reject) => {
      const connection = mysql.createConnection({
        host: getConnection.host,
        user: getConnection.user,
        password: getConnection.password,
        database: getConnection.database,
        port: getConnection.port,
      });
      const conn = util.promisify(connection.query).bind(connection);
      //   });

      const getProfilingRule =
        await this._profilingRuleRepository.getProfilingRule(
          ConnectionType.MySql,
          ProfilingType.COLUMN
        );
      for (let i = 0; i < selectedData.selectedData.length; i++) {
        const table = selectedData.selectedData[i];
        response.push({ tableName: table.tableName, columnResult: [] });
        for (let j = 0; j < table.column.length; j++) {
          const tableIndex = response.findIndex(
            (x) => x.tableName === table.tableName
          );
          const column = table.column[j];
          response[tableIndex].columnResult.push({
            columnName: column.name,
            profilingRuleResult: [],
          });
          const mapObject = {
            COLUMN_NAME: column.name,
            TABLE_NAME: table.tableName,
          };
          for (let k = 0; k < getProfilingRule.length; k++) {
            const profilingRule = getProfilingRule[k];
            const createquery = this.replaceAll(profilingRule.rule, mapObject);
            // const rows = await conn(createquery);

            const columnIndex = response[tableIndex].columnResult.findIndex(
              (y) => y.columnName === column.name
            );
            response[tableIndex].columnResult[
              columnIndex
            ].profilingRuleResult.push({
              ...profilingRule,
              result: [],
            });
            const profilingRuleResultIndex =
              response[tableIndex].columnResult[columnIndex].profilingRuleResult
                .length - 1;

            allRulesToBeRun.push(
              this.generatePromise(
                tableIndex,
                columnIndex,
                profilingRuleResultIndex,
                createquery,
                conn
              )
            );
          }
        }
      }
    }
    const data: any = Promise.all(allRulesToBeRun);
    return data
      .then((res) => {
        // console.log("res", JSON.stringify(res, null, 1));
        for (let i = 0; i < res.length; i++) {
          const e = res[i];
          response[e.tableIndex].columnResult[
            e.columnIndex
          ].profilingRuleResult[e.profilingRuleResultIndex].result.push(
            e.result[0]
          );
        }
        return response;
      })
      .catch((err) => console.log(err));
  }

  generatePromise(
    tableIndex,
    columnIndex,
    profilingRuleResultIndex,
    createquery,
    conn
  ) {
    return new Promise((resolve, reject) => {
      conn(createquery)
        .then((r) => {
          const data = {
            tableIndex,
            columnIndex,
            profilingRuleResultIndex,
            result: r,
          };
          resolve(data);
        })
        .catch((e) => {
          console.log("e", e);
          reject(e);
        });
    });
  }

  replaceAll(str, mapObj) {
    var re = new RegExp(Object.keys(mapObj).join("|"), "gi");
    return str.replace(re, function (matched) {
      return mapObj[matched];
    });
  }

  async createProfilingRuleSchedule(
    input: CreateProfilingScheduleInput
  ): Promise<ProfilingSchedule> {
    return this._profilingRuleRepository.createProfilingRuleSchedule(input);
  }

  async getProfilingSchedules(
    page: number,
    size: number
  ): Promise<ProfilingScheduleWithPagination> {
    return this._profilingRuleRepository.getProfilingSchedules(page, size);
  }

  async getProfilingSchedule(id: number): Promise<ProfilingSchedule | null> {
    return this._profilingRuleRepository.getProfilingSchedule(id);
  }
}
