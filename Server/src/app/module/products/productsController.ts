import { Request, Response } from "express";
import { productServices } from "./productsServices";
import asyncFunc from "../../utils/asyncFunc";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

// create bicycle product
const createConProduct = asyncFunc(async (req, res) => {
  const body = req.body;
  const result = await productServices.createProduct(body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Bi_Cycle created successfully",
    data: result,
  });
});

// get all bicycle product
const getConProduct = asyncFunc(async (req, res) => {
  const queryData = req?.query;
  const result = await productServices.getProducts(queryData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Bicycles retrieved successfully",
    data: result,
  });
});

// get single bicycle product
const getSingleConProduct = asyncFunc(async (req, res) => {
  const id = req.params.id;
  const result = await productServices.getSingleProducts(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Bicycle retrieved successfully",
    data: result,
  });
});

// update single bicycle product
const updateSingleConProduct = asyncFunc(async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const result = await productServices.updateSingleProducts(id, body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Bicycle updated successfully",
    data: result,
  });
});

// delete single bicycle
const deleteSingleConProduct = asyncFunc(async (req, res) => {
  const id = req.params.id;
  await productServices.deleteSingleProducts(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Bicycle deleted successfully",
    data: null,
  });
});

export const productController = {
  createConProduct,
  getConProduct,
  getSingleConProduct,
  updateSingleConProduct,
  deleteSingleConProduct,
};
