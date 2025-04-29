import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store"; // путь до твоего store.ts

interface SiteConfig {
  shopName: string;
  phone: string;
  email: string;
  yookassaIdentificator: string;
  yookassaSecret: string;
  wbToken: string;
  logo: File | null;
  logoPreview: string;
}

export default function SiteSettings() {
  const token = useSelector((state: RootState) => state.auth.token);

  const [form, setForm] = useState<SiteConfig>({
    shopName: "",
    phone: "",
    email: "",
    yookassaIdentificator: "",
    yookassaSecret: "",
    wbToken: "",
    logo: null,
    logoPreview: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;

    const fetchConfig = async () => {
      try {
        const response = await axios.get("/api/admin/config", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setForm((prev) => ({
            ...prev,
            ...response.data,
            logoPreview: response.data.logo || "",
          }));
        }
      } catch (error) {
        console.error("Ошибка при загрузке настроек:", error);
      }
    };

    fetchConfig();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setForm((prev) => ({
        ...prev,
        [name]: file,
        logoPreview: URL.createObjectURL(file),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return;

    setLoading(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key !== "logoPreview" && value) {
        formData.append(key, value as Blob | string);
      }
    });

    try {
      await axios.post("/api/admin/config/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Настройки успешно обновлены!");
    } catch (error) {
      console.error("Ошибка при обновлении настроек:", error);
      alert("Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8">Настройки сайта</h2>

      {!token ? (
        <div className="text-red-500 font-semibold text-lg">
          Авторизуйтесь для доступа к настройкам
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 shadow-xl rounded-2xl space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Название магазина", name: "shopName" },
              { label: "Телефон", name: "phone" },
              { label: "Email", name: "email" },
              { label: "YooKassa ID", name: "yookassaIdentificator" },
              { label: "YooKassa Secret", name: "yookassaSecret" },
              { label: "WB Token", name: "wbToken" },
            ].map(({ label, name }) => (
              <div key={name}>
                <label htmlFor={name} className="block mb-2 font-semibold text-gray-700">
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  value={(form as any)[name]}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-3"
                />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <label htmlFor="logo" className="block mb-2 font-semibold text-gray-700">
              Логотип магазина
            </label>
            <input
              type="file"
              name="logo"
              id="logo"
              accept="image/*"
              onChange={handleChange}
              className="w-full border-gray-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-3"
            />

            {form.logoPreview && (
              <div className="mt-4">
                <p className="mb-2 font-semibold text-gray-600">Текущее изображение:</p>
                <img
                  src={form.logoPreview}
                  alt="Логотип"
                  className="max-h-40 rounded-xl shadow-md"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Сохранение..." : "Сохранить изменения"}
          </button>
        </form>
      )}
    </div>
  );
}
