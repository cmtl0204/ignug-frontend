import {CatalogueModel, EnrollmentDetailModel, SchoolPeriodModel, TeacherDistributionModel} from "@models/core";
import {UserModel} from "@models/auth";

export interface StudentEvaluationModel{
  id?: string;
  evaluationType?: CatalogueModel;
  enrollmentDetail?:EnrollmentDetailModel;
  evaluator?:UserModel;
  evaluated?: UserModel;
  schoolPeriod?: SchoolPeriodModel;
  totalScore?: number;
  enabled?: boolean;
}
