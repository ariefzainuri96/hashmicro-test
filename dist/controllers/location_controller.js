"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocationById = exports.getLocations = exports.addLocation = void 0;
const location_model_1 = __importDefault(require("../models/location_model"));
const helper_1 = require("../utils/helper");
const addLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield location_model_1.default.create(req.body);
        res.status(200).json({
            status: 200,
            message: 'Successfully add location',
            data: product,
        });
    }
    catch (error) {
        (0, helper_1.sendError)(res, (0, helper_1.handleStatus)(error), (0, helper_1.handleError)(error));
    }
});
exports.addLocation = addLocation;
const getLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield location_model_1.default.find();
        res.status(200).json({
            status: 200,
            message: 'Successfully fetch locations',
            data: products,
        });
    }
    catch (error) {
        (0, helper_1.sendError)(res, (0, helper_1.handleStatus)(error), (0, helper_1.handleError)(error));
    }
});
exports.getLocations = getLocations;
const deleteLocationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield location_model_1.default.findByIdAndDelete(id);
        if (!product) {
            return (0, helper_1.sendError)(res, 404, 'Location not found');
        }
        res.status(200).json({
            status: 200,
            message: 'Successfully delete location',
            data: product,
        });
    }
    catch (error) {
        (0, helper_1.sendError)(res, (0, helper_1.handleStatus)(error), (0, helper_1.handleError)(error));
    }
});
exports.deleteLocationById = deleteLocationById;
