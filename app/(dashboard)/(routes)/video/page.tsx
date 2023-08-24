"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import * as z from "zod";
import { VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Empty from "@/components/empty";
import Heading from "@/components/heading";
import Loader from "@/components/loader";

import { formSchema } from "@/app/(dashboard)/(routes)/video/constants";

const VideoGenerationPage = () => {
  const router = useRouter();
  const [video, setVideo] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);

      const response = await axios.post("/api/video", values);

      setVideo(response.data[0]);

      form.reset();
    } catch (error: any) {
      console.log(error);
      // if (error?.response?.status === 403) {
      //   proModal.onOpen();
      // } else {
      //   toast.error("Something went wrong.");
      // }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      {/* heading component start */}
      <Heading
        title="Video Generation"
        description="Create video from descriptions in natural language."
        icon={VideoIcon}
        iconColor="text-orange-800"
        bgColor="bg-orange-800/10"
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
                      placeholder="Clown fish swimming in a coral reef, beautiful, 8k, perfect, award winning, national geographic..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              className="col-span-12 w-full bg-orange-800 text-xs  uppercase tracking-wide hover:bg-orange-600 lg:col-span-2"
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

        {!video && !isLoading && <Empty label="No video files generated." />}

        {video && (
          <video
            controls
            className="mt-8 aspect-video w-full rounded-lg border bg-[#404756]"
          >
            <source src={video} />
          </video>
        )}
        {/* results display area end */}
      </div>
    </div>
  );
};

export default VideoGenerationPage;
