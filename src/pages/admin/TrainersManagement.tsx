import {
  Box,
  Button,
  Container,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../services/helper/redux";
import {
  deleteTrainer,
  setLimitTrainer,
  setNextTrainer,
  setPrevTrainer,
  statusChangeTrainer,
  trainerList,
} from "../../store/slices/trainer.slice";
import AddTrainerDialog from "../../components/AddTrainerDialog";

const TrainerManagement = () => {
  const { loading, error, list, page, limit } = useAppSelector(
    (state) => state.trainer
  );
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  useEffect(() => {
    dispatch(trainerList({ params: { page, limit } }));
  }, [dispatch, page, limit]);

  return (
    <Container>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6" color="#E6FF00">Trainer Management</Typography>

        <Button
          variant="contained"
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
        >
          Add Trainer
        </Button>
      </Box>

      <AddTrainerDialog open={open} setOpen={setOpen} editData={editData} />

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
              <TableCell>Name</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Image</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {list?.map((row: any) => (
              <TableRow key={row.$id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.title}</TableCell>

                <TableCell>
                  <img
                    src={row.img}
                    alt="trainer"
                    width={60}
                    style={{ borderRadius: 6 }}
                  />
                </TableCell>

                <TableCell sx={{ display: "flex", gap: 1 }}>
                  {/* Status */}
                  <Switch
                    checked={row.status === "publish"}
                    onChange={() =>
                      dispatch(
                        statusChangeTrainer({
                          id: row.$id,
                          currentStatus: row.status,
                        })
                      )
                    }
                  />

                  {/* Edit */}
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#fbc02d" }}
                    onClick={() => {
                      setEditData(row);
                      setOpen(true);
                    }}
                  >
                    Edit
                  </Button>

                  {/* Delete */}
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() =>
                      dispatch(
                        deleteTrainer({
                          id: row.$id,
                          imageId: row.imageId,
                        })
                      )
                    }
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {/* Footer */}
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>
                <Box display="flex" justifyContent="space-between">
                  <Button
                    variant="contained"
                    onClick={() => dispatch(setPrevTrainer())}
                    disabled={page === 1}
                  >
                    Prev
                  </Button>

                  <Typography>{page}</Typography>

                  <Button
                    variant="contained"
                    onClick={() => dispatch(setNextTrainer())}
                  >
                    Next
                  </Button>

                  <select
                    value={limit}
                    onChange={(e) =>
                      dispatch(setLimitTrainer(Number(e.target.value)))
                    }
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                  </select>
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TrainerManagement;