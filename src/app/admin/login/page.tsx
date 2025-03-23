"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  
    console.log("Login Result: ", result); // 👈 Log the result
  
    if (result?.error) {
      alert("Invalid email or password");
    } else {
      console.log("Pushing to dashboard...");
      window.location.href = "/admin/login/dashboard"; // Redirect to admin panel after login
    }
  };


  const [showPassword, setShowPassword] = useState(false);

  

  return (
    <div className="flex justify-center items-center h-screen b">
      <form onSubmit={handleSubmit} className="p-6 shadow-md rounded-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
        
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-2 focus:outline-blue-500"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-2 focus:outline-blue-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
}
