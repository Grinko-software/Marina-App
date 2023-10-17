export default function LoginLayout ({
    children // will be a page or nested layout
}) {
    return (
        <section className="bg-cover bg-center bg-[url(https://images.alphacoders.com/131/1319219.jpeg)] w-screen h-screen flex justify-center items-center">
            {/* Include shared UI here e.g. a header or sidebar */}
            <div className="justify-center items-center w-full m-10">
                {children}
            </div>
        </section>
    )
}
