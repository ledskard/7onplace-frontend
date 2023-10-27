"use client";
import { toast } from "@/components/ui/use-toast";
import { Pencil, XCircleIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ComponentProps, useRef, useState } from "react";
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

// type Base64Img = {
//   name: string;
//   base64: string;
// };

export const CardModelEdit = ({
  className,
  model,
  ...props
}: CardModelsRootProps) => {
  const [perfilImage, setPerfilImage] = useState<any>({
    name: model.profileImage.name || 'default-profile.jpg',
    url: model.profileImage.url || '/default-profile.jpg'
  });

  const [displayImages, setDisplayImages] = useState<any>(model.images || []);

  const [genderData, setGenderData] = useState<string | null>(model.gender);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>(model.username || "");

  const [telegramVipLink, setTelegramVipLink] = useState<string>(model.telegramVip || "");

  const [telegramFreeLink, setTelegramFreeLink] = useState<string>(model.telegramFree || "");

  const [instagramLink, setInstagramLink] = useState<string>(model.instagram || "");

  const [description, setDescription] = useState<string>(
    model.description || ""
  );

  const gender = ["mulheres", "casais", "trans", "homens"];


  const handleSelectProfileImage = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64Image = e?.target?.result;
        setPerfilImage({
          name: file.name,
          base64: base64Image,
        });
      }

      reader.readAsDataURL(file);
    }
  };

  const handleUpdateInfoModel = async () => {
    // profileImg: verifica se o campo url dentro do profileImage começa com base64 (se começar é pq foi alterada a foto)
    // caso a foto tenha sido alterada ele passa o base64 no campo base64 pro backend, caso não, so passa o perfilimage nomarlmente
    const modelUpdated = {
      username: name,
      profileImg: perfilImage,
      description: description,
      telegramVip: telegramVipLink,
      telegramFree: telegramFreeLink,
      instagram: instagramLink,
      type: gender,
      images: displayImages
    }
    console.log(modelUpdated)
    //sendToBackend
    setIsLoading(true);
    if (genderData === null) {
      setIsLoading(false);
      return toast({
        title:
          "❌ Não foi possível atualizar a modelo! <br /> Campo gênero inválido...",
        duration: 3000,
      });
    }
  };

  const handleDeleteImage = (name: string) => {
    setDisplayImages((prev: any[]) => prev.filter((img) => img.name !== name));
  };
  // const handleAddPreviewImages = () => {
    // const input = document.getElementById("previewImages");
    // if (input) {
      // input.click();
    // }
  // };

  const handleSelectPreviewImages = (e: any) => {
    const files = e.target.files;
  
    if (files) {
      const newImages = Array.from(files);
      newImages.forEach((file: any) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const base64Image = e.target.result;
          setDisplayImages((prevImages: any) => [
            ...prevImages,
            {
              name: file.name,
              base64: base64Image,
            },
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
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
          <Form.Root onSubmit={handleUpdateInfoModel}>
            <ScrollArea className="w-full max-h-[80vh] pr-3">
              <FlexDiv col>
                <FlexDiv className="w-full">
                  <Image
                    src={perfilImage?.url ?? "/default-profile.jpg"}
                    alt="Perfil Image"
                    width={200}
                    height={200}
                    className="w-10 h-10 rounded-full object-cover object-center"
                  />
                  <input
                    className="hidden"
                    type="file"
                    accept="image/png, image/jpeg, image/webp, image/jpg"
                    id="profileImg"
                    onChange={handleSelectProfileImage}
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
                    />
                  </FlexDiv>
                </FlexDiv>
                <input
                  type="text"
                  placeholder="Nome da modelo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="outline-none border-b-2 px-2 py-1 md:p-3 drop-shadow-md disabled:bg-inherit border-slate-200 rounded md:rounded-lg placeholder:text-slate-400"
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


                <input
                  type="text"
                  placeholder="Link Telegram Vip"
                  className="outline-none border-b-2 px-2 py-1 md:p-3 drop-shadow-md disabled:bg-inherit border-slate-200 rounded md:rounded-lg placeholder:text-slate-400"
                  value={telegramVipLink}
                  onChange={(e) => setTelegramVipLink(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Link Telegram Free"
                  className="outline-none border-b-2 px-2 py-1 md:p-3 drop-shadow-md disabled:bg-inherit border-slate-200 rounded md:rounded-lg placeholder:text-slate-400"
                  value={telegramFreeLink}
                  onChange={(e) => setTelegramFreeLink(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Link Instagram"
                  className="outline-none border-b-2 px-2 py-1 md:p-3 drop-shadow-md disabled:bg-inherit border-slate-200 rounded md:rounded-lg placeholder:text-slate-400"
                  value={instagramLink}
                  onChange={(e) => setInstagramLink(e.target.value)}
                />

                <textarea
                  placeholder="Descrição da modelo"
                  defaultValue={model.description}
                  rows={6}
                  cols={50}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <input
                  className="hidden"
                  type="file"
                  id="previewImages"
                  accept="image/png, image/jpeg, image/webp, image/jpg"
                  multiple
                  onChange={handleSelectPreviewImages}
                />
                <label
                  htmlFor="previewImages"  
                  className="text-center first-letter:capitalize rounded font-medium py-2 px-1 md:rounded-md bg-red-main text-white w-full m-0 cursor-pointer" // Adicionei "cursor-pointer"
                >
                  Adicionar imagem de pré visualização
                </label>
                <GridCol col="1" className="md:grid-cols-2 mt-0 mb-0">
                  {displayImages?.length > 0 &&
                    displayImages?.map((img: any) => (
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
                          className="p-4 rounded md:rounded-md max-w-[300px] max-h-[300px] object-cover object-center"
                          src={img.url}
                          width={400}
                          height={400}
                          alt={img.name}
                        />
                      </div>
                    ))
                  }
                </GridCol>
                <input
                  type="text"
                  id="images"
                  className="hidden p-0 m-0 outline-none border-b-2 px-2 py-1 md:p-3 drop-shadow-md disabled:bg-inherit border-slate-200 rounded md:rounded-lg placeholder:text-slate-400"
                />
              </FlexDiv>
            </ScrollArea>
            <DialogFooter className="gap-3">
              <DialogClose className="text-slate-950">Cancelar</DialogClose>
              <Button
                className="max-w-fit px-4 py-3 items-center flex justify-center"
                type="submit"
              >
                {isLoading ? "Salvando..." : "Salvar alterações"}
              </Button>
            </DialogFooter>
          </Form.Root>
        </DialogContent>
      </Dialog>
    </>
  );
};
