"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useProjects } from "./hooks/useProjects";
import { Textarea } from "@/components/ui/textarea";
import { TagsInput } from "@/components/shared/TagsInput";
import { useProjectContext } from "@/context/ProjectContext";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import Link from "next/link";

type ProjectFormProps = {
  mode?: "create" | "edit";
  selectedOrgLogin?: string;
};

export const ProjectForm = ({
  mode = "create",
  selectedOrgLogin,
}: ProjectFormProps) => {
  const { form, onSubmit } = useProjects({ mode });
  const { project } = useProjectContext();
  const isEdit = mode === "edit";

  useEffect(() => {
    if (
      selectedOrgLogin &&
      form.getValues("github_handle") !== selectedOrgLogin
    ) {
      form.setValue("github_handle", selectedOrgLogin, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [selectedOrgLogin, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 py-4 px-5"
      >
        <Card className="p-4">
          <FormField
            control={form.control}
            name="github_handle"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>GitHub Organization</FormLabel>
                <FormDescription>
                  Write the GitHub organization handle and see their details.
                </FormDescription>
                <FormControl>
                  <Input
                    placeholder="organization login"
                    {...field}
                    value={field.value}
                    readOnly
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>

        <Card className="p-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Project name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>

        <Card className="p-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Long Description"
                    rows={10}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="short_description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Input placeholder="Short description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>

        <Card className="p-4">
          <FormField
            control={form.control}
            name="tech_stack"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Tech Stack</FormLabel>
                <FormControl>
                  <div>
                    <TagsInput
                      initial={
                        isEdit
                          ? (project?.tech_stack ?? [])
                          : (field.value ?? [])
                      }
                      onChange={(tags) => field.onChange(tags)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>

        <Card className="p-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DEFI">DeFi</SelectItem>
                      <SelectItem value="NFT">NFT</SelectItem>
                      <SelectItem value="TOOLING">Tooling</SelectItem>
                      <SelectItem value="PAYMENTS">Payments</SelectItem>
                      <SelectItem value="GAMING">Gaming</SelectItem>
                      <SelectItem value="INFRASTRUCTURE">
                        Infrastructure
                      </SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>

        <div className="flex justify-end gap-2 pt-2">
          <Link href="/maintainer/projects">
            <Button type="button" variant="outline" className="cursor-pointer">
              Cancel
            </Button>
          </Link>
          <Button type="submit" className="cursor-pointer">
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />{" "}
                {isEdit ? "Saving..." : "Creating..."}
              </>
            ) : isEdit ? (
              "Save"
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
