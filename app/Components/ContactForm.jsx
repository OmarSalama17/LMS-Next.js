"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast"; 

export default function ContactForm() {
  const t = useTranslations("contact");
  const [loading, setLoading] = useState(false);

  const formFields = [
    {
      id: "name",
      label: t("form.nameLabel"),
      type: "text",
      placeholder: t("form.namePlaceholder"),
    },
    {
      id: "email",
      label: t("form.emailLabel"),
      type: "email",
      placeholder: t("form.emailPlaceholder"),
    },
    {
      id: "subject",
      label: t("form.subjectLabel"),
      type: "select",
      options: t.raw("form.subjectOptions"),
    },
    {
      id: "message",
      label: t("form.messageLabel"),
      type: "textarea",
      placeholder: t("form.messagePlaceholder"),
      rows: 5,
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.messageKey || "form.error_server");
      }

      toast.success(t(result.messageKey || "form.success"));
      event.target.reset();
    } catch (error) {
      toast.error(t(error.message || "form.error_server"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <form onSubmit={handleSubmit} className="space-y-6">
        {formFields.map((field) => (
          <div key={field.id}>
            <label
              className="block text-sm font-medium pb-2 text-gray-700 dark:text-gray-300"
              htmlFor={field.id}
            >
              {field.label}
            </label>

            {field.type === "textarea" ? (
              <textarea
                id={field.id}
                name={field.id}
                placeholder={field.placeholder}
                rows={field.rows}
                className="form-textarea w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-primary focus:border-primary p-4 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors shadow-sm"
                required
              />
            ) : field.type === "select" ? (
              <select
                id={field.id}
                name={field.id}
                className="form-select w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-primary focus:border-primary h-12 px-4 appearance-none transition-colors shadow-sm"
                required
              >
                {field.options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                placeholder={field.placeholder}
                className="form-input w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-primary focus:border-primary h-12 px-4 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors shadow-sm"
                required
              />
            )}
          </div>
        ))}

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-base font-bold hover:bg-primary-dark transition-colors shadow-md disabled:opacity-50"
          >
            {loading ? t("form.loadingText") : t("form.submitButton")}
          </button>
        </div>

      </form>
    </div>
  );
}
