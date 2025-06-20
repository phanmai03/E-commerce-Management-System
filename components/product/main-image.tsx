'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { ImagePlus, X } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

interface MainImageFormProps {
  setMainImage: React.Dispatch<React.SetStateAction<File | undefined>>;
}

const MainImageForm: React.FC<MainImageFormProps> = ({ setMainImage }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setMainImage(file);

    const previewUrl = URL.createObjectURL(file);
    setImage(previewUrl);
  };

  const handleDelete = () => {
    setMainImage(undefined);
    setImage('');
  }

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
    const file = event.dataTransfer.files;

    setMainImage(file[0]);

    const previewUrl = URL.createObjectURL(file[0]);
    setImage(previewUrl);
  };

  return (
    <Card className='col-span-1'>
      <CardHeader>
        <CardTitle className='text-base'>Thêm ảnh chính</CardTitle>
      </CardHeader>

      <CardContent className='w-full'>
        {image === '' ? (
          <div>
            <div
              className='relative w-full h-72 flex justify-center items-center bg-white rounded-md border border-dashed border-gray-400 hover:cursor-pointer focus-visible:outline-none focus-visible:ring-0 [&_svg]:size-8 group overflow-hidden'
              onClick={handleClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className={`absolute bottom-0 left-0 w-full bg-gray-600/10 transition-all duration-300 group-hover:h-full ${isDragOver ? 'h-full' : 'h-0'}`} />
              <ImagePlus className='text-gray-400 group-hover:text-gray-500' />
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
          <div className='relative group'>
            <Image
              src={image}
              alt="Ảnh sản phẩm"
              width={1000}
              height={1000}
              className='w-full h-72 object-cover rounded-md'
            />
            <Button
              onClick={handleDelete}
              className='absolute h-auto -top-2 -right-2 p-1 bg-red-300 hover:bg-red-500 [&_svg]:size-4'
              title="Xóa ảnh"
            >
              <X />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default MainImageForm;
