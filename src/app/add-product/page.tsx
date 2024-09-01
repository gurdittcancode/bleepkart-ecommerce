'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useState } from 'react';
import { formSchema } from '@/lib/formSchema';
import { addProduct } from '@/lib/actions/actions';

export default function AddProduct() {
  const [selectedImage, setSelectedImage] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      image: '',
      price: 0,
    },
  });
  const { errors } = form.formState;

  async function onSubmit(data: z.output<typeof formSchema>) {
    const formData = new FormData();
    console.log(data);
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('image', data.image);
    formData.append('price', (data.price).toString());
    const res = await addProduct(formData);
  }

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <h1 className="text-white text-5xl font-extrabold mb-3">Add Product</h1>
        <Form {...form}>
          <form className="mt-8 w-1/2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-bold">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name of product" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            {errors.name && (
              <span className="text-red-900">* {errors.name.message}</span>
            )}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel className="text-lg font-bold">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Product description..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            {errors.description && (
              <span className="text-red-900 mt-3">
                *{errors.description.message}
              </span>
            )}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel className="text-lg font-bold">
                    Product image
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product image..."
                      {...field}
                      onChange={(ev) => {
                        setSelectedImage(ev.target.value);
                        form.setValue('image', ev.target.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {selectedImage && (
              <Image
                src={selectedImage}
                className="mt-3 mx-auto"
                width={300}
                height={300}
                alt="Selected product image"
              />
            )}
            {errors.image && (
              <span className="text-red-900">*Please add a product image.</span>
            )}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel className="text-lg font-bold">
                    Product Price
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product price..."
                      type="text"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {errors.price && (
              <span className="text-red-900">{errors.price.message}</span>
            )}
            <Button type="submit" className="w-full mt-10">
              Add Product
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
