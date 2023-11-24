import { Model, ModelObject } from "objection";
import knexInstance from "../../../config/postgresql";
import { User, UserEntity } from "./user";

export class CarEntity extends Model {
  id?: number;
  nama!: string;
  sewa!: string;
  ukuran!: string;
  foto!: string;
  user_id?: number;
  updated_by?: number;
  deleted_by?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  user?: User;

  static get tableName() {
    return "cars";
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserEntity,
        join: {
          from: "cars.user_id",
          to: "users.id",
        },
      },
      delete_by: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserEntity,
        join: {
          from: "cars.deleted_by",
          to: "users.id",
        },
      },
      update_by: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserEntity,
        join: {
          from: "cars.updated_by",
          to: "users.id",
        },
      },
    };
  }
}

Model.knex(knexInstance);

export type Car = ModelObject<CarEntity>;
