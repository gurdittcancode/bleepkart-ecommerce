import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required." }),
  description: z.string().min(10, { message: "Description is too short." }),
  image: z.string().url({ message: "This is not a valid image URL." }),
  price: z.coerce.number().positive(),
});