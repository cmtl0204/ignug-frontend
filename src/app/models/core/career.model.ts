import {CatalogueModel, CurriculumModel, InstitutionModel} from '@models/core';

export interface CareerModel {
  id: string;
  createAt: Date;
  updateAt: Date;
  deleteAt: Date;
  isVisible: boolean;

  institution: InstitutionModel;
  modality: CatalogueModel;
  state: CatalogueModel;
  type: CatalogueModel;
  curriculums: CurriculumModel[];

  acronym: string;
  code: string;
  codeSniese: string;
  degree: string;
  logo: string;
  name: string;
  resolutionNumber: string;
  shortName: string;
}

export interface CreateCareerDto extends Omit<CareerModel, 'id'> {}

export interface UpdateCareerDto extends Partial<Omit<CareerModel, 'id'>> {}

export interface SelectCareerDto extends Partial<CareerModel> {}
