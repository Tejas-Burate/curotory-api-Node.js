import express, { Request, Response } from "express";
import LiveTest from "../models/liveTest";
import Question from "../models/question";

const getLiveTestByTestId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const test = await LiveTest.findByPk(id);

    if (!test) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Live Test of Id ${id} is not found`,
      });
      return;
    }

    const question = await Question.findAll({
      where: { qId: JSON.parse(test.dataValues.questions) },
    });

    const result = {
      testId: test.dataValues.testId.toString(),
      languageId: test.dataValues.languageId.toString(),
      levelId: test.dataValues.levelId.toString(),
      lessonId: JSON.parse(test.dataValues.lesson),
      testName: test.dataValues.testName,
      numberOfQuestions: test.dataValues.totalQues.toString(),
      examTimeInMinutes: test.dataValues.time.toString(),
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
      .json({ status: 500, error: "500", messagr: "Internal Server Error" });
  }
};

export { getLiveTestByTestId };
