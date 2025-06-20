/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useMemo } from "react";

// ✅ Chuyển về đầu ngày để tránh lệch timezone
const normalizeDate = (date: Date | null): Date | undefined => {
  if (!date) return undefined;
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
};

export default function PromotionInformationForm({
  discountType,
  setDiscountType,
  discountValue,
  setDiscountValue,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: any) {
  // Format ngày hiển thị
  const displayStartDate = useMemo(() => {
    return startDate ? format(startDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày";
  }, [startDate]);

  const displayEndDate = useMemo(() => {
    return endDate ? format(endDate, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày";
  }, [endDate]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin khuyến mãi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="font-medium">Loại giảm giá</label>
          <Select value={discountType} onValueChange={setDiscountType}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PERCENT">Giảm theo %</SelectItem>
              <SelectItem value="AMOUNT">Giảm số tiền</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="font-medium">Giá trị giảm</label>
          <Input
            type="number"
            value={discountValue}
            onChange={(e) => setDiscountValue(Number(e.target.value))}
            className="mt-1"
            min={1}
            required
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="font-medium">Từ ngày</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full mt-1 justify-start text-left"
                >
                  {displayStartDate}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={normalizeDate(startDate)}
                  onSelect={(date) => setStartDate(date)}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex-1">
            <label className="font-medium">Đến ngày</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full mt-1 justify-start text-left"
                >
                  {displayEndDate}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={normalizeDate(endDate)}
                  onSelect={(date) => setEndDate(date)}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
