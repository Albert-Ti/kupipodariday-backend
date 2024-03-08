import { FindOptionsWhere } from 'typeorm';

export type QueryFilter<T> = FindOptionsWhere<T> | FindOptionsWhere<T>[];
