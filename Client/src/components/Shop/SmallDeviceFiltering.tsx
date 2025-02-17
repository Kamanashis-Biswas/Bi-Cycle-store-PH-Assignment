import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

const SmallDeviceFiltering = () => {
    return (
        <div className="md:hidden block">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline">Filtering</Button>
                </SheetTrigger>
                <SheetContent>
                    {/* <LeftSide /> */}
                </SheetContent>
            </Sheet>
        </div>
    )
}
export default SmallDeviceFiltering