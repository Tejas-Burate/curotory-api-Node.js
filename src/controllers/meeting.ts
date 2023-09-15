import express, { Request, Response } from "express";
import Meeting from "../models/meeting";
import Language from "../models/language";

const getAllJitsiMeeting = async (req: Request, res: Response) => {
  try {
    const meetings = await Meeting.findAll();

    if (meetings.length === 0) {
      res.status(404).json({
        status: 404,
        error: 404,
        message: "Meeting lists are not found",
      });
      return;
    }

    const result = await Promise.all(
      meetings.map(async (meeting: any) => {
        const language = await Language.findOne({
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
      })
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

export { getAllJitsiMeeting };
