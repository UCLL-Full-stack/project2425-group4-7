import { User } from "@/types/types";
import { useTranslation } from "react-i18next";

type AdminUserListProps = {
  users: User[];
};

const AdminUserList: React.FC<AdminUserListProps> = ({ users }) => {
  const { t } = useTranslation();
  return (
    <div className="overflow-x-auto max-h-[60vh] overflow-y-scroll">
      <table className="min-w-full table-auto text-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">{t("AdminUserList.id")}</th>
            <th className="py-2 px-4 border-b">
              {t("AdminUserList.username")}
            </th>
            <th className="py-2 px-4 border-b">{t("AdminUserList.email")}</th>
            <th className="py-2 px-4 border-b">{t("AdminUserList.role")}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-zinc-800">
              <td className="py-2 px-4 border-b">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserList;
