import { getBrandCount } from "@/actions/get-brand-count";
import { getCategoryCount } from "@/actions/get-category-count";
import { getStockCount } from "@/actions/get-stock-count";
import { getSubcategoryCount } from "@/actions/get-subcategory-count";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import { CopyMinus, FormInput, MinusSquare, Package } from "lucide-react";

interface DashboardPageProps {
    params: { storeId: string }
};


const DashboardPage: React.FC<DashboardPageProps> = async ({
    params
}) => {
    const categoryCount = await getCategoryCount(params.storeId);
    const subcategoryCount = await getSubcategoryCount(params.storeId);
    const stockCount = await getStockCount(params.storeId);
    const brandCount = await getBrandCount(params.storeId);


    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Heading title="Irányítópult" description="Az üzlet adatainak áttekintése" />
                <Separator />
                <div className="grid gap-4 grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Kategóriák száma
                            </CardTitle>
                            <MinusSquare className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {categoryCount}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Alkategóriák száma
                            </CardTitle>
                            <CopyMinus className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {subcategoryCount}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Márkák száma
                            </CardTitle>
                            <FormInput className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {brandCount}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Termékek száma
                            </CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stockCount}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;