import { Request, Response } from "express";
import Question from "../models/question";

const getAllQuestionList = async (req: Request, res: Response) => {
  try {
    const questions = await Question.findAll();
    // console.log("questions", questions);

    if (!questions || questions.length === 0) {
      res
        .status(404)
        .json({ status: 404, error: "404", message: "Questions Not Found" });
      return;
    }

    const result = questions.map((question) => ({
      qId: question.dataValues.qId,
      languageId: question.dataValues.languageId,
      levelId: question.dataValues.levelId,
      lessonId: question.dataValues.lessonId,
      question: question.dataValues.question,
      solution: question.dataValues.solution,
      optionList: JSON.parse(question.dataValues.optionList),
      difficultyLevel: question.dataValues.difficultyLevel,
      isActive: question.dataValues.isActive,
    }));

    res.status(200).json(result);
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const editOptionsByQuestionId = async (req: Request, res: Response) => {
  try {
    const { questionId, options } = req.body;

    // Add input validation here if needed

    const question = await Question.findByPk(questionId);
    if (!question) {
      return res.status(404).json({
        status: 404,
        error: "Not Found",
        message: "Question with the given ID was not found",
      });
    }

    const [rowsUpdated] = await Question.update(
      { options },
      {
        where: { qid: questionId },
      }
    );

    if (rowsUpdated === 0) {
      return res.status(400).json({
        status: 400,
        error: "Bad Request",
        message: "Failed to update question options",
      });
    }

    return res
      .status(200)
      .json({ message: "Question options updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      status: 500,
      error: "Internal Server Error",
      message: "An internal server error occurred",
    });
  }
};

export { getAllQuestionList, editOptionsByQuestionId };
