import z from "zod";

const maxFileSize = 1024 * 1024 * 5; // 5MB
const acceptedImageTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

export const registerSchema = z.object({
  username: z.string().min(2, "Campo nome deve conter pelo menos 2 dígitos"),
  perfilImg: z
    .any()
    .refine((files: Array<File>) => {
      if (files.length === 0) {
        return false;
      }
      return files[0]?.size >= maxFileSize;
    }, `Tamanho máximo do arquivo é de 5MB.`)
    .refine((file: Array<File>) => {
      if (file.length === 0) {
        return false;
      }
      return acceptedImageTypes.includes(file[0]?.type);
    }, "Somente os formatos .jpg, .jpeg, .png e .webp são suportados"),
    coverImg: z.any().optional(),
  displayImg: z
    .any()
    .refine((files: Array<File>) => {
      if (files.length === 0) {
        return false;
      }
      return !files?.find((img) => {
        return img.size >= maxFileSize;
      });
    }, `Tamanho máximo do arquivo é de 5MB.`)
    .refine((files: Array<File>) => {
      if (files.length === 0) {
        return false;
      }
      return acceptedImageTypes.includes(files[0]?.type);
    }, "Somente os formatos .jpg, .jpeg, .png e .webp são suportados"),
  telegramVip: z.string().min(2, "Só aceitamos links do telegram"),
  telegramFree: z.string().min(2, "Só aceitamos links do telegram"),
  description: z
    .string()
    .min(10, "Descrição deve conter pelo menos 10 caracteres"),
});
