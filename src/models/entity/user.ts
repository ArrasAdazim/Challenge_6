import { Model, ModelObject } from "objection";
import knexInstance from "../../../config/postgresql";
import { CarEntity } from "./car";

export class UserEntity extends Model {
  id?: number;
  email!: string;
  role?: string;
  name!: string;
  profile_picture_url?: string;
  password?: string;

  static get tableName() {
    return "users";
  }

  static get relationMappings() {
    return {
      cars: {
        relation: Model.HasManyRelation,
        modelClass: CarEntity,
        join: {
          from: "users.id",
          to: "cars.user_id",
        },
      },
    };
  }
}

Model.knex(knexInstance);

export type User = ModelObject<UserEntity>;
