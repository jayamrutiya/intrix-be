"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCaseService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../config/types");
const NotFound_1 = require("../errors/NotFound");
let UseCaseService = class UseCaseService {
    constructor(loggerService, useCaseRepository) {
        this._useCaseRepository = useCaseRepository;
        this._loggerService = loggerService;
        this._loggerService.getLogger().info(`Creating: ${this.constructor.name}`);
    }
    async createUseCase(input) {
        return this._useCaseRepository.createUseCase(input);
    }
    async updateUseCase(input) {
        const getUseCase = await this._useCaseRepository.getUseCase(input.id);
        if (!getUseCase) {
            throw new NotFound_1.NotFound("Use Case not found");
        }
        return this._useCaseRepository.updateUseCase(input);
    }
    async getUseCase(id) {
        return this._useCaseRepository.getUseCase(id);
    }
    async getAllUseCase() {
        return this._useCaseRepository.getAllUseCase();
    }
    async deleteUseCase() {
        return this._useCaseRepository.deleteUseCase();
    }
};
UseCaseService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.LoggerService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.UseCaseRepository)),
    __metadata("design:paramtypes", [Object, Object])
], UseCaseService);
exports.UseCaseService = UseCaseService;
//# sourceMappingURL=UseCaseService.js.map