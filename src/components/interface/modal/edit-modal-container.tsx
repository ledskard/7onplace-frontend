import { Modal } from "./index";

type EditModalContainerProps = {
  isOpenModal: boolean;
  modelId: string;
  handleModal: () => void;
};

export const EditModalContainer = ({
  isOpenModal,
  modelId,
  handleModal,
}: EditModalContainerProps) => {
  return (
    <Modal.Root isOpenModal={isOpenModal}>
      <div>Teste</div>
    </Modal.Root>
  );
};
