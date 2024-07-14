import {CareerModel} from "@models/core/career.model";

export interface EvaluationModel {
  id?: string;
  createAt?: Date;
  updateAt?: Date;
  deleteAt?: Date;

  code?: string;
  name?: string;
}
