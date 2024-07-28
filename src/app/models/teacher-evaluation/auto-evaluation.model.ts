import {CatalogueModel, SchoolPeriodModel} from "@models/core";
import {UserModel} from "@models/auth";

export interface AutoEvaluationModel {
  id?: string;
  evaluationType?: CatalogueModel;
  evaluated?: UserModel;
  schoolPeriod?: SchoolPeriodModel;
  totalScore?: number;
}
