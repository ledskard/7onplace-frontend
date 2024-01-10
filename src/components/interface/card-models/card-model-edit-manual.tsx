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
  "image/gif",
];

export const CardModelEdit = ({
  className,
  model,
  ...props
}: CardModelsRootProps) => {
  const { data: session } = useSession();

  const route = useRouter();

  const [perfilImage, setPerfilImage] = useState<any>({
    name: model.profileImage.name || "default-profile.jpg",
    url: model.profileImage.url || "/default-profile.jpg",
  });

  const [displayImages, setDisplayImages] = useState<any>(model.images || []);

  const [genderData, setGenderData] = useState<string | null>(model.type);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>(model.username || "");

  const [telegramVipLink, setTelegramVipLink] = useState<string>(
    model.telegramVip || ""
  );

  const [tiktokLink, setTiktokLink] = useState<string>(model.tiktok || "");

  const [twitterLink, setTwitterLink] = useState<string>(model.twitter || "");

  const [telegramFreeLink, setTelegramFreeLink] = useState<string>(
    model.telegramFree || ""
  );

  const [instagramLink, setInstagramLink] = useState<string>(
    model.instagram || ""
  );

  const [description, setDescription] = useState<string>(
    model.description || ""
  );
  const hasFeatureFlags = model.featureFlags && model.featureFlags.length > 0;

  const [isPro, setIsPro] = useState(hasFeatureFlags);

  const handleIsPro = async (e: any) => {
    const isChecked = e.target.checked;
    
    setIsPro(isChecked);

    let featureFlags:any = []

    if (!isChecked) {
        featureFlags = []
    }
    if(isChecked){
      featureFlags = [
        {id: 1,
          name: "enable_social_media",
          description: "Habilitar redes sociais"
        },
        {id: 2,
          name: "enable_star",
          description: "Estrela de modelo PRO"
        },
        {id: 3,
          name: "enable_create_button",
          description: "Habilitar botões"
        }
      ]
    }


      const res = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/models/${model.username}`, {
        body: JSON.stringify({featureFlags}),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token}`,
        },
        method: "PUT",
      });
  };

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
      };

      reader.readAsDataURL(file);
    }
  };

  const handleUpdateInfoModel = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const modelUpdated = {
      username: name,
      profileImg: perfilImage,
      description: description,
      telegramVip: telegramVipLink,
      telegramFree: telegramFreeLink,
      tiktok: tiktokLink,
      twitter: twitterLink,
      instagram: instagramLink,
      type: genderData,
      images: displayImages,
    };

    if (modelUpdated.profileImg.length === 0) {
      setIsLoading(false);
      return toast({
        title:
          "❌ Não foi possível atualizar a modelo! Campo imagem de perfil está sem uma imagem...",
        duration: 3000,
      });
    }

    if (modelUpdated.type === null) {
      setIsLoading(false);
      return toast({
        title:
          "❌ Não foi possível atualizar a modelo! Campo gênero inválido...",
        duration: 3000,
      });
    }
    if (
      modelUpdated.telegramVip === "" ||
      modelUpdated.telegramVip.length === 0
    ) {
      setIsLoading(false);
      return toast({
        title:
          "❌ Não foi possível atualizar a modelo! Campo telegram vip inválido...",
        duration: 3000,
      });
    }
    if (
      modelUpdated.telegramFree === "" ||
      modelUpdated.telegramFree.length === 0
    ) {
      setIsLoading(false);
      return toast({
        title:
          "❌ Não foi possível atualizar a modelo! Campo telegram free inválido...",
        duration: 3000,
      });
    }
    // if (modelUpdated.instagram === "" || modelUpdated.instagram.length === 0) {
    //   setIsLoading(false);
    //   return toast({
    //     title:
    //       "❌ Não foi possível atualizar a modelo! Campo instagram inválido...",
    //     duration: 3000,
    //   });
    // }
    // if (modelUpdated.tiktok === "" || modelUpdated.tiktok.length === 0) {
    //   setIsLoading(false);
    //   return toast({
    //     title:
    //       "❌ Não foi possível atualizar a modelo! Campo tiktok inválido...",
    //     duration: 3000,
    //   });
    // }
    // if (modelUpdated.twitter === "" || modelUpdated.twitter.length === 0) {
    //   setIsLoading(false);
    //   return toast({
    //     title:
    //       "❌ Não foi possível atualizar a modelo! Campo twitter inválido...",
    //     duration: 3000,
    //   });
    // // }
    // if (
    //   modelUpdated.description === "" ||
    //   modelUpdated.description.length === 0
    // ) {
    //   setIsLoading(false);
    //   return toast({
    //     title:
    //       "❌ Não foi possível atualizar a modelo! Campo descrição inválido...",
    //     duration: 3000,
    //   });
    // }

    if (displayImages.length === 0) {
      setIsLoading(false);
      return toast({
        title:
          "❌ Não foi possível atualizar a modelo! Campo imagens de pré visualizações está sem imagens...",
        duration: 3000,
      });
    }
    
    const res = await fetch(`https://api.bioup.ai/models/${model.username}`, {
      body: JSON.stringify(modelUpdated),
      headers: {
        "Content-Type": "application/json",
        Authorizathion: `Bearer ${session?.user.token}`,
      },
      method: "PUT",
    });

    const result = await res.json();

    if (result.id) {
      setIsLoading(false);
      toast({
        title: "✅ Modelo alterada(o) com sucesso!",
        duration: 3000,
      });
      return setTimeout(() => {
        route.push("/");
      }, 3000);
    }

    return toast({
      title: "❌ Não foi possível editar a modelo!",
      duration: 3000,
    });
  };

  const handleDeleteImage = (name: string) => {
    setDisplayImages((prev: any[]) => prev.filter((img) => img.name !== name));
  };

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
          <Form.Root onSubmit={handleUpdateInfoModel} className="mx-auto">
            <ScrollArea className="w-full max-h-[80vh] pr-3 overflow-y-auto">
              <FlexDiv col className="max-w-[90%] mx-auto px-2">
                <FlexDiv className="w-full md:flex-row flex-col">
                  <Image
                    src={
                      perfilImage?.url ??
                      perfilImage.base64 ??
                      "/default-profile.jpg"
                    }
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
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      checked={isPro}
                      onChange={handleIsPro}
                      className="mr-2 border-slate-200 rounded"
                    />
                    <label className="text-slate-950">Modelo PRO</label>
                  </div>
                </FlexDiv>
                <input
                  type="text"
                  placeholder="Nome da modelo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="outline-none border-b-2 px-2 py-1 md:p-3 drop-shadow-md disabled:bg-inherit border-slate-200 rounded md:rounded-lg placeholder:text-slate-400"
                />

                <Select onValueChange={setGenderData}>
                  <SelectTrigger value={model.type ?? "Gênero"}>
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

                <input
                  type="text"
                  placeholder="Link Twitter"
                  className="outline-none border-b-2 px-2 py-1 md:p-3 drop-shadow-md disabled:bg-inherit border-slate-200 rounded md:rounded-lg placeholder:text-slate-400"
                  value={twitterLink}
                  onChange={(e) => setTwitterLink(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Link Tiktok"
                  className="outline-none border-b-2 px-2 py-1 md:p-3 drop-shadow-md disabled:bg-inherit border-slate-200 rounded md:rounded-lg placeholder:text-slate-400"
                  value={tiktokLink}
                  onChange={(e) => setTiktokLink(e.target.value)}
                />

                <textarea
                  placeholder="Descrição da modelo"
                  defaultValue={model.description}
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <input
                  className="hidden"
                  type="file"
                  id="previewImages"
                  accept="image/png, image/jpeg, image/webp, image/jpg, image/gif"
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
                        key={img.name ?? img.base64}
                        className="relative p-2 h-full flex items-center justify-center m-2"
                      >
                        <button
                          className="absolute top-0 right-0"
                          onClick={() => handleDeleteImage(img.name)}
                        >
                          <XCircleIcon />
                        </button>
                        <Image
                          className="p-4 rounded md:rounded-md max-w-full max-h-full object-cover object-center"
                          src={img.url ?? img.base64}
                          width={400}
                          height={400}
                          alt={img.name}
                        />
                      </div>
                    ))}
                </GridCol>
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
