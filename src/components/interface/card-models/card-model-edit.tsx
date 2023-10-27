"use client";
import { toast } from "@/components/ui/use-toast";
import { Pencil, XCircleIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ComponentProps, useState } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import { EditModalContainer } from "../modal/edit-modal-container";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ModelsFilterProps } from "@/types/model/models-filter-props";
import { delayLoadingAsyncRandom } from "@/utils/delay-loading-async-random";
import { Form } from "../form-default";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlexDiv } from "../flex-div";
import Image from "next/image";
import { FormError } from "../form-default/form-error";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GridCol } from "../grid-col";

type CardModelsRootProps = ComponentProps<"button"> & {
  model: ModelsFilterProps;
};

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

export const CardModelEdit = ({
  className,
  model,
  ...props
}: CardModelsRootProps) => {
  const [perfilImage, setPerfilImage] = useState<Base64Img | null>(null);

  const [displayImages, setDisplayImages] = useState<Array<Base64Img>>([]);

  const [genderData, setGenderData] = useState<string | null>(model.gender);

  const gender = ["mulheres", "casais", "trans", "homens"];

  const editModelSchema = z.object({
    username: z.string().min(2, "Campo nome deve conter pelo menos 2 dígitos"),

    profileImg: z
      .any()
      .optional()
      .refine((files: Array<File>) => {
        const fileIsExists = files.length > 0;

        if (!fileIsExists) {
          setPerfilImage(null);

          return false;
        }

        return fileIsExists;
      }, "A modelo deve ter uma foto de perfil própria")
      .optional()
      .refine((files: Array<File>) => {
        const fileIsExists = files.length > 0;

        if (!fileIsExists) return false;

        const file = files[0];

        return file.size <= maxFileSize; // Max file size is 10MB
      }, "Tamanho máximo do arquivo é de 10MB")
      .optional()
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
      .optional()
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
        console.log(filesArray);

        const filesIsExists = filesArray.length > 0;
        console.log(filesIsExists);
        if (!filesIsExists) return false;

        const isAllFilesLessThanMaxSize = filesArray.every(
          (file: File) => file.size <= maxFileSize
        );
        console.log(isAllFilesLessThanMaxSize);
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
    instagram: z.string().optional(),
    telegramVip: z.string().optional(),

    telegramFree: z.string().optional(),

    description: z.string().optional(),
  });

  type EditModelProps = z.infer<typeof editModelSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditModelProps>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      description: model.description,
      images: model.images,
      instagram: model.instagram,
      profileImg: model.profileImage.url,
      telegramFree: model.telegramFree,
      telegramVip: model.telegramVip,
      username: model.username,
    },
    resolver: zodResolver(editModelSchema),
  });

  const handleUpdateInfoModel = async (data: EditModelProps) => {
    const dataZod = editModelSchema.parse(data);
    console.log(dataZod);

    const modelData = {
      ...dataZod,
      profileImg: perfilImage,
      images: displayImages,
      type: genderData,
    };
    console.log(modelData);

    if (genderData === null) {
      return toast({
        title:
          "❌ Não foi possível atualizar a modelo! <br /> Campo gênero inválido...",
        duration: 3000,
      });
    }
  };

  const handleDeleteImage = (name: string) => {
    setDisplayImages((prev) => prev.filter((img) => img.name !== name));
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button
            className={twMerge(
              "flex text-red-main bg-white shadow rounded-full w-8 h-8 justify-center items-center p-2 hover:bg-red-main hover:text-white duration-300 cursor-pointer",
              className
            )}
            {...props}
          >
            <Pencil />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-5xl">
          <DialogHeader>
            <DialogTitle>Editar Modelo</DialogTitle>
          </DialogHeader>
          <Form.Root onSubmit={handleSubmit(handleUpdateInfoModel)}>
            <ScrollArea className="w-full max-h-[80vh] pr-3">
              <FlexDiv col>
                <FlexDiv className="w-full">
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
                      <FormError>
                        {errors.profileImg.message?.toString()}
                      </FormError>
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
                  <SelectTrigger value={model.gender ?? "Gênero"}>
                    <SelectValue
                      placeholder="Gênero"
                      className="text-gray-300"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <ScrollArea className="w-full h-32 pr-3">
                      {gender.map((gen) => (
                        <SelectItem
                          className="capitalize"
                          key={gen}
                          value={gen}
                        >
                          {gen}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
                {/* 
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
      </Select> */}

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

                <Form.Area
                  register={register}
                  id="description"
                  error={!!errors.description}
                  helperText={
                    errors.description && errors.description.message?.toString()
                  }
                  placeholder="Descrição da modelo"
                  defaultValue={model.description}
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
              </FlexDiv>
            </ScrollArea>
            <DialogFooter className="gap-3">
              <DialogClose className="text-slate-950">Cancelar</DialogClose>
              <Button
                className="max-w-fit px-4 py-3 items-center flex justify-center"
                type="submit"
              >
                {isSubmitting ? "Salvando..." : "Salvar alterações"}
              </Button>
            </DialogFooter>
          </Form.Root>
        </DialogContent>
      </Dialog>
    </>
  );
};
