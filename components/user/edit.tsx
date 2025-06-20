/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { UserData } from "@/interface/user";
import BlockUser from "@/components/user/switch";
import { assignRole } from "@/app/api/user";
import { toast } from "react-toastify";
import { getAllRole } from "@/app/api/role";
import { Button } from "@/components/ui/button";

interface EditUserModalProps {
  user: UserData;
  onClose: () => void;
  onStatusChange: (newStatus: string) => void;
  onRoleChange: (roleId: string, roleName: string) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  onClose,
  onStatusChange,
  onRoleChange
}) => {
  const [isActive, setIsActive] = useState(user.status?.toUpperCase() === "ACTIVE");
  const [roles, setRoles] = useState<{ id: string; name: string }[]>([]);
  const [selectedRole, setSelectedRole] = useState(user.role?.id || "");
  const [loading, setLoading] = useState(false);

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") || "" : "";
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") || "" : "";

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const response = await getAllRole(userId, accessToken, 1, 10);
        setRoles(response.roles || []);
      } catch (error) {
        toast.error("Không thể tải danh sách vai trò.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [userId, accessToken]);

  const handleStatusChange = (newStatus: string) => {
    setIsActive(newStatus.toUpperCase() === "ACTIVE");
    onStatusChange(newStatus);
  };

  const handleSave = async () => {
    if (!selectedRole) {
      toast.error("Vui lòng chọn vai trò.");
      return;
    }

    setLoading(true);
    try {
      await assignRole(selectedRole, user.id, userId, accessToken);
      const roleName = roles.find((role) => role.id === selectedRole)?.name || "Không xác định";
      onRoleChange(selectedRole, roleName);
      toast.success("Cập nhật vai trò người dùng thành công!");
      onClose();
    } catch (error) {
      toast.error("Không thể cập nhật vai trò người dùng.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <h2 className="text-lg font-semibold mb-4">Chỉnh sửa người dùng</h2>

        {/* Role Selection */}
        <label className="block text-sm font-medium mb-1">Vai trò</label>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="w-full border rounded-md p-2 mb-4"
        >
          <option value="" disabled>Chọn vai trò</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>

        {/* Status Section */}
        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg mb-4">
          <span className="text-sm font-medium text-gray-600">Trạng thái</span>
          <div className="flex items-center space-x-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {isActive ? "Đang hoạt động" : "Đã bị chặn"}
            </span>
            <BlockUser
              id={user.id}
              status={isActive ? "ACTIVE" : "BLOCKED"}
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Huỷ
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
