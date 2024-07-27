import {CatalogueModel} from "@models/core/catalogue.model";

export interface QuestionModel {
  id?: string;
  code?: string;
  description?: string;
  name?: string;
  type?: string;
  evaluationType?: CatalogueModel;
  evaluationTypeId?: string;
}
