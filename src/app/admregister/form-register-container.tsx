"use client";
import { FlexDiv } from "@/components/interface/flex-div";
import { Form } from "@/components/interface/form-default";
import { FormError } from "@/components/interface/form-default/form-error";
import { GridCol } from "@/components/interface/grid-col";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

import Image from "next/image";
import { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { location } from "../config/location";
import { XCircleIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const maxFileSize = 1024 * 1024 * 10; // 10MB

const acceptedImageTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

type Base64Img = {
  name: string;
  base64: string;
};

export const FormRegisterContainer = () => {
  const [locationData, setLocationData] = useState<string | null>(null);
  const [perfilImage, setPerfilImage] = useState<Base64Img | null>(null);

  const [displayImages, setDisplayImages] = useState<Array<Base64Img>>([]);

  const [genderData, setGenderData] = useState<string | null>(null);

  const gender = ["mulheres", "casais", "trans"];

  const registerSchema = z.object({
    username: z.string().min(2, "Campo nome deve conter pelo menos 2 dígitos"),

    profileImg: z
      .any()
      .refine((files: Array<File>) => {
        const fileIsExists = files.length > 0;

        if (!fileIsExists) {
          setPerfilImage(null);

          return false;
        }

        return fileIsExists;
      }, "A modelo deve ter uma foto de perfil própria")
      .refine((files: Array<File>) => {
        const fileIsExists = files.length > 0;

        if (!fileIsExists) return false;

        const file = files[0];

        return file.size <= maxFileSize; // Max file size is 10MB
      }, "Tamanho máximo do arquivo é de 10MB")
      .refine((files: Array<File>) => {
        const file = files[0];

        const isCorrectlyType = acceptedImageTypes.includes(file?.type);

        if (!isCorrectlyType) return false;

        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageConvertBase64 = e.target?.result as string;

            const nameUnique = `${file.name}-${Date.now()}`;

            setPerfilImage({
              name: nameUnique.toString(),
              base64: imageConvertBase64,
            });
          };

          reader.readAsDataURL(file);
        }

        return true;
      }, "Somente os formatos .jpg, .jpeg, .png e .webp são suportados"),

    images: z
      .any()
      .refine((files: Array<File>) => {
        const fileIsExists = files.length > 0;

        if (!fileIsExists) {
          setDisplayImages([]);

          return false;
        }

        return fileIsExists;
      }, "A modelo deve ter pelo menos uma foto de pré visualização")
      .refine((files: Record<string, File>) => {
        const filesArray = Object.keys(files).map((key: any) => {
          return files[key];
        });

        const filesIsExists = filesArray.length > 0;

        if (!filesIsExists) return false;

        const isAllFilesLessThanMaxSize = filesArray.every(
          (file: File) => file.size <= maxFileSize
        );

        if (!isAllFilesLessThanMaxSize) return false;

        return true;
      }, "Tamanho máximo do arquivo é de 10MB")
      .refine((files: Record<string, File>) => {
        const filesArray = Object.keys(files).map((key: any) => {
          return files[key];
        });

        const filesIsExists = filesArray.length > 0;

        if (!filesIsExists) return false;

        const isAllFilesCorrectlyType = filesArray.every((file: File) =>
          acceptedImageTypes.includes(file?.type)
        );

        if (!isAllFilesCorrectlyType) return false;

        for (let i = 0; i < filesArray.length; i++) {
          const file = filesArray[i];
          const reader = new FileReader();

          reader.readAsDataURL(file);

          reader.onload = (e) => {
            const isExist = displayImages.some((img) => {
              return img.base64 === (reader?.result as string);
            });

            if (isExist) {
              return setDisplayImages((prev) => [...prev]);
            }

            const imageConvertBase64 = e.target?.result as string;

            const nameUnique = `${file.name}-${Date.now()}`;

            setDisplayImages((prev) => [
              ...prev,
              {
                name: nameUnique,
                base64: imageConvertBase64,
              },
            ]);
          };
        }

        return true;
      }, "Somente os formatos .jpg, .jpeg, .png e .webp são suportados"),

    telegramVip: z
      .string()
      .regex(/https:\/\/t\.me\/\+?\w+/, "Só aceitamos links do telegram"),

    telegramFree: z
      .string()
      .regex(/https:\/\/t\.me\/\+?\w+/, "Só aceitamos links do telegram"),

    description: z
      .string()
      .min(10, "Descrição deve conter pelo menos 10 caracteres"),
  });

  type RegisterModelProps = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterModelProps>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(registerSchema),
  });

  const handleDeleteImage = (name: string) => {
    setDisplayImages((prev) => prev.filter((img) => img.name !== name));
  };

  const handleCreateModel = async (data: RegisterModelProps) => {
    const dataZod = registerSchema.parse(data);

    const modelData = {
      ...dataZod,
      profileImg: perfilImage,
      images: displayImages,
      location: locationData,
      type: genderData,
      likes: 1,
    };

    const res = await fetch(`https://api.bioup.ai/models`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modelData),
    });

    const result = await res.json();

    if (result.success) {
      reset();
      toast({
        title: "✅ Modelo cadastrada no sistema da 7OnSexy!",
        duration: 3000,
      });
      setDisplayImages([]);
      setPerfilImage(null);
      setLocationData(null);
      setGenderData(null);
      return;
    }
    toast({
      title: "❌ Modelo não cadastrada no sistema da 7OnSexy!",
      duration: 3000,
    });
    return;
  };

  return (
    <Form.Root
      className="mt-6 sm:mt-4"
      onSubmit={handleSubmit(handleCreateModel)}
    >
      <FlexDiv className="w-full ">
        <Image
          src={perfilImage?.base64 ?? "/default-profile.jpg"}
          alt="Perfil Image"
          width={200}
          height={200}
          className="w-10 h-10 rounded-full object-cover object-center"
        />

        <FlexDiv col className="flex-1">
          <label
            htmlFor="profileImg"
            className="text-center first-letter:capitalize rounded font-medium py-2 px-1 md:rounded-md bg-red-main text-white w-full"
          >
            Adicionar imagem de perfil
          </label>
          <input
            className="hidden"
            type="file"
            accept="image/png, image/jpeg, image/webp, image/jpg"
            id="profileImg"
            {...register("profileImg")}
          />
          {errors.profileImg && (
            <FormError>{errors.profileImg.message?.toString()}</FormError>
          )}
        </FlexDiv>
      </FlexDiv>
      <Form.Input
        wf
        id="username"
        placeholder="Nome"
        helperText={errors.username?.message?.toString()}
        success={!errors.username}
        error={!!errors.username}
        register={register}
      />

      <Select onValueChange={setGenderData}>
        <SelectTrigger>
          <SelectValue placeholder="Gênero" className="text-gray-300" />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="w-full h-24 pr-3">
            {gender.map((gen) => (
              <SelectItem className="capitalize" key={gen} value={gen}>
                {gen}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>

      <Select onValueChange={setLocationData}>
        <SelectTrigger>
          <SelectValue placeholder="Localização" className="text-gray-300" />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="w-full h-36 pr-3">
            {location.map((loc) => (
              <SelectItem className="capitalize" key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>

      <Form.Input
        wf
        id="telegramVip"
        placeholder="Link telegram VIP"
        helperText={errors.telegramVip?.message?.toString()}
        success={!errors.telegramVip}
        error={!!errors.telegramVip}
        register={register}
      />

      <Form.Input
        wf
        id="telegramFree"
        placeholder="Link telegram FREE"
        helperText={errors.telegramFree?.message?.toString()}
        success={!errors.telegramFree}
        error={!!errors.telegramFree}
        register={register}
      />

      <Form.Area
        register={register}
        id="description"
        error={!!errors.description}
        helperText={
          errors.description && errors.description.message?.toString()
        }
        placeholder="Descrição da modelo"
        rows={6}
        cols={50}
      />

      <label
        htmlFor="images"
        className="text-center first-letter:capitalize rounded font-medium py-2 px-1 md:rounded-md bg-red-main text-white w-full m-0"
      >
        Adicionar imagem de pré visualização
      </label>
      <GridCol col="1" className="md:grid-cols-2 mt-0 mb-0">
        {displayImages?.length > 0 &&
          displayImages?.map((img) => (
            <div
              key={img.name}
              className="relative p-2 h-full flex items-center justify-center"
            >
              <button
                className="absolute top-1 right-1"
                onClick={() => handleDeleteImage(img.name)}
              >
                <XCircleIcon />
              </button>
              <Image
                className="p-4 rounded md:rounded-md w-full sm:max-w-[300px] sm:max-h-[300px] max-w-[200px] text-center max-h-[200px] object-cover object-center"
                src={img.base64}
                width={400}
                height={400}
                alt={img.name}
              />
            </div>
          ))}
      </GridCol>
      <Form.Input
        wf
        className="hidden p-0 m-0"
        type="file"
        multiple
        accept="image/png, image/jpeg, image/webp, image/jpg"
        success={!errors.images}
        error={!!errors.images}
        helperText={errors.images?.message?.toString()}
        id="images"
        register={register}
      />

      <Button
        className="max-w-[50%] first-letter:capitalize lowercase mb-10 md:max-w-[40%] relative bottom-12"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Perfil sendo criado..." : "Criar perfil"}
      </Button>
    </Form.Root>
  );
};
