import React from "react";
import {
  AlertDialog,
} from "radix-ui";

interface DeleteConfirmationDialogProps {
  text: string;
  titulo: string;
  setDialogOpen: (state: boolean) => void;
  isDialogOpen: boolean;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({ 
  titulo,
  text,
  setDialogOpen, 
  isDialogOpen 
}) => {
  return (
    <AlertDialog.Root open={isDialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialog.Trigger />
        <AlertDialog.Overlay 
            className="fixed inset-0 bg-black opacity-50" 
            onClick={() => setDialogOpen(false)}
        />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
          <AlertDialog.Title className="text-xl font-bold">{titulo}</AlertDialog.Title>
          <AlertDialog.Description className="mt-2">
            {text}
          </AlertDialog.Description>
        </AlertDialog.Content>
      </AlertDialog.Root>
  );
};

export default DeleteConfirmationDialog;
