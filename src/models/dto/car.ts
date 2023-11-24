import { UserResponse } from "./user";

interface CarRequest {
  nama: string;
  sewa: string;
  ukuran: string;
  foto?: Express.Multer.File;
  user_id: number;
  updated_by?: number;
  deleted_by?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

interface CarResponse {
  id: number;
  nama: string;
  sewa: string;
  ukuran: string;
  foto: string;
  user: UserResponse;
}

export { CarRequest, CarResponse };
