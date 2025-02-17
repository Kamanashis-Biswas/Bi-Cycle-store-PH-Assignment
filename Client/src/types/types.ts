import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TMeta = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
  };

  export type TError = {
    data: {
      message: string;
      stack: string;
      success: boolean;
    };
    status: number;
  };

  export interface IProductResponse {
    _id: string;
    image: string;
    name: string;
    brand: string;
    price: number;
    type: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';
    model: string;
    description: string;
    quantity: number;
    inStock: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export type TResponse<T> = {
    data?: {result: T | [], meta: TMeta};
    error?: TError;
    statusCode: number;
    success: boolean;
    message: string;
  };

  export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;