import express, { Request, Response } from "express";
import Moduless from "../models/module";
import Question from "../models/question";

const getAllModuleList = async (req: Request, res: Response) => {
  try {
    const modules = await Moduless.findAll();
    console.log("modules", modules);

    if (modules.length === 0) {
      res
        .status(404)
        .json({ status: 404, error: "404", message: "Modules Not Found" });
      return;
    }

    const result = modules.map((mod: any) => ({
      moduleId: mod.dataValues.moduleId.toString(),
      languageId: mod.dataValues.languageId.toString(),
      levelId: mod.dataValues.levelId.toString(),
      lessonId: mod.dataValues.lessonId.toString(),
      moduleName: mod.dataValues.moduleName,
      numberOfQuestions: mod.dataValues.numberOfQuestions.toString(),
      difficulty: mod.dataValues.difficulty,
      mode: mod.dataValues.mode,
      questionSet: JSON.parse(mod.dataValues.questionSet),
    }));

    res.status(200).json(result);
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const getModuleByLessonId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const modules = await Moduless.findAll({
      where: { lessonId: id },
    });

    if (modules.length === 0) {
      res
        .status(404)
        .json({ status: 404, error: "404", message: "Modules Not Found" });
      return;
    }

    const question = await Question.findAll({
      where: { lessonId: id },
    });

    if (question.length === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: "Question for given lesson Id is Not Found",
      });
      return;
    }

    const result = modules.map((mod: any) => ({
      moduleId: mod.dataValues.moduleId.toString(),
      languageId: mod.dataValues.languageId.toString(),
      levelId: mod.dataValues.levelId.toString(),
      lessonId: mod.dataValues.lessonId.toString(),
      moduleName: mod.dataValues.moduleName,
      numberOfQuestions: mod.dataValues.numberOfQuestions.toString(),
      difficulty: mod.dataValues.difficulty,
      mode: mod.dataValues.mode,
      questionList: question.map((question) => ({
        questionId: question.dataValues.qId.toString(),
        question: question.dataValues.question,
        solution: question.dataValues.solution,
        answer: question.dataValues.answer,
        optionList: JSON.parse(question.dataValues.optionList),
      })),
    }));
    res.status(200).json(result);
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const getModuleByModuleId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const modules = await Moduless.findByPk(id);
    console.log(modules);
    // console.log("moduleName", modules.moduless.dataValues.moduleName);
    if (!modules) {
      res
        .status(404)
        .json({ status: 404, error: "404", message: "Module Not Found" });
      return;
    }

    const question = await Question.findAll({
      where: { lessonId: modules.dataValues.lessonId },
    });

    if (question.length === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: "Question for the given lesson Id is Not Found",
      });
      return;
    }

    const result = {
      moduleId: modules.dataValues.moduleId.toString(),
      languageId: modules.dataValues.languageId.toString(),
      levelId: modules.dataValues.levelId.toString(),
      lessonId: modules.dataValues.lessonId.toString(),
      moduleName: modules.dataValues.moduleName,
      numberOfQuestions: modules.dataValues.numberOfQuestions.toString(),
      difficulty: modules.dataValues.difficulty,
      mode: modules.dataValues.mode,
      questionList: question.map((q) => ({
        questionId: q.dataValues.qId.toString(),
        question: q.dataValues.question,
        solution: q.dataValues.solution,
        answer: q.dataValues.answer,
        optionList: JSON.parse(q.dataValues.optionList),
      })),
    };
    res.status(200).json(result);
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const updateModuleByModuleId = async (req: Request, res: Response) => {
  try {
    const {
      examMode,
      moduleName,
      difficultyLevel,
      numberOfQuestions,
      lessonId,
      levelId,
      languageId,
    } = req.body;

    let id = req.params.id;
    const updateModule = await Moduless.update(
      {
        mode: examMode,
        moduleName: moduleName,
        difficulty: difficultyLevel,
        numberOfQuestions: numberOfQuestions,
        lessonId: lessonId,
        levelId: levelId,
        languageId: languageId,
        dateModified: Date.now(),
      },
      {
        where: { moduleId: id },
      }
    );

    if (!updateModule) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Faile to update data of module id ${id}`,
      });
      return;
    }
    const module = await Moduless.findByPk(id);
    res.status(200).json(module);
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const createModule = async (req: Request, res: Response) => {
  try {
    const {
      examMode,
      moduleName,
      difficultyLevel,
      numberOfQuestions,
      lessonId,
      levelId,
      languageId,
    } = req.body;

    const module = await Moduless.create({
      mode: examMode,
      moduleName: moduleName,
      difficulty: difficultyLevel,
      numberOfQuestions: numberOfQuestions,
      lessonId: lessonId,
      levelId: levelId,
      languageId: languageId,
      dateCreated: Date.now(),
      dateModified: Date.now(),
    });

    if (!module) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: "Failed to create module",
      });
      return;
    }

    res.status(200).json(module);
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

export {
  getAllModuleList,
  getModuleByLessonId,
  getModuleByModuleId,
  updateModuleByModuleId,
  createModule,
};
