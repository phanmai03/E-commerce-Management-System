/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { CircleUser, Menu } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { toast } from "react-toastify";
import { logoutRequest } from "@/app/api/auth";
import { changePassword } from "@/app/api/user";
import { useRouter } from "next/navigation";

interface HeaderProps {
  showSideBar: boolean;
  setShowSideBar: (showSideBar: boolean) => void;
}

export default function Header({ showSideBar, setShowSideBar }: HeaderProps) {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const storedAvatar = localStorage.getItem("avatarUrl");
    if (storedAvatar) setAvatar(storedAvatar);

    const handleStorageChange = () => {
      setAvatar(localStorage.getItem("avatarUrl"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleChangePassword = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      const accessToken = localStorage.getItem("accessToken");

      if (!userId || !accessToken) {
        toast.error("Bạn chưa đăng nhập hoặc thông tin không hợp lệ!");
        return;
      }

      await changePassword({ oldPassword, newPassword }, userId, accessToken);
      toast.success("Đổi mật khẩu thành công!");
      setOpenDialog(false);
      setOldPassword("");
      setNewPassword("");
    } catch {
      toast.error("Không thể đổi mật khẩu. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const accessToken = localStorage.getItem("accessToken");

      if (!userId || !accessToken) {
        toast.error("Bạn chưa đăng nhập hoặc thông tin không hợp lệ!");
        return;
      }

      await logoutRequest(userId, accessToken);
      toast.success("Đăng xuất thành công!");

      localStorage.removeItem("userId");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tokenTimestamp");
      localStorage.removeItem("avatarUrl"); // ← QUAN TRỌNG

      router.push("/");
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
      toast.error("Đã xảy ra lỗi khi đăng xuất. Vui lòng thử lại.");
    }
  };

  return (
    <div className="sticky w-full left-0 top-0 z-30">
      <div className="flex h-14 items-center gap-4 border-b bg-card dark:bg-black px-4 lg:h-[60px] lg:px-6">
        {/* Nút mở Sidebar */}
        <button
          className="flex w-8 h-8 lg:hidden rounded-md bg-white hover:bg-[#F1F6F9] hover:shadow-md justify-center items-center transition-all"
          onClick={() => setShowSideBar(!showSideBar)}
        >
          <Menu className="text-xl" />
        </button>

        <div className="flex flex-1 justify-end items-center relative gap-4">
          {/* Nút chuyển chế độ sáng/tối */}
          <ModeToggle />

          {/* Mini Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Ảnh đại diện"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <CircleUser className="h-5 w-5" />
                )}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/auth/profile")}>
                Thông tin cá nhân
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenDialog(true)}>
                Đổi mật khẩu
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Đăng xuất</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Dialog Đổi Mật Khẩu */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md p-6 rounded-xl border border-gray-200 shadow-lg">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Đổi mật khẩu
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-5 mt-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Mật khẩu cũ</label>
              <Input
                type="password"
                placeholder="Nhập mật khẩu cũ"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Mật khẩu mới</label>
              <Input
                type="password"
                placeholder="Nhập mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleChangePassword} disabled={loading}>
              {loading ? "ĐANG LƯU..." : "LƯU"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
