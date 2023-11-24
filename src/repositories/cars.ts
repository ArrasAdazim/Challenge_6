import { CarRequest } from "../models/dto/car";
import { Car, CarEntity } from "../models/entity/car";

class CarsRepository {
  static async getCars(): Promise<Car[]> {
    //withGraphFetched : Agar data user ikut ke ambil
    const listCars = await CarEntity.query()
      .withGraphFetched("[user,update_by,delete_by]")
      .whereNull("deleted_by"); //Biar data yang di soft delete tidak ditampilan

    return listCars;
  }

  static async createCar(car: Car): Promise<Car> {
    const createdCar = await CarEntity.query().insert({
      nama: car.nama,
      sewa: car.sewa,
      ukuran: car.ukuran,
      foto: car.foto,
      user_id: car.user_id,
    });

    return createdCar;
  }

  static async deleteCar(
    car_id: number,
    deleted_by: number
  ): Promise<Car | null> {
    const deletedCar = await CarEntity.query()
      .findById(car_id)
      .whereNull("deleted_at");

    if (deletedCar) {
      await CarEntity.query().findById(car_id).patch({
        deleted_by: deleted_by,
        deleted_at: new Date(),
      });
      return deletedCar;
    } else {
      return null;
    }
  }

  static async updateCar(car_id: number, car: Car): Promise<Car | null> {
    const updateCar = await CarEntity.query()
      .findById(car_id)
      .whereNull("deleted_by");

    if (updateCar) {
      await CarEntity.query().findById(car_id).patch({
        nama: car.nama,
        sewa: car.sewa,
        ukuran: car.ukuran,
        foto: car.foto,
        updated_by: car.updated_by,
        updated_at: car.updated_at,
      });
      return updateCar;
    } else {
      return null;
    }
  }
}

export { CarsRepository };
