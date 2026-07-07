import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "../services/helper/redux";
import {
  addMember,
  memberList,
  updateMember,
} from "../store/slices/member.slice";
import { planList } from "../store/slices/plan.slice";
import type { PlanType } from "../typeScript/type/plans.type";

type AddMemberDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editData?: any;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  plan: string;
};

const schema: yup.ObjectSchema<FormData> = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  plan: yup.string().required("Plan is required"),
});

const AddMemberDialog: React.FC<AddMemberDialogProps> = ({
  open,
  setOpen,
  editData,
}) => {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.member);
  const { list: plans = [] } = useAppSelector((state) => state.plan) as {
    list: PlanType[];
  };

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      plan: "",
    },
  });

  useEffect(() => {
    dispatch(planList({ params: { page: 1, limit: 100 } }));
  }, [dispatch]);

  useEffect(() => {
    if (editData) {
      reset({
        name: editData.name || "",
        email: editData.email || "",
        phone: editData.phone || "",
        plan: editData.plan || "",
      });
    } else {
      reset({
        name: "",
        email: "",
        phone: "",
        plan: "",
      });
    }
  }, [editData, reset, open]);

  const handleClose = () => {
    setOpen(false);
    reset({
      name: "",
      email: "",
      phone: "",
      plan: "",
    });
  };

  const onSubmit = async (data: FormData) => {
    const selectedPlan = plans.find((p) => p.$id === data.plan);

    if (!selectedPlan) {
      toast.error("Please select a valid plan");
      return;
    }

    const today = new Date();
    const expiry = new Date();

    const duration = Number(selectedPlan.duration || 0);
    expiry.setDate(today.getDate() + duration);

    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      plan: data.plan,
      status: editData?.status || "active",
      joinDate: editData?.joinDate || today.toISOString(),
      expiryDate: expiry.toISOString(),
      paymentStatus: "paid",
      source: "admin",
    };

    try {
      if (editData) {
        await dispatch(
          updateMember({
            id: editData.$id,
            data: payload,
          })
        ).unwrap();

        toast.success("Member Updated!");
      } else {
        await dispatch(addMember(payload)).unwrap();
        toast.success("Member Added!");
      }

      dispatch(memberList({ params: { page: 1, limit: 5 } }));
      handleClose();
    } catch (err: any) {
      toast.error(err?.message || err || "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{editData ? "Edit Member" : "Add Member"}</DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Name"
            fullWidth
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            disabled={loading}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            disabled={loading}
          />

          <TextField
            label="Phone"
            fullWidth
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            disabled={loading}
          />

          <Controller
            name="plan"
            control={control}
            render={({ field }) => (
              <TextField
                select
                fullWidth
                label="Select Plan"
                {...field}
                value={field.value || ""}
                error={!!errors.plan}
                helperText={errors.plan?.message}
                disabled={loading}
              >
                <MenuItem value="">Select Plan</MenuItem>

                {plans.map((p) => (
                  <MenuItem key={p.$id} value={p.$id}>
                    {p.title} ₹{p.price}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : editData ? (
              "Update Member"
            ) : (
              "Add Member"
            )}
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddMemberDialog;