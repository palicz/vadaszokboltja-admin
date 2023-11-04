"use client";

import { useState } from "react";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Subcategory } from "@prisma/client";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
    name: z.string().min(1),
    categoryId: z.string().min(1)
});

type SubcategoryFormValues = z.infer<typeof formSchema>;

interface SubcategoryFormProps {
    initialData: Subcategory | null;
    categories: Category[];
}

export const SubcategoryForm: React.FC<SubcategoryFormProps> = ({
    initialData,
    categories
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Alkategória szerkesztése" : "Alkategória létrehozása";
    const description = initialData ? "Kijelölt alkategória szerkesztése" : "Egy új alkategória hozzáadása";
    const toastMessage = initialData ? "Alkategória sikeresen frissítve." : "Alkategória sikeresen létrehozva.";
    const action = initialData ? "Változtatások mentése" : "Létrehozás";


    const form = useForm<SubcategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            categoryId: ''
        }
    });

    const onSubmit = async (data: SubcategoryFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/subcategories/${params.subcategoryId}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/subcategories`, data);
            }
            router.refresh();
            router.push(`/${params.storeId}/subcategories`)
            toast.success(toastMessage)
        } catch (error) {
            toast.error("Sikertelen művelet.")
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/subcategories/${params.subcategoryId}`)
            router.refresh();
            router.push(`/${params.storeId}/subcategories`)
            toast.success("Kategória sikeresen törölve.")
        } catch (error) {
            toast.error("Először győződjön meg arról, hogy eltávolított minden terméket, ami ezt a alkategóriát használja.")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />
                {initialData && (
                    <Button disabled={loading} variant="destructive" size="icon" onClick={() => setOpen(true)}>
                        <Trash className="h-4 w-4"></Trash>
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Név</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Alkategória neve" {...field} />
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="categoryId" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kategória</FormLabel>
                                <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue defaultValue={field.value} placeholder="Kategória kiválasztása" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )} />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
            <Separator />
        </>
    );
};