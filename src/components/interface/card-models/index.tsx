import { CardModelActions } from "./card-model-actions";
import { CardModelContentDiv } from "./card-model-content-div";
import { CardModelDelete } from "./card-model-delete";
import { CardModelEdit } from "./card-model-edit-manual";
import { CardModelFavorite } from "./card-model-favorite";
import { CardModelImage } from "./card-model-img";
import { CardModelLoading } from "./card-model-loading";
import { CardModelName } from "./card-model-name";
import { CardModelPremium } from "./card-model-premium";
import { CardModelRoot } from "./card-model-root";

export const Card = {
  Root: CardModelRoot,
  Img: CardModelImage,
  Name: CardModelName,
  Fav: CardModelFavorite,
  ContentDiv: CardModelContentDiv,
  Delete: CardModelDelete,
  Edit: CardModelEdit,
  Actions: CardModelActions,
  Loading: CardModelLoading,
  Premium: CardModelPremium,
};
