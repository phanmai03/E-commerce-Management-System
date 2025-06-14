/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import DescriptionCouponForm from "@/components/coupon/description";
import LimitCouponForm from "@/components/coupon/limit";
import InformationCouponForm from "@/components/coupon/information";
import { Button } from "@/components/ui/button";
import { CouponData } from "@/interface/coupon";
import { createCoupon } from "@/app/api/coupon";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ProductData } from "@/interface/product";

export default function DiscountForm() {
  const [coupon, setCoupon] = useState<CouponData>({
    name: "",
    code: "",
    description: "",
    type: "PERCENT",
    value: 0,
    minValue: 0,
    maxValue: 0,
    maxUses: 0,
    maxUsesPerUser: 0,
    targetType: "Order",
    targetIds: [],
    startDate: "",
    endDate: "",
  });
  const [product, setProduct] = useState<ProductData>({
    name: '',
    mainImage: '',
    subImages: [],
    video: '',
    originalPrice: 0,
    description: '',
    category: [],
    attributes: [],
    returnDays: -1,
  });

  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedUserId = localStorage.getItem("userId");

    if (storedAccessToken) setAccessToken(storedAccessToken);
    if (storedUserId) setUserId(storedUserId);
  }, []);

  const handleSubmit = async () => {
    if (!accessToken || !userId) {
      toast.error("Thiếu thông tin xác thực. Vui lòng đăng nhập lại.");
      return;
    }

    setLoading(true);
    try {
      await createCoupon(coupon, userId, accessToken);
      toast.success("Tạo mã giảm giá thành công!");

      router.push("/dashboard/coupons");
    } catch (error) {
      toast.error("Không thể tạo mã. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (!accessToken || !userId) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2 gap-4">
      <InformationCouponForm
        userId={userId}
        accessToken={accessToken}
        coupon={coupon}
        setCoupon={setCoupon}
      />
      <LimitCouponForm
        userId={userId}
        accessToken={accessToken}
        coupon={coupon}
        setCoupon={setCoupon}
        product={product}
        setProduct={setProduct} // ✅ This is what you're missing or doing wrong
      />
      <DescriptionCouponForm description={coupon.description} setCoupon={setCoupon} />
      <div className="col-span-2 flex place-self-end gap-x-4">
        <Button
          onClick={() => router.push("/dashboard/coupons")}
          className='bg-gray-200 text-gray-900 hover:bg-gray-300'
        >
            HỦY
        </Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Đang tạo..." : "TẠO MÃ GIẢM GIÁ"}
        </Button>
      </div>

    </div>
  );
}
