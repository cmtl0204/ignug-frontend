import {CatalogueModel, SchoolPeriodModel} from "@models/core";
import {UserModel} from "@models/auth";

export interface CoordinatorEvaluationModel {
  id?: string;
  evaluationType?: CatalogueModel;
  evaluator?:UserModel;
  evaluated?: UserModel;
  schoolPeriod?: SchoolPeriodModel;
  totalScore?: number;
}
