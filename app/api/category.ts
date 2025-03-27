import * as Category from "@/interface/category"

import { toast } from 'react-toastify';
import api from './index';
import get from 'lodash/get';

const CATEGORY_URL = '/categories';

export const getAllCategories = async (): Promise<Array<Category.CategoryDataResponse>> => {
    try {
        const response = await api.get(`${CATEGORY_URL}/all?size=3`);
        return response.data.metadata;
    } catch (error) {
        const errorMessage = get(error, 'response.data.error.message', '');

        if (errorMessage) {
            toast.error(errorMessage);
        }
        throw new Error(errorMessage || 'An unknown error occurred.');
    }
}

export const getChildCategories = async (data: string): Promise<Array<Category.CategoryDataResponse>> => {
    try {
        const response = await api.get(`${CATEGORY_URL}/?parentId=${data}`);
        return response.data.metadata;
    } catch (error) {
        const errorMessage = get(error, 'response.data.error.message', '');

        if (errorMessage) {
            toast.error(errorMessage);
        }
        throw new Error(errorMessage || 'An unknown error occurred.');
    }
}

export const createCategories = async (data: Category.CategoryData, userId: string, accessToken: string): Promise<Category.CategoryDataResponse> => {
    try {
        const response = await api.post(`${CATEGORY_URL}`, data, {
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
