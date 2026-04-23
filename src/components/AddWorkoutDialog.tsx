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
import { addWorkout, updateWorkout } from "../store/slices/workout.slice";
import { BUCKET_ID, ID, storage } from "../appwrite/appwriteConfig";

type AddWorkoutDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editData?: any;
};

// Schema
const schema = yup.object({
  title: yup.string().required("Title is required"),
  desc: yup.string().required("Description is required"),
  tag: yup.string().required("tag is required"),
  name: yup.string().required("name is required"),
  img: yup.mixed<FileList>().required("img is required"),
});

type FormData = {
  title: string;
  desc: string;
  tag: string;
  name: string;
  img: FileList;
};

const AddWorkoutDialog: React.FC<AddWorkoutDialogProps> = ({
  open,
  setOpen,
  editData,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.workout);

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

  useEffect(() => {
    if (editData) {
      reset({
        title: editData.title,
        desc: editData.desc,
        tag: editData.tag,
        name: editData.name,
        img: undefined as any,
      });
      setPreview(editData.img);
    } else {
      reset({
        title: "",
        desc: "",
        tag: "",
        name: "",
        img: undefined as any,
      });
    }
  }, [editData, reset]);

const onSubmit: SubmitHandler<FormData> = async (data) => {
  try {
    let imageUrl = editData?.img || "";
    let fileId = editData?.imageId || "";

    // If new file selected
    if (data.img && data.img[0]) {
      const file = data.img[0];

      const uploadRes = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        file
      );

      const newFileId = uploadRes.$id;

      const newImageUrl = storage
  .getFileView(BUCKET_ID, newFileId)
  .toString();

      // ✅ SAFE DELETE (IMPORTANT FIX)
      if (editData?.imageId) {
        try {
          await storage.deleteFile(BUCKET_ID, editData.imageId);
        } catch (err) {
          console.warn("Old image not found, skipping delete");
        }
      }

      fileId = newFileId;
      imageUrl = newImageUrl;
    }

    const payload = {
      title: data.title,
      desc: data.desc,
      tag: data.tag,
      name: data.name,
      img: imageUrl,
      imageId: fileId,
    };

    if (editData) {
  // ✅ EDIT
  await dispatch(
    updateWorkout({ id: editData.$id, data: payload })
  ).unwrap();

  toast.success("Workout Updated!");
} else {
  // ✅ ADD
  await dispatch(addWorkout(payload)).unwrap();

  toast.success("Workout Added!");
}

    reset();
    setPreview(null);
    handleClose();
  } catch (err) {
    console.error(err);
    toast.error("Update failed");
  }
};
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{editData ? "Edit Workout" : "Add Workout"}</DialogTitle>

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
            label="Title"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <TextField
            label="Description"
            {...register("desc")}
            error={!!errors.desc}
            helperText={errors.desc?.message}
          />

          <TextField
            label="Tag"
            {...register("tag")}
            error={!!errors.tag}
            helperText={errors.tag?.message}
          />

          <TextField
            label="Name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <input
            type="file"
            accept="image/*"
            {...register("img")}
            onChange={(e: any) => {
              const file = e.target.files[0];

              if (file) {
                const previewUrl = URL.createObjectURL(file);
                setPreview(previewUrl);
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
              style={{ borderRadius: 8, marginTop: 10 }}
            />
          )}

          <Button type="submit" variant="contained" disabled={loading}>
            {loading
              ? editData
                ? "Updating..."
                : "Adding..."
              : editData
                ? "Update Workout"
                : "Add Workout"}
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddWorkoutDialog;
