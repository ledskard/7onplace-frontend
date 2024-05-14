"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { FlexDiv } from "@/components/interface/flex-div";
import { Form } from "@/components/interface/form-default";
import { FormError } from "@/components/interface/form-default/form-error";
import { GridCol } from "@/components/interface/grid-col";
import { Button } from "@/components/ui/button-main";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { XCircleIcon } from "lucide-react";
import z from "zod";

import { location } from "../config/location";

const maxFileSize = 1024 * 1024 * 10; // 10MB

const acceptedImageTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

type Base64Img = {
  name: string;
  base64: string;
};

export const FormRegisterContainer = () => {
  const { data: session } = useSession();

  const [locationData, setLocationData] = useState<string | null>(null);
  const [perfilImage, setPerfilImage] = useState<Base64Img | null>(null);

  const [displayImages, setDisplayImages] = useState<Array<Base64Img>>([]);

  const [genderData, setGenderData] = useState<string | null>(null);

  const gender = ["mulheres", "casais", "trans", "homens"];
  const [coverImage, setCoverImage] = useState<Base64Img | null>(null);
  const handleDeleteCoverImage = () => {
    setCoverImage(null);
  };
  // Função para manipular a mudança no input da capa
  const handleCoverImageChange = (event: any) => {
    const file = event.target.files?.[0];

    if (file && acceptedImageTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageBase64 = e.target?.result as string;
        const nameUnique = `${file.name}-${Date.now()}`;

        setCoverImage({
          name: nameUnique,
          base64: imageBase64,
        });
      };

      reader.readAsDataURL(file);
    }
  };
  const registerSchema = z.object({
    username: z.string().min(2, "Campo nome deve conter pelo menos 2 dígitos"),

    email: z.string().optional(),
    gender: z.any().optional(),
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
          (file: File) => file.size <= maxFileSize,
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
          acceptedImageTypes.includes(file?.type),
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

    instagram: z.string().optional(),

    telegramVip: z.string().min(1, "Campo Telegram VIP não pode estar vazio"),

    telegramFree: z.string().min(1, "Campo Telegram FREE não pode estar vazio"),

    twitter: z.string().optional(),

    tiktok: z.string().optional(),

    description: z.string().optional(),
  });

  type RegisterModelProps = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control, // Adicione 'control' aqui
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
      coverImg: coverImage,
      images: displayImages,
      type: genderData,
      likes: 1,
    };
    delete modelData.gender;
    const res = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/models`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.token}`,
      },
      body: JSON.stringify(modelData),
    });

    const result = await res.json();

    if (result.status === 401) {
      signOut();
    }
    if (result.success) {
      reset();
      toast({
        title: "✅ Modelo cadastrada no sistema da 7OnSexy!",
        duration: 3000,
      });
      setDisplayImages([]);
      setPerfilImage(null);
      setCoverImage(null);
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
      className="m-auto py-8"
      onSubmit={handleSubmit(handleCreateModel)}
    >
      <FlexDiv className="w-full ">
        <Image
          src={perfilImage?.base64 ?? "/default-profile.jpg"}
          alt="Perfil Image"
          width={200}
          height={200}
          className="mt-10 w-10 h-10 rounded-full object-cover object-center"
        />

        <FlexDiv col className="flex-1">
          <label
            htmlFor="profileImg"
            className="mt-10 text-center first-letter:capitalize rounded font-medium py-2 px-1 md:rounded-md bg-red-main text-white w-full"
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
      <Form.Input
        wf
        id="email"
        placeholder="E-mail"
        helperText={errors.email?.message?.toString()}
        success={!errors.email}
        error={!!errors.email}
        register={register}
      />
      <Controller
        name="gender"
        control={control} // Garanta que está desestruturando 'control' do useForm
        defaultValue="" // Valor padrão para `gender`, ajuste conforme necessário
        render={({ field }) => (
          <Select
            {...field}
            onValueChange={(value) => {
              field.onChange(value);
              setGenderData(value); // Se ainda precisar atualizar o estado externamente
            }}
            value={field.value}
          >
            <SelectTrigger value={genderData ?? "Gênero"}>
              <SelectValue placeholder="Gênero" className="text-gray-300" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="w-full h-32 pr-3">
                {gender.map((gen) => (
                  <SelectItem className="capitalize" key={gen} value={gen}>
                    {gen}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
        )}
      />

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

      <Form.Input
        wf
        id="instagram"
        placeholder="Link Instagram"
        register={register}
      />
      <Form.Input
        wf
        id="twitter"
        placeholder="Link Twitter"
        register={register}
      />
      <Form.Input
        wf
        id="tiktok"
        placeholder="Link TikTok"
        register={register}
      />

      <label
        htmlFor="images"
        className="text-center first-letter:capitalize rounded font-medium py-2 px-1 md:rounded-md bg-red-main text-white w-full m-0"
      >
        Adicionar imagem de pré visualização
      </label>
      {displayImages?.length > 0 && (
        <GridCol col="1" className="md:grid-cols-2 mt-0 mb-0">
          {displayImages?.map((img) => (
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
      )}
      <label
        htmlFor="coverImage"
        className="mt-4 text-center first-letter:capitalize rounded font-medium py-2 px-1 md:rounded-md bg-red-main text-white w-full"
      >
        Adicionar capa
      </label>
      <input
        className="hidden"
        type="file"
        accept="image/png, image/jpeg, image/webp, image/jpg, image/gif"
        id="coverImage"
        onChange={handleCoverImageChange}
      />

      {/* Pré-visualização da Capa */}
      {coverImage && (
        <div className="relative p-2 h-full flex items-center justify-center">
          <button
            className="absolute top-0 right-0 z-10 bg-transparent text-black rounded-full p-1"
            onClick={handleDeleteCoverImage}
            aria-label="Remover capa"
          >
            <XCircleIcon size={24} color="black" />
          </button>

          <Image
            className="rounded md:rounded-md object-cover object-center"
            src={coverImage.base64}
            alt="Capa"
            width={400}
            height={400}
          />
        </div>
      )}
      <Form.Input
        wf
        invisible
        className="hidden p-0 m-0"
        type="file"
        multiple
        accept="image/png, image/jpeg, image/webp, image/jpg, image/gif"
        success={!errors.images}
        error={!!errors.images}
        helperText={errors.images?.message?.toString()}
        id="images"
        register={register}
      />
      {errors.images && (
        <FormError>{errors.images?.message?.toString()}</FormError>
      )}

      <Button
        className="max-w-[50%] first-letter:capitalize lowercase md:max-w-[40%]"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Perfil sendo criado..." : "Criar perfil"}
      </Button>
    </Form.Root>
  );
};
