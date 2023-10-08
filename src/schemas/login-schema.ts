import z from "zod";

export const admLoginSchema = z.object({
  username: z
    .string()
    .min(6, "Campo nome de usuário deve conter pelo menos 6 dígitos"),
  password: z
    .string()
    .min(8, "Campo senha deve conter pelo menos 8 dígitos")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
      "Campo senha deve conter 1 letra maiúscula, 1 minúscula e 1 caractere especial"
    ),
});
