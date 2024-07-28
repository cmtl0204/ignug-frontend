import {QuestionModel} from "@models/teacher-evaluation/question.model";

export interface ResponseModel {
  id?: string;
  code?: string;
  description?: string;
  name?: string;
  score?: number;
  question?: QuestionModel;
}
