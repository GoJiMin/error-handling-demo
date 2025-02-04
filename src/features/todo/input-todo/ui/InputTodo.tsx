"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { z } from "zod";
import { useRequestPostTodo } from "@/entities/todo";
import RenderFieldComponent from "./RenderFieldComponent";
import { FORM_FIELDS } from "../consts/fields";
import { FormSchema, FormSchemaType } from "../consts/rule";
import { Button } from "@/shared/components/ui/button";

export default function InputTodo() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "상",
    },
  });

  const { postTodo } = useRequestPostTodo();

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const id = crypto.randomUUID();
    postTodo({ id, ...values });
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className="w-full flex flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {FORM_FIELDS.map(
          ({ name, description, label, placeholder, type, options }) => (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  {RenderFieldComponent({ field, type, placeholder, options })}
                  <FormDescription>{description}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        )}
        <Button className="mt-2" type="submit">
          등록하기
        </Button>
      </form>
    </Form>
  );
}
