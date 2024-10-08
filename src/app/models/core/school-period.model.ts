import {CatalogueModel} from '@models/core';

export interface SchoolPeriodModel {
  id: string;
  createAt: Date;
  updateAt: Date;
  deleteAt: Date;
  isVisible: boolean;

  state: CatalogueModel;

  code: string;
  codeSniese: string;
  name: string;
  shortName: string;
  startedAt:Date;
  endedAt:Date;
  ordinaryStartedAt:Date;
  ordinaryEndedAt:Date;
  extraOrdinaryStartedAt:Date;
  extraOrdinaryEndedAt:Date;
  especialStartedAt:Date;
  especialEndedAt:Date;
}

export interface CreateSchoolPeriodDto extends Omit<SchoolPeriodModel, 'id'> {
}

export interface UpdateSchoolPeriodDto extends Partial<Omit<SchoolPeriodModel, 'id'>> {
}

export interface SelectSchoolPeriodDto extends Partial<SchoolPeriodModel> {
}
