import express, { Request, Response } from "express";
import Test from "../models/test";
import Question from "../models/question";
import TeacherDetails from "../models/teacherDetails";

const getTestList = async (req: Request, res: Response) => {
  try {
    const test = await Test.findAll();

    if (test.length === 0) {
      res
        .status(404)
        .json({ status: 404, error: "404", message: "Tests Not Found" });
    }
    const result = test.map((test: any) => ({
      testId: test.testId.toString(),
      languageId: test.languageId.toString(),
      levelId: test.levelId.toString(),
      lessonId: JSON.parse(test.lesson),
      testImage: test.testImage,
      testName: test.testName,
      rightAns: test.rightAns.toString(),
      wrongAns: test.wrongAns.toString(),
      numberOfQuestions: test.totalQues.toString(),
      questionList: JSON.parse(test.questions),
      examTimeInMinutes: test.time.toString(),
    }));
    res.status(200).json(result);
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const getTestByTestId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const test = await Test.findByPk(id);

    if (!test) {
      res
        .status(404)
        .json({ status: 404, error: "404", message: "Test Not Found" });
      return;
    }

    const question = await Question.findAll({
      where: { levelId: test.dataValues.levelId },
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
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const createTest = async (req: Request, res: Response) => {
  try {
    const {
      languageId,
      levelId,
      lesson,
      testName,
      numberOfQuestions,
      examTimeInMinutes,
      testImage,
    } = req.body;

    const test = await Test.create({
      languageId: languageId,
      levelId: levelId,
      lesson: JSON.parse(lesson),
      testName: testName,
      totalQues: numberOfQuestions,
      time: examTimeInMinutes,
      testImage: testImage,
    });

    if (!test) {
      res
        .status(400)
        .json({ status: 400, error: "400", message: "Failed to create test" });
      return;
    }
    res.status(201).json(test);
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const getTestListByLanguageId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const tests = await Test.findAll({
      where: { languageId: id },
    });

    // Check if no tests were found
    if (tests.length === 0) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Test of Language Id ${id} is Not Found`,
      });
      return;
    }

    // Process each test individually and collect the results in an array
    const results = await Promise.all(
      tests.map(async (test) => {
        const questions = await Question.findAll({
          where: { levelId: test.dataValues.levelId },
        });

        return {
          testId: test.dataValues.testId.toString(),
          languageId: test.dataValues.languageId.toString(),
          levelId: test.dataValues.levelId.toString(),
          lessonId: JSON.parse(test.dataValues.lesson),
          testName: test.dataValues.testName,
          numberOfQuestions: test.dataValues.totalQues.toString(),
          examTimeInMinutes: test.dataValues.time.toString(),
          questionList: questions.map((q) => ({
            questionId: q.dataValues.qId.toString(),
            question: q.dataValues.question,
            solution: q.dataValues.solution,
            answer: q.dataValues.answer,
            optionList: JSON.parse(q.dataValues.optionList),
          })),
        };
      })
    );

    // Send the results as JSON response
    res.status(200).json(results);
  } catch (error) {
    console.error("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

const updateTestByTestId = async (req: Request, res: Response) => {
  try {
    const {
      languageId,
      levelId,
      lesson,
      testName,
      numberOfQuestions,
      examTimeInMinutes,
      testImage,
    } = req.body;

    const id = req.params.id;

    const test = await Test.findByPk(id);

    if (!test) {
      res.status(404).json({
        status: 404,
        error: "404",
        message: `Test of Test Id ${id} is not found`,
      });
      return;
    }

    const updateTest = await Test.update(
      {
        languageId: languageId,
        levelId: levelId,
        lesson: lesson,
        testName: testName,
        totalQues: numberOfQuestions,
        time: examTimeInMinutes,
        testImage: testImage,
        dateModified: Date.now(),
      },
      {
        where: { testId: test.dataValues.testId },
      }
    );

    if (!updateTest) {
      res.status(400).json({
        status: 400,
        error: "400",
        message: `Failed to update test of id ${id}`,
      });
      return;
    }
    const testData = await Test.findByPk(id);
    if (testData) {
      const result = {
        testId: testData.dataValues.testId.toString(),
        languageId: testData.dataValues.languageId.toString(),
        levelId: testData.dataValues.levelId.toString(),
        lessonId: JSON.parse(testData.dataValues.lesson),
        testImage: testData.dataValues.testImage,
        testName: testData.dataValues.testName,
        rightAns: testData.dataValues.rightAns.toString(),
        wrongAns: testData.dataValues.wrongAns.toString(),
        numberOfQuestions: testData.dataValues.totalQues.toString(),
        questionList: JSON.parse(testData.dataValues.questions),
        examTimeInMinutes: testData.dataValues.time.toString(),
      };
      res.status(200).json(result);
    }
  } catch (error) {
    console.error("error", error);
    res
      .status(500)
      .json({ status: 500, error: "500", message: "Internal Server Error" });
  }
};

export {
  getTestList,
  getTestByTestId,
  createTest,
  getTestListByLanguageId,
  updateTestByTestId,
};
