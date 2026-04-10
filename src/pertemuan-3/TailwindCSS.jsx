export default function TailwindCSS(){
    return(
        <>
        <FlexboxGrid/>
        <div>
            <h1 className="border m-4">Belajar Tailwind CSS</h1>
            <button className="bg-orange-400 text-white px-4 py-5 mx-4 rounded-4xl shadow-lg">
                click me
            </button>
            <Spacing/>
            <Typography/>
            <BorderRadius/>
            <BackgroundColors/>
            <ShadowEffects/>
        </div>
        </>


    )
}

function Spacing(){
    return (
        <div className="bg-blue-600 shadow-lg p-6 m-5 rounded-lg">
            <h2 className="text-lg font-semibold test text-orange-400">Card Title</h2>
            <p className="mt-2 text-white">Ini adalah contoh penggunaan padding dan margin di Tailwind.</p>
        </div>
    )
}

function Typography(){
    return (
        <div className="m-5">
            <h1 className="text-3xl font-extrabold text-blue-600">Tailwind Typography</h1>
            <p className="text-gray-600 text-lg mt-2">Belajar Tailwind sangat menyenangkan dan cepat!</p>
        </div>
    )
}

function BorderRadius(){
    return (
        <button className="border-2 border-orange-400 text-blue-500 px-4 py-2 rounded-l-lg ml-5"> Klik Saya </button>
    )
}

function BackgroundColors(){
    return(
        <div className="bg-blue-500 text-white p-6 rounded-t-lg shadow-lg m-5">
            <h3 className="text-orange-400 text-xl font-bold">Tailwind Colors</h3>
            <p className="mt-2">Belajar Tailwind itu seru dan fleksibel!</p>
        </div>
    )
}

function FlexboxGrid(){
    return (
        <nav className="flex justify-between bg-blue-800 p-4 text-orange-400">
            <h1 className="text-lg font-bold">MyWebsite</h1>
            <ul className="flex space-x-4">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    )
}

function ShadowEffects(){
    return (
        <div className="bg-orange-300 m-5 shadow-lg p-6 rounded-b-lg hover:shadow-2xl transition">
            <h3 className="text-blue-500 text-xl font-semibold">Hover me!</h3>
            <p className="text-gray-600 mt-2">Lihat efek bayangan saat hover.</p>
        </div>
    )
}