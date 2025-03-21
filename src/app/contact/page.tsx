"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [message, setMessage] = useState<string | null>(null);

  const access_key = process.env.NEXT_PUBLIC_WEB3_ACCESS_KEY;

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    if (access_key) {
      formData.append("access_key", access_key);
    } else {
      console.error("Access key is undefined");
    }

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);
    formData.append("subject", "New Contact Form Submission");


    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      setMessage("Your message has been sent successfully!");

      // Show success notification
      Swal.fire({
        title: "Success!",
        text: "Your message has been sent successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Reset form fields
      reset();
    } else {
      setMessage(`Failed to send message: ${result.message}`);

      // Show error notification
      Swal.fire({
        title: "Error!",
        text: "Failed to send message. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 my-5">
      <h1 className="text-2xl md:text-4xl font-bold my-10 text-center">
        Contact Us
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium dark:text-gray-500 text-gray-700">
            Name
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium dark:text-gray-500 text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium dark:text-gray-500 text-gray-700">
            Message
          </label>
          <textarea
            {...register("message", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            rows={4}
          />
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}
