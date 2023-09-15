import { Request, Response } from "express";
import sequelize from "../config/db";
import Language from "../models/language";
import multer from "multer";
import moment from "moment-timezone";
import { currentDateTime } from "../config/tz";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/language");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const uploadImage = (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[]; // Explicitly type files as an array of Multer files
    console.log("files", files);
    const image: string[] = [];

    if (!files || files.length === 0) {
      res
        .status(400)
        .json({ status: 400, error: "400", message: "No file uploaded" });
    } else {
      files.forEach((file: Express.Multer.File) => {
        const imageUrl = `${req.protocol}://${req.get(
          "host"
        )}/images/language/${file.filename}`;
        console.log("imageUrl", imageUrl);
        image.push(imageUrl);
      });
      res.status(200).json({
        status: 200,
        error: "success",
        message: "imageUrl created",
        image,
      });
    }
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const createLanguage = async (req: Request, res: Response) => {
  const requestData = req.body;
  console.log("requestData", requestData);

  const date = currentDateTime();
  console.log("date == ", date);
  try {
    const languageData = await Language.build({
      languageName: requestData.name,
      languageObj: {
        languageMeetingImage: requestData.languageMeetingImage,
        languageFlagImage: requestData.languageFlagImage,
        languageSubscriptionImage: requestData.languageSubscriptionImage,
        languageLevelImage: requestData.languageLevelImage,
        languageHomeImage: requestData.languageHomeImage,
      },
      languageImage: requestData.languageHomeImage,
      dateCreated: 1693565702822,
      dateModified: date,
    });

    console.log("Before IF CON =  ", currentDateTime());

    if (!languageData) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Unable to create language",
      });
      return;
    }
    await languageData.save();
    res.status(200).json(languageData);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const getAllLanguageList = async (req: Request, res: Response) => {
  try {
    const languageData = await Language.findAll();

    if (languageData.length === 0) {
      res
        .status(404)
        .json({ status: 404, error: "404", message: "User Data Not Found" });
    }

    const languageList: any[] = [];
    languageData.forEach((language: any) => {
      languageList.push({
        languageId: language.languageId,
        languageName: language.languageName,
        languageObj: JSON.parse(language.languageObj), // Convert string to JSON
        dateCreated: language.dateCreated,
        dateModified: language.dateModified,
      });
    });
    res.status(200).json(languageList);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const getDropdownLanguageList = async (req: Request, res: Response) => {
  try {
    const language = await Language.findAll({
      attributes: ["languageId", "languageName"],
    });

    if (language.length === 0) {
      res
        .status(404)
        .json({ status: 404, error: "404", message: "Roles Data Not Found" });
    }

    res.status(200).json(language);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

// const getDataTableForLanguageList = async (req: Request, res: Reaponse) => {
//   try {
//   } catch (error) {
//     console.log("error", error);
//     res.status(500).json({ status: 500, error: "500", message: "" });
//   }
// };

export {
  getAllLanguageList,
  getDropdownLanguageList,
  upload,
  uploadImage,
  createLanguage,
};
