export type PlanType = {
  $id: string;
  title: string;
  price: number;
  duration: number;
  status: "publish" | "draft";
};