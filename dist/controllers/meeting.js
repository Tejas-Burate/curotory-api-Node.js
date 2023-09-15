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
exports.getAllJitsiMeeting = void 0;
const meeting_1 = __importDefault(require("../models/meeting"));
const language_1 = __importDefault(require("../models/language"));
const getAllJitsiMeeting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meetings = yield meeting_1.default.findAll();
        if (meetings.length === 0) {
            res.status(404).json({
                status: 404,
                error: 404,
                message: "Meeting lists are not found",
            });
            return;
        }
        const result = yield Promise.all(meetings.map((meeting) => __awaiter(void 0, void 0, void 0, function* () {
            const language = yield language_1.default.findOne({
                where: { languageId: meeting.languageId },
            });
            if (!language) {
                res.status(404).json({
                    status: 404,
                    error: 404,
                    message: "Lanuage for meeting lists are not found",
                });
                return;
            }
            return {
                meetingId: meeting.dataValues.meetingId.toString(),
                language: {
                    languageId: language.dataValues.languageId.toString(),
                    languageName: language.dataValues.languageName,
                },
                meetingTitle: meeting.dataValues.meetingTitle,
                users: JSON.parse(meeting.dataValues.users),
                meetingStartDate: meeting.dataValues.meetingStartDate.toString(),
                meetingEndDate: meeting.dataValues.meetingEndDate.toString(),
                dateModified: meeting.dataValues.dateModified,
                dateCreated: meeting.dataValues.dateCreated,
            };
        })));
        res.status(200).json(result);
    }
    catch (error) {
        console.error("error", error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getAllJitsiMeeting = getAllJitsiMeeting;
