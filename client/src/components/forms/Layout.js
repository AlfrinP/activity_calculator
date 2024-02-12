import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function Layout({ children }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (error) {
      setError("root", {
        message: "Error ! Please Try Again",
      });
    }
  };
  return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>;
}

export default Layout;
