import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../services/helper/redux";
import {
  addTrainer,
  updateTrainer,
} from "../store/slices/trainer.slice";
import { BUCKET_ID, ID, storage } from "../appwrite/appwriteConfig";

type AddTrainerDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editData?: any;
};

type FormData = {
  name: string;
  title: string;
  img?: FileList;
};
// ✅ Schema (FIXED for edit)
const schema: yup.ObjectSchema<FormData> = yup.object({
  name: yup.string().required("Name is required"),
  title: yup.string().required("Title is required"),
  img: yup
    .mixed<FileList>()
    .optional()
    .test(
      "fileRequired",
      "Image is required",
      function (value) {
        const { isEdit } = this.options.context as {
          isEdit: boolean;
        };

        if (isEdit) return true;

        return !!value && value.length > 0;
      }
    ),
});

const AddTrainerDialog: React.FC<AddTrainerDialogProps> = ({
  open,
  setOpen,
  editData,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.trainer);

  const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<FormData>({
  resolver: yupResolver(schema),
  context: { isEdit: !!editData },
});
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  //Set form values
  useEffect(() => {
    if (editData) {
      reset({
        name: editData.name,
        title: editData.title,
        img: undefined,
      });
      setPreview(editData.img);
    } else {
      reset({
        name: "",
        title: "",
        img: undefined,
      });
      setPreview(null);
    }
  }, [editData, reset]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
  try {
    let imageUrl = editData?.img || "";

    //Upload new image
    if (data.img && data.img[0]) {
      const file = data.img[0];

      const uploadRes = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        file
      );

      imageUrl = storage
  .getFileView(BUCKET_ID, uploadRes.$id)
  .toString();
    }

    const payload = {
      name: data.name,
      title: data.title,
      img: imageUrl,
    };

    if (editData) {
      await dispatch(
        updateTrainer({ id: editData.$id, data: payload })
      ).unwrap();

      toast.success("Trainer Updated!");
    } else {
      await dispatch(addTrainer(payload)).unwrap();

      toast.success("Trainer Added!");
    }

    reset();
    setPreview(null);
    handleClose();
  } catch (err) {
    console.error(err);
    toast.error("Operation failed");
  }
};

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {editData ? "Edit Trainer" : "Add Trainer"}
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: 350,
          }}
        >
          <TextField
            label="Name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            label="Title"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <input
  type="file"
  accept="image/*"
  {...register("img")}
  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }}
/>

          {errors.img && (
            <Typography color="error" variant="caption">
              {errors.img.message}
            </Typography>
          )}

          {preview && (
            <img
              src={preview}
              alt="preview"
              width={100}
              style={{ borderRadius: 8 }}
            />
          )}

          <Button type="submit" variant="contained" disabled={loading}>
            {loading
              ? editData
                ? "Updating..."
                : "Adding..."
              : editData
              ? "Update Trainer"
              : "Add Trainer"}
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddTrainerDialog;