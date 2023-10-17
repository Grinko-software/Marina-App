import { toPng } from 'html-to-image'

export default function BarcodeImg ({ elementRef }) {
    const htmlToImageConvert = () => {
        toPng(elementRef.current, { cacheBust: false })
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = 'barcode.png'
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className='flex-col mb-10'>
            <button className='text-black' onClick={() => { htmlToImageConvert() }}>Save</button>
        </div>
    )
}
