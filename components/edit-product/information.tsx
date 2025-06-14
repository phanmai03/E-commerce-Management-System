'use client'

import { ChangeEvent } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ImportProduct, ProductDetail, ProductUpdate } from '@/interface/product'
import CategorySelection from './information/category'
import AttributeForm from './information/attribute'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import Publish from './switch'

interface InformationFormProps {
  product: ProductDetail;
  updatedProduct: ProductUpdate;
  setUpdatedProduct: React.Dispatch<React.SetStateAction<ProductUpdate>>;
  userId: string;
  accessToken: string;
  importQuantity: ImportProduct;
  setImportQuantity: React.Dispatch<React.SetStateAction<ImportProduct>>;
  hasSkuTable: boolean;
}

const InformationForm: React.FC<InformationFormProps> = ({
  product,
  updatedProduct,
  setUpdatedProduct,
  userId,
  accessToken,
  importQuantity,
  setImportQuantity,
  hasSkuTable,
}) => {
  const displayProduct = { ...product, ...updatedProduct };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let newValue = name === 'name' || name === 'video' ? value : (value === '' ? '' : Number(value));
    const originalValue = product[name as keyof ProductDetail];

    if (name !== 'name' && name !== 'video' && Number(newValue) < 0) {
      newValue = '0';
    }

    setUpdatedProduct((prev) => {
      const isDifferent =
        typeof originalValue === 'number'
          ? Number(newValue) !== originalValue
          : newValue !== originalValue;

      if (isDifferent) {
        return {
          ...prev,
          [name]: newValue,
        };
      } else {
        const updated = { ...prev };
        delete updated[name as keyof ProductUpdate];
        return updated;
      }
    });
  };

  const handleValueChange = (value: string) => {
    const isDifferent = Number(value) !== product.returnDays;

    setUpdatedProduct((prev) => {
      if (isDifferent) {
        return {
          ...prev,
          returnDays: Number(value),
        };
      } else {
        const updated = { ...prev };
        delete updated.returnDays;
        return updated;
      }
    });
  };

  return (
    <Card className='col-span-3'>
      <CardHeader>
        <CardTitle className='text-base'>Chỉnh sửa thông tin sản phẩm</CardTitle>
      </CardHeader>

      <CardContent className='grid grid-cols-6 gap-x-6 gap-y-8'>
        <div className='space-y-2 col-span-6'>
          <Label>Đường dẫn video</Label>
          <Input
            name='video'
            value={displayProduct.video ?? ''}
            type='text'
            placeholder='Nhập URL video'
            onChange={handleChange}
          />
        </div>

        <div className='space-y-2 col-span-6'>
          <Label>Tên sản phẩm</Label>
          <Input
            name='name'
            value={displayProduct.name ?? ''}
            type='text'
            placeholder='Nhập tên sản phẩm'
            onChange={handleChange}
          />
        </div>

        <div className='w-full space-y-2 col-span-6'>
          <Label>Danh mục sản phẩm</Label>
          <CategorySelection product={product} setUpdatedProduct={setUpdatedProduct} />
        </div>

        <div className="col-span-6 grid grid-cols-6 gap-x-6 items-end">
          {/* Giá gốc */}
          <div className="col-span-4 flex flex-col gap-1">
            <Label>Giá gốc</Label>
            <Input
              name="originalPrice"
              value={displayProduct.originalPrice ?? ''}
              type="number"
              min="0"
              placeholder="Nhập giá gốc"
              onChange={handleChange}
              className="h-10"
            />
          </div>

          {/* Số lượng nhập */}
          <div className="col-span-1 flex flex-col gap-1">
            <Label>Số lượng nhập</Label>
            <Input
              type="number"
              min="0"
              value={importQuantity.quantity || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setImportQuantity((prev) => ({
                  ...prev,
                  quantity: Number(e.target.value),
                }))
              }
              placeholder="Số lượng"
              disabled={hasSkuTable}
              className="h-10"
            />
          </div>

          {/* Số ngày hoàn trả */}
          <div className="col-span-1 flex flex-col gap-1">
            <Label>Số ngày hoàn trả</Label>
            <Select
              value={String(displayProduct.returnDays ?? '')}
              onValueChange={handleValueChange}
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Chọn" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="0">0 ngày</SelectItem>
                  <SelectItem value="7">7 ngày</SelectItem>
                  <SelectItem value="14">14 ngày</SelectItem>
                  <SelectItem value="30">30 ngày</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='space-y-2 col-span-6'>
          <Label>Thuộc tính sản phẩm</Label>
          <AttributeForm
            product={product}
            setUpdatedProduct={setUpdatedProduct}
            userId={userId}
            accessToken={accessToken}
          />
        </div>

        <div className='space-x-4 col-span-6 flex justify-end items-center'>
          <Label>Bán sản phẩm</Label>
          <Publish id={product.id} status={product.status} item='product' />
        </div>
      </CardContent>
    </Card>
  );
};

export default InformationForm;
