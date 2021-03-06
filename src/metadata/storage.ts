import { DenoDB } from "../../deps.ts";

export interface EntityOptions {
  name: string;
  timestamps?: boolean;
}

export interface EntitiesMetadata {
  target: typeof DenoDB.Model;
  options: EntityOptions;
}

export interface ColumnOptions {
  type: string;
  default?: unknown;
  as?: string;
  unique?: boolean;
  autoIncrement?: boolean;
  allowNull?: boolean;
  precision?: number;
  scale?: number;
  values?: unknown[];
  comment?: string;
  primaryKey?: boolean;
  length?: number;
}

export interface ColumnsMetadata {
  target: DenoDB.Model;
  property: string;
  options: ColumnOptions;
}

export interface RelationshipOptions {
  primaryKey?: string;
  foreignKey?: string;
}

export interface RelationsMetadata {
  target: typeof DenoDB.Model;
  property: string;
  options?: RelationshipOptions;
  inverseKey: string;
  type: "many-to-many" | "belongs-to" | "one-to-one";
  relationTarget: () => typeof DenoDB.Model;
}

export class MetadataStorage {
  public static instance: MetadataStorage;

  public entities: EntitiesMetadata[] = [];
  public columns: ColumnsMetadata[] = [];
  public relations: RelationsMetadata[] = [];
}

export function getMetadataStorage() {
  if (MetadataStorage.instance) {
    return MetadataStorage.instance;
  }
  return MetadataStorage.instance = new MetadataStorage();
}
