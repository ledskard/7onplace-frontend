import { CardModelContentDiv } from "./card-model-content-div";
import { CardModelDelete } from "./card-model-delete";
import { CardModelActions } from "./card-model-actions";
import { CardModelFavorite } from "./card-model-favorite";
import { CardModelImage } from "./card-model-img";
import { CardModelName } from "./card-model-name";
import { CardModelRoot } from "./card-model-root";
import { CardModelEdit } from "./card-model-edit-manual";

export const Card = {
  Root: CardModelRoot,
  Img: CardModelImage,
  Name: CardModelName,
  Fav: CardModelFavorite,
  ContentDiv: CardModelContentDiv,
  Delete: CardModelDelete,
  Edit: CardModelEdit,
  Actions: CardModelActions,
};
