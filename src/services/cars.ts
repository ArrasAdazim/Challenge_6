import { CarRequest, CarResponse } from "../models/dto/car";
import { Car } from "../models/entity/car";
import { CarsRepository } from "../repositories/cars";
import cloudinary from "../../config/cloudinary";

class CarsService {
  static async getCars(): Promise<CarResponse[]> {
    const listCars = await CarsRepository.getCars();

    const listCarsResponse: CarResponse[] = listCars.map((car) => {
      const carResponse: CarResponse = {
        id: car.id as number,
        nama: car.nama,
        sewa: car.sewa,
        ukuran: car.ukuran,
        foto: car.foto,
        user: {
          id: car.user?.id as number,
          name: car.user?.name as string,
          email: car.user?.email as string,
          profile_picture_file: car.user?.profile_picture_url as string,
        },
      };

      return carResponse;
    });

    return listCarsResponse;
  }

  static async createCar(car: CarRequest): Promise<Car> {
    try {
      const fileBase64 = car.foto?.buffer.toString("base64");
      const file = `data:${car.foto?.mimetype};base64,${fileBase64}`;

      // Async await
      const uploadedFile = await cloudinary.uploader.upload(file); // async

      const carToCreate: Car = {
        nama: car.nama,
        sewa: car.sewa,
        ukuran: car.ukuran,
        foto: uploadedFile.url,
        user_id: car.user_id,
      };

      const createdCar = await CarsRepository.createCar(carToCreate);

      return createdCar;
    } catch (error) {
      throw error;
    }
  }

  static async deleteCar(
    car_id: number,
    deleted_by: number
  ): Promise<Car | null> {
    const deletedCar = await CarsRepository.deleteCar(car_id, deleted_by);
    return deletedCar;
  }

  static async updateCar(
    car_id: number,
    car: CarRequest
  ): Promise<Car | null> {
    const fileBase64 = car.foto?.buffer.toString("base64");
    const file = `data:${car.foto?.mimetype};base64,${fileBase64}`;

    const uploadedImage = await cloudinary.uploader.upload(file);

    const carToUpdate: Car = {
      nama: car.nama,
      sewa: car.sewa,
      ukuran: car.ukuran,
      foto: uploadedImage.url,
      updated_by: car.updated_by,
      updated_at: car.updated_at,
    };
    const updatedCar = await CarsRepository.updateCar(car_id, carToUpdate);
    return updatedCar;
  }
}

export default CarsService;
