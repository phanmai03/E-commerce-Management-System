import * as Product from "@/interface/product"

import { toast } from 'react-toastify';
import api from './index';
import get from 'lodash/get';

const PRODUCT_URL = '/products'

export const getAllProduct = async (userId: string, accessToken: string, page: number, size: number): Promise<Product.ProductResponse> => {
  try {
    const response = await api.get(`${PRODUCT_URL}/?page=${page}&size=${size}`, {
      headers: {
        "x-client-id": userId,
        Authorization: accessToken,
      },
    });

    return response.data.metadata;
  } catch (error) {
    const errorMessage = get(error, "response.data.error.message", "");

    if (errorMessage) {
      toast.error(errorMessage);
    }
    throw new Error(errorMessage || "An unknown error occurred.");
  }
};
//SEARCH
export const getTopSearchProduct = async (search: string, userId: string, accessToken: string, page: number, size: number): Promise<Product.ProductResponse> => {
  try {
    const response = await api.get(`${PRODUCT_URL}/?search=${search}&page=${page}&size=${size}`, {
      headers: {
        "x-client-id": userId,
        Authorization: accessToken,
      },
    });
    return response.data.metadata; // Assumed response contains metadata
  } catch (error) {
    const errorMessage = get(error, 'response.data.error.message', '');
    if (errorMessage) {
      toast.error(errorMessage);
    }
    throw new Error(errorMessage || 'An unknown error occurred.');
  }
};

export const createProduct = async (data: Product.ProductData, userId: string, accessToken: string): Promise<Product.ProductDataResponse> => {
  try {
    const response = await api.post(`${PRODUCT_URL}/`, data, {
      headers: {
        "x-client-id": userId,
        Authorization: accessToken,
      },
    });

    return response.data.metadata;
  } catch (error) {
    const errorMessage = get(error, "response.data.error.message", "");

    if (errorMessage) {
      toast.error(errorMessage);
    }
    throw new Error(errorMessage || "An unknown error occurred.");
  }
};

export const publishProduct = async (id: string, userId: string, accessToken: string): Promise<Product.PublishProductResponse> => {
  try {
    const response = await api.patch(`${PRODUCT_URL}/publish/${id}`, null, {
      headers: {
        'x-client-id': userId,
        'Authorization': accessToken
      }
    });
    return response.data.metadata;
  } catch (error) {
    const errorMessage = get(error, 'response.data.error.message', '');

    if (errorMessage) {
      toast.error(errorMessage);
    }
    throw new Error(errorMessage || 'An unknown error occurred.');
  }
};

export const unPublishProduct = async (id: string, userId: string, accessToken: string): Promise<Product.PublishProductResponse> => {
  try {
    const response = await api.patch(`${PRODUCT_URL}/unpublish/${id}`, null, {
      headers: {
        'x-client-id': userId,
        'Authorization': accessToken
      }
    });
    return response.data.metadata;
  } catch (error) {
    const errorMessage = get(error, 'response.data.error.message', '');

    if (errorMessage) {
      toast.error(errorMessage);
    }
    throw new Error(errorMessage || 'An unknown error occurred.');
  }
};


export const deleteProduct = async (id: string, userId: string, accessToken: string) => {
  try {
      const response = await api.delete(`${PRODUCT_URL}/${id}`,{
          headers: {
              'x-client-id': userId,
              'Authorization': accessToken
          }
      });
      return response.data.metadata;
  } catch (error) {
      const errorMessage = get(error, 'response.data.error.message', '');

      if (errorMessage) {
          toast.error(errorMessage);
      }
      throw new Error(errorMessage || 'An unknown error occurred.');
  }
};

export const getProductDetail = async (id: string, userId: string, accessToken: string): Promise<Product.ProductDetailResponse> => {
  try {
    const response = await api.get(`${PRODUCT_URL}/${id}`, {
      headers: {
        'x-client-id': userId,
        'Authorization': accessToken,
      },
    });

    return response.data.metadata;
  } catch (error) {
    const errorMessage = get(error, 'response.data.error.message', '');

    if (errorMessage) {
      toast.error(errorMessage);
    }
    throw new Error(errorMessage || 'An unknown error occurred.');
  }
};


export const updateProduct = async ( data: Product.ProductUpdate, userId: string, accessToken: string): Promise<Product.ProductUpdateResponse> => {
  try {
    const response = await api.patch(`${PRODUCT_URL}`, data, {
      headers: {
        'x-client-id': userId,
        'Authorization': accessToken,
      },
    });

    return response.data.metadata;
  } catch (error) {
    const errorMessage = get(error, 'response.data.error.message', '');
    if (errorMessage) toast.error(errorMessage);
    throw new Error(errorMessage || 'An unknown error occurred.');
  }
};

export const importProduct = async (data: Product.ImportProduct, userId: string, accessToken: string): Promise<Product.ImportProductResponse> => {
  try {
    const response = await api.patch(`${PRODUCT_URL}/update-quantity`, data,
      {
        headers: {
          'x-client-id': userId,
          'Authorization': accessToken
        }
      }
    );
      return response.data.metadata;; // Indicating successful update
  } catch (error) {
    // Detailed error handling
    const errorMessage = get(error, 'response.data.error.message', 'An unknown error occurred.');
    toast.error(errorMessage);
    throw new Error(errorMessage); // Propagate the error for further handling
  }
};
