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

const maxFileSize = 1024 * 1024 * 10; // 10MB
const acceptedImageTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const FormRegisterContainer = () => {
  const [locationData, setLocationData] = useState<string | null>(null);
  const [perfilImage, setPerfilImage] = useState<string>(
    "/default-profile.jpg"
  );
  const [displayImages, setDisplayImages] = useState<string[]>([]);
  const [genderData, setGenderData] = useState<string | null>(null);

  const gender = ["mulheres", "casais", "trans"];
  const location = [
    "Acre - AC",
    "Alagoas - AL",
    "Amapá - AP",
    "Amazonas - AM",
    "Bahia - BA",
    "Ceará - CE",
    "Espírito Santo - ES",
    "Goiás - GO",
    "Maranhão - MA",
    "Mato Grosso - MT",
    "Mato Grosso do Sul - MS",
    "Minas Gerais - MG",
    "Pará - PA",
    "Paraíba - PB",
    "Paraná - PR",
    "Pernambuco - PE",
    "Piauí - PI",
    "Rio de Janeiro - RJ",
    "Rio Grande do Norte - RN",
    "Rio Grande do Sul - RS",
    "Rondônia - RO",
    "Roraima - RR",
    "Santa Catarina - SC",
    "São Paulo - SP",
    "Sergipe - SE",
    "Tocantins - TO",
    "Distrito Federal - DF",
  ];

  const registerSchema = z.object({
    username: z.string().min(2, "Campo nome deve conter pelo menos 2 dígitos"),
    perfilImg: z
      .any()
      .refine((files: Array<File>) => {
        handleFileChange(files, "single");
        if (files.length === 0) {
          return false;
        }
        return files[0]?.size <= maxFileSize;
      }, `Tamanho máximo do arquivo é de 5MB.`)
      .refine((file: Array<File>) => {
        if (file.length === 0) {
          return false;
        }
        return acceptedImageTypes.includes(file[0]?.type);
      }, "Somente os formatos .jpg, .jpeg, .png e .webp são suportados"),
    displayImg: z
      .any()
      .refine((files: Array<File>) => {
        handleFileChange(files, "multiple");
        if (files.length === 0) {
          return false;
        }
        return !files?.find((img) => {
          return img.size >= maxFileSize;
        });
      }, `Tamanho máximo do arquivo é de 5MB.`)
      .refine((files: Array<File>) => {
        console.log(files);
        if (files.length === 0) {
          return false;
        }
        return acceptedImageTypes.includes(files[0]?.type);
      }, "Somente os formatos .jpg, .jpeg, .png e .webp são suportados"),
    telegramVip: z
      .string()
      .regex(/https:\/\/t\.me\/\+\w+/, "Só aceitamos links do telegram"),
    telegramFree: z
      .string()
      .regex(/https:\/\/t\.me\/\+\w+/, "Só aceitamos links do telegram"),
    description: z
      .string()
      .min(10, "Descrição deve conter pelo menos 10 caracteres"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    reset,
  } = useForm<any>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(registerSchema),
  });

  const handleCreateModel = (data: any) => {
    const modelData = {
      ...data,
      location: locationData,
      gender: genderData,
      likes: 1,
    };
    console.log(modelData);
  };

  const handleFileChange = (
    files: Array<File>,
    type: "single" | "multiple"
  ) => {
    if (type === "single") {
      const file = files && files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setPerfilImage(e.target?.result as string);
        reader.readAsDataURL(file);
      }
    } else {
      if (files) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const reader = new FileReader();
          reader.onload = (e) =>
            setDisplayImages((prev) => {
              return [...prev, e.target?.result as string];
            });
          reader.readAsDataURL(file);
        }
      }
    }
    return files;
  };

  return (
    <Form.Root
      className="mt-6 sm:mt-4"
      onSubmit={handleSubmit(handleCreateModel)}
    >
      <FlexDiv className="w-full mb-6">
        {perfilImage && (
          <Image
            src={perfilImage}
            alt="Perfil Image"
            width={200}
            height={200}
            className="w-10 h-10 rounded-full object-cover object-center"
          />
        )}
        <FlexDiv col className="flex-1">
          <label
            htmlFor="perfilImg"
            className="text-center first-letter:capitalize rounded font-medium py-2 px-1 md:rounded-md bg-red-main text-white w-full"
          >
            Adicionar imagem de perfil
          </label>
          <input
            className="hidden"
            type="file"
            accept="image/png, image/jpeg, image/webp, image/jpg"
            id="perfilImg"
            {...register("perfilImg")}
          />
          {errors.perfilImg && (
            <FormError>{errors.perfilImg.message?.toString()}</FormError>
          )}
        </FlexDiv>
      </FlexDiv>
      <Form.Input
        wf
        id="username"
        placeholder="Nome"
        helperText={errors.name?.message?.toString()}
        success={errors.name ? false : true}
        error={errors.name ? true : false}
        register={register}
        className="w-full"
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
        success={errors.telegramVip ? false : true}
        error={errors.telegramVip ? true : false}
        register={register}
        className="w-full"
      />

      <Form.Input
        wf
        id="telegramFree"
        placeholder="Link telegram FREE"
        helperText={errors.telegramFree?.message?.toString()}
        success={errors.telegramFree ? false : true}
        error={errors.telegramFree ? true : false}
        register={register}
        className="w-full"
      />

      <Form.Area
        register={register}
        id="description"
        error={errors.description ? true : false}
        helperText={
          errors.description && errors.description.message?.toString()
        }
        placeholder="Descrição da modelo"
        rows={6}
        cols={50}
      />

      <label
        htmlFor="displayImg"
        className="text-center first-letter:capitalize rounded font-medium py-2 px-1 md:rounded-md bg-red-main text-white w-full m-0"
      >
        Adicionar imagem de pré visualização
      </label>
      <GridCol col="1" className="md:grid-cols-2 mt-0 mb-0">
        {displayImages?.length > 0 &&
          displayImages?.map((img) => (
            <Image
              className="p-2 rounded md:rounded-md w-full object-cover object-center"
              key={img}
              src={img}
              width={400}
              height={400}
              alt={img}
            />
          ))}
      </GridCol>
      <Form.Input
        className="hidden p-0 m-0"
        type="file"
        multiple
        accept="image/png, image/jpeg, image/webp, image/jpg"
        success={errors.perfilImg ? false : true}
        error={errors.perfilImg ? true : false}
        helperText={errors.perfilImg?.message?.toString()}
        id="displayImg"
        register={register}
      />

      <Button
        className="max-w-[70%] first-letter:capitalize lowercase md:max-w-[40%]"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitSuccessful
          ? "Perfil criado"
          : isSubmitting
          ? "Perfil sendo criado..."
          : "Criar perfil"}
      </Button>
    </Form.Root>
  );
};
