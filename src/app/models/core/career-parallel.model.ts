import {CareerModel, CatalogueModel} from '@models/core';

export interface CareerParallelModel {
  id: string;
  career: CareerModel;
  parallel: CatalogueModel;
  parallelId: string;
  workday: CatalogueModel;
  workdayId: string;
  academicPeriod: CatalogueModel;
  academicPeriodId: string;
  capacity: number;
}
