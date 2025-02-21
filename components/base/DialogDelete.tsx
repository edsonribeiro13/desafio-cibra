import React from "react";
import {
  AlertDialog,
} from "radix-ui";

interface DeleteConfirmationDialogProps {
  text: string;
  onConfirm: () => void;
  setDialogOpen: (state: boolean) => void;
  isDialogOpen: boolean;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({ 
  text, 
  onConfirm, 
  setDialogOpen, 
  isDialogOpen 
}) => {
  return (
    <AlertDialog.Root open={isDialogOpen}>
      <AlertDialog.Trigger />
      <AlertDialog.Overlay 
            className="fixed inset-0 bg-black opacity-50" 
            onClick={() => setDialogOpen(false)}
        />
      <AlertDialog.Content className="text-black fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
      bg-white p-6 rounded-lg shadow-lg">
          <AlertDialog.Title>Confirmação</AlertDialog.Title>
          <AlertDialog.Description className="text-l font-bold">
            {text}
          </AlertDialog.Description>
          <div className="flex gap-6 py-2">
            <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
            <AlertDialog.Action className="text-red-500 border border-red-500 p-1" onClick={onConfirm}>Excluir</AlertDialog.Action>
          </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteConfirmationDialog;
