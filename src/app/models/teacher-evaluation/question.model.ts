import {CatalogueModel} from '@models/core';

export interface QuestionModel {
  id: string;
  createAt: Date;
  updateAt: Date;
  deleteAt: Date;
  enabled: boolean;

  code?: string;
  name?: string;
  category?: CatalogueModel;
  evaluationType?: CatalogueModel;
  sort?: number;
}
