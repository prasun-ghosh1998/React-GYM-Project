import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "../services/helper/redux";
import { addPlan, updatePlan } from "../store/slices/plan.slice";

type AddPlanDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editData?: any;
};

type FormData = {
  title: string;
  desc: string;
  price: number;
  duration: number;
  planFeture: string;
};

const schema: yup.ObjectSchema<FormData> = yup.object({
  title: yup.string().required("Title is required"),
  desc: yup.string().required("Description is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required"),
  duration: yup
    .number()
    .typeError("Duration must be a number")
    .required("Duration is required"),
  planFeture: yup.string().required("Feature is required"),
});

const AddPlanDialog: React.FC<AddPlanDialogProps> = ({
  open,
  setOpen,
  editData,
}) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.plan);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      desc: "",
      price: 0,
      duration: 30,
      planFeture: "",
    },
  });

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  useEffect(() => {
    if (editData) {
      reset({
        title: editData.title || "",
        desc: editData.desc || "",
        price: Number(editData.price) || 0,
        duration: Number(editData.duration) || 30,
        planFeture: editData.planFeture || "",
      });
    } else {
      reset({
        title: "",
        desc: "",
        price: 0,
        duration: 30,
        planFeture: "",
      });
    }
  }, [editData, reset, open]);

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        ...data,
        price: Number(data.price),
        duration: Number(data.duration),
      };

      if (editData) {
        await dispatch(
          updatePlan({
            id: editData.$id,
            data: payload,
          })
        ).unwrap();

        toast.success("Plan Updated!");
      } else {
        await dispatch(addPlan(payload)).unwrap();
        toast.success("Plan Added!");
      }

      handleClose();
    } catch (err: any) {
      toast.error(err?.message || err || "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{editData ? "Edit Plan" : "Add Plan"}</DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Title"
            fullWidth
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
            disabled={loading}
          />

          <TextField
            label="Description"
            fullWidth
            {...register("desc")}
            error={!!errors.desc}
            helperText={errors.desc?.message}
            disabled={loading}
          />

          <TextField
            label="Price"
            type="number"
            fullWidth
            {...register("price", { valueAsNumber: true })}
            error={!!errors.price}
            helperText={errors.price?.message}
            disabled={loading}
          />

          <TextField
            label="Duration Days"
            type="number"
            fullWidth
            {...register("duration", { valueAsNumber: true })}
            error={!!errors.duration}
            helperText={errors.duration?.message}
            disabled={loading}
          />

          <TextField
            label="Plan Feature"
            fullWidth
            {...register("planFeture")}
            error={!!errors.planFeture}
            helperText={errors.planFeture?.message}
            disabled={loading}
          />

          <Button type="submit" variant="contained" disabled={loading}>
            {loading
              ? editData
                ? "Updating..."
                : "Adding..."
              : editData
              ? "Update Plan"
              : "Add Plan"}
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddPlanDialog;