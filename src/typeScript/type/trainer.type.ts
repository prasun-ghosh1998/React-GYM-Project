export type Trainer = {
  $id: string;
  name: string;
  title: string;
  img: string;
  imageId?: string;
  status?: string;
};

export type TrainerState = {
  list: Trainer[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  total: number;
};