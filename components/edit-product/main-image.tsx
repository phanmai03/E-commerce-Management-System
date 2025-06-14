'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ImagePlus, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ProductUpdate } from '@/interface/product';

interface MainImageFormProps {
  mainImage: string;
  updatedProduct: ProductUpdate;
  setUpdatedProduct: React.Dispatch<React.SetStateAction<ProductUpdate>>;
}

const MainImageForm: React.FC<MainImageFormProps> = ({
  mainImage,
  updatedProduct,
  setUpdatedProduct,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [displayImage, setDisplayImage] = useState<string>(updatedProduct.mainImage ?? mainImage);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    if (displayImage !== mainImage) {
      setUpdatedProduct(prev => ({
        ...prev,
        mainImage: displayImage,
      }));
    }
  }, [displayImage, mainImage, setUpdatedProduct]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setDisplayImage(previewUrl);
  };

  const handleDelete = () => {
    setDisplayImage('');
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setDisplayImage(previewUrl);

    setUpdatedProduct(prev => ({
      ...prev,
      mainImage: previewUrl,
    }));
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-base">Ảnh chính của sản phẩm</CardTitle>
      </CardHeader>

      <CardContent className="w-full">
        {displayImage === '' ? (
          <div>
            <div
              className="relative w-full h-72 flex justify-center items-center bg-white rounded-md border border-dashed border-gray-400 hover:cursor-pointer focus-visible:outline-none focus-visible:ring-0 [&_svg]:size-8 group overflow-hidden"
              onClick={handleClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div
                className={`absolute bottom-0 left-0 w-full bg-gray-600/10 transition-all duration-300 group-hover:h-full ${
                  isDragOver ? 'h-full' : 'h-0'
                }`}
              />
              <ImagePlus className="text-gray-400 group-hover:text-gray-500" />
            </div>
            <Input
              type="file"
              accept="image/*"
              onChange={handleChange}
              ref={fileInputRef}
              className="hidden"
            />
          </div>
        ) : (
          <div className="relative group">
            <Image
              src={displayImage ?? ''}
              alt="Ảnh chính"
              width={1000}
              height={1000}
              className="w-full h-72 object-cover rounded-md"
            />
            <Button
              onClick={handleDelete}
              className="absolute h-auto -top-2 -right-2 p-1 bg-red-300 hover:bg-red-500 [&_svg]:size-4"
            >
              <X />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MainImageForm;
