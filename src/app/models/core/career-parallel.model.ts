import {CareerModel, CatalogueModel} from '@models/core';

export interface CareerParallelModel {
  id: string;
  career: CareerModel;
  parallel: CatalogueModel;
  workday: CatalogueModel;
  capacity: number;
}
