import {QuestionModel} from "@models/teacher-evaluation/question.model";
import {ResponseModel} from "@models/teacher-evaluation/response.model";

export interface ResultModel {
  id?: string;
  model?: QuestionModel;
  modelId?: string;
  response?: ResponseModel;
  responseId?: string;
  questionId?: string;
  score?: number;
}
