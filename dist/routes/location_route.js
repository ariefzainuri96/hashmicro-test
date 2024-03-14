"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const location_controller_1 = require("../controllers/location_controller");
const router = express_1.default.Router();
// add location
router.post('/', location_controller_1.addLocation);
// get all location
router.get('/', location_controller_1.getLocations);
// delete location by id
router.delete('/:id', location_controller_1.deleteLocationById);
exports.default = router;
