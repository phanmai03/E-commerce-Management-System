import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ShippingAddress } from "@/interface/order";
import { User, Phone, MapPin } from "lucide-react";

interface CustomerProps {
  address: ShippingAddress;
}

export default function Customer({ address }: CustomerProps) {
  if (!address) return null;

  return (
    <div className="col-span-1">
      <Card className="shadow-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="pb-4 border-b">
          <h3 className="text-xl font-bold text-gray-900">Thông tin người nhận</h3>
          <p className="text-sm text-gray-500">Chi tiết người nhận hàng</p>
        </CardHeader>

        <CardContent className="space-y-5 pt-4 text-sm text-gray-700">
          {/* Họ và tên */}
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 mt-1 text-blue-600" />
            <div>
              <p className="text-gray-500 font-medium">Họ và tên</p>
              <p className="text-gray-900 font-semibold">{address.fullname}</p>
            </div>
          </div>

          {/* Số điện thoại */}
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 mt-1 text-green-600" />
            <div>
              <p className="text-gray-500 font-medium">Số điện thoại</p>
              <p className="text-gray-900 font-semibold">{address.phone}</p>
            </div>
          </div>

          {/* Địa chỉ giao hàng */}
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 mt-1 text-rose-600" />
            <div>
              <p className="text-gray-500 font-medium">Địa chỉ giao hàng</p>
              <p className="text-gray-900 font-semibold">
                {`${address.street}, ${address.ward}, ${address.district}, ${address.city}`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
