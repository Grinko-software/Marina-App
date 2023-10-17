import CardUi from '@/components/ui/Card'
import { fetchGetproducts } from '@/services/products'
export default async function ListInventory ({ setTargetProduct, setList, listInventory }) {
    const listInventoryResult = await fetchGetproducts()

    return (

        listInventoryResult.data.map((item, index) => (
            <CardUi key={index} item={item} index={index} setTargetProduct={setTargetProduct}/>
        ))
    )
}
