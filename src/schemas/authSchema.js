import { z } from "zod"; //z me permite dar tipos de datos

export const registerSchema = z.object({ //ya que el req.body es un objeto, esto sirve para validar el registro
  username: z.string({
    required_error: "Username is required",
  }),

  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});

export const loginSchema = z.object({
  email: z.string({
    required_error: "Email is required",
  }).email({
    message: "Invalid email",
  }),
  password: z.string({
    required_error: "Password is required",
  }).min(6, {
    message: "Password must be at least 6 characters",
  }),
});