import {CatalogueModel, SchoolPeriodModel, TeacherDistributionModel} from "@models/core";
import {UserModel} from "@models/auth";

export interface StudentEvaluationModel{
  id?: string;
  evaluationType?: CatalogueModel;
  evaluator?:UserModel;
  teacherDistribution?: TeacherDistributionModel;
  schoolPeriod?: SchoolPeriodModel;
  totalScore?: number;
}
