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
  deleteWorkout,
  setLimitWorkout,
  setNextWorkout,
  setPrevWorkout,
  statusChangeWorkout,
  workoutList,
} from "../../store/slices/workout.slice";

import AddWorkoutDialog from "../../components/AddWorkoutDialog";
import type { Workout } from "../../typeScript/type/workout.type";

const WorkoutManagement = () => {
  const { loading, error, list, page, limit } = useAppSelector(
    (state) => state.workout
  );

  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<Workout | null>(null);

  const handleClickOpen = () => {
    setEditData(null);
    setOpen(true);
  };

  useEffect(() => {
    dispatch(workoutList({ params: { page, limit } }));
  }, [dispatch, page, limit]);

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" color="#E6FF00">
          Gym Workout Management
        </Typography>

        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{
            background: "linear-gradient(45deg, #1976d2, #42a5f5)",
          }}
        >
          Add Workouts
        </Button>
      </Box>

      <AddWorkoutDialog open={open} setOpen={setOpen} editData={editData} />

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#d6e3f0" }}>
              <TableCell>Title</TableCell>
              <TableCell>Tag</TableCell>
              <TableCell>Desc</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {list?.map((row: Workout) => (
              <TableRow key={row.$id}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.tag}</TableCell>
                <TableCell>{row.desc}</TableCell>
                <TableCell>{row.name}</TableCell>

                <TableCell>
                  {row.img && (
                    <img
                      src={row.img}
                      alt={row.title}
                      width={60}
                      height={60}
                      style={{ objectFit: "cover", borderRadius: 6 }}
                    />
                  )}
                </TableCell>

                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Switch
                      checked={row.status === "publish"}
                      onChange={() =>
                        dispatch(
                          statusChangeWorkout({
                            id: row.$id,
                            currentStatus: row.status,
                          })
                        )
                      }
                    />

                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#d5d50e", ml: 1 }}
                      onClick={() => {
                        setEditData(row);
                        setOpen(true);
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#dd3a2b", ml: 1 }}
                      onClick={() =>
                        dispatch(
                          deleteWorkout({
                            id: row.$id,
                            imageId: row.imageId,
                          })
                        )
                      }
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "red" }}
                    onClick={() => dispatch(setPrevWorkout())}
                    disabled={page === 1}
                  >
                    Prev
                  </Button>

                  <Typography>{page}</Typography>

                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "green" }}
                    onClick={() => dispatch(setNextWorkout())}
                  >
                    Next
                  </Button>

                  <select
                    value={limit}
                    onChange={(e) =>
                      dispatch(setLimitWorkout(Number(e.target.value)))
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

export default WorkoutManagement;