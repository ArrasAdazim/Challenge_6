import { Request, Response } from "express";
import { DefaultResponse } from "../models/dto/default";
import { Car } from "../models/entity/car";
import { CarRequest, CarResponse } from "../models/dto/car";
import CarsService from "../services/cars";

class CarsHandler {
  async getCars(req: Request, res: Response) {
    const carsList: CarResponse[] = await CarsService.getCars();

    const response: DefaultResponse = {
      status: "OK",
      message: "Success retrieving data",
      data: {
        cars: carsList,
      },
    };

    res.status(200).send(response);
  }

  async createCar(req: Request, res: Response) {
    // let payload: CarRequest = req.body;
    const payload: CarRequest = req.body;
    payload.foto = req.file;
    // (req.files as Express.Multer.File[]).map((file) => {
    //   payload.foto = file;
    // });

    // Payload validation
    if (!payload.nama) {
      const response: DefaultResponse = {
        status: "BAD_REQUEST",
        message: "Nama cannot be empty",
        data: {
          created_car: null,
        },
      };

      res.status(400).send(response);
    }

    payload.user_id = req.user.id as number;

    const createdCar: Car = await CarsService.createCar(payload);

    const response: DefaultResponse = {
      status: "CREATED",
      message: "Car succesfully created",
      data: {
        created_car: createdCar,
      },
    };

    res.status(201).send(response);
  }

  async updateCar(req: Request, res: Response) {
    const car_id: number = parseInt(req.params.id);
    const payload: CarRequest = req.body;
    payload.foto = req.file;
    payload.updated_at = new Date();
    payload.updated_by = req.user.id as number;

    console.log(payload);
    const updatedCar: Car | null = await CarsService.updateCar(
      car_id,
      payload
    );
    const payloadUser = {
      nama: payload.nama,
      sewa: payload.sewa,
      ukuran: payload.ukuran,
      foto: updatedCar?.foto,
      user_id: payload.updated_by,
    };

    if (!updatedCar) {
      const Response: DefaultResponse = {
        status: "ERROR",
        message: "Car not found",
        data: null,
      };
      return res.status(404).send(Response);
    }

    const response: DefaultResponse = {
      status: "UPDATED",
      message: "Car successfully updated",
      data: {
        updated_car: payloadUser,
      },
    };
    return res.status(200).send(response);
  }

  async deleteCar(req: Request, res: Response) {
    const car_id: number = parseInt(req.params.id);
    const deleted_by = req.user.id as number;
    const deletedCar: Car | null = await CarsService.deleteCar(
      car_id,
      deleted_by
    );

    if (!deletedCar) {
      const Response: DefaultResponse = {
        status: "ERROR",
        message: "Mobil Tidak Ditemukan",
        data: null,
      };
      return res.status(404).send(Response);
    }

    const response: DefaultResponse = {
      status: "DELETED",
      message: "Car successfully deleted",
      data: {
        deleted_car: deletedCar,
      },
    };

    res.status(200).send(response);
  }
}

export default CarsHandler;
