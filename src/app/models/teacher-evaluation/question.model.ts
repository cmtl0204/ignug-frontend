import {CatalogueModel} from "@models/core/catalogue.model";
import {ResponseModel} from "@models/teacher-evaluation/response.model";

export interface QuestionModel {
  id?: string;
  code?: string;
  description?: string;
  name?: string;
  type?: string;
  responses: ResponseModel[];
  evaluationType?: CatalogueModel;
  evaluationTypeId?: string;
  sort?: number;
}
