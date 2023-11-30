import { imgLoading } from "./card-model-base64-img-loading";
import { Card } from "./index";

export const CardModelLoading = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 10 }).map((_, index) => (
        <Card.Root key={index} className="animate-pulse bg-gray-300">
          <Card.ContentDiv>
            <Card.Name>Carregando...</Card.Name>
            <Card.Fav favorites={1} modelName="000000" />
          </Card.ContentDiv>
        </Card.Root>
      ))}
    </div>
  );
};
