
export type Workout = {
  $id: string;
  title: string;
  desc: string;
  tag: string;
  name: string;
  img: string;
  imageId?: string;
  status: "publish" | "draft";
};

export type WorkoutState = {
  list: Workout[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  total: number;
};