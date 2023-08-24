"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import * as z from "zod";
import { Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Empty from "@/components/empty";
import Heading from "@/components/heading";
import Loader from "@/components/loader";

import { formSchema } from "@/app/(dashboard)/(routes)/music/constants";

const MusicGenerationPage = () => {
  const router = useRouter();
  const [music, setMusic] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);

      const response = await axios.post("/api/music", values);

      setMusic(response.data.audio);

      form.reset();
    } catch (error: any) {
      console.log(error);
      //  if (error?.response?.status === 403) {
      //    proModal.onOpen();
      //  } else {
      //    toast.error("Something went wrong.");
      //  }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      {/* heading component start */}
      <Heading
        title="Music Generation"
        description="Create music from descriptions in natural language."
        icon={Music}
        iconColor="text-emerald-800"
        bgColor="bg-emerald-800/10"
      />
      {/* heading component end */}

      <div className="px-4 lg:px-8">
        {/* form component start */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full grid-cols-12 gap-2 rounded-lg border p-4 px-3 focus-within:shadow-sm md:px-6"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Funky synth solo..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              className="col-span-12 w-full bg-emerald-800 text-xs  uppercase tracking-wide hover:bg-emerald-600 lg:col-span-2"
              type="submit"
              disabled={isLoading}
              size="icon"
            >
              Generate
            </Button>
          </form>
        </Form>
        {/* form component end */}

        {/* results display area start */}
        {isLoading && (
          <div className="p-20">
            <Loader />
          </div>
        )}

        {!music && !isLoading && <Empty label="No music generated." />}

        {music && (
          <audio controls className="mt-8 w-full">
            <source src={music} />
          </audio>
        )}
        {/* results display area end */}
      </div>
    </div>
  );
};

export default MusicGenerationPage;
