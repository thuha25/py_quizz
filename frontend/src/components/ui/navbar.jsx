function Navbar() {
    return <div className="h-20 shadow-lg bg-white flex justify-between items-center px-12">
        <div className="text-slate-800 text-xl font-bold">
            Insert your title here
        </div>
        <div className="flex gap-5 items-center">
            <div className="text-lg font-semibold">
                Hello, Nguyễn Trương Anh Minh
            </div>
            <button className="bg-red-500 text-white border-2 border-red-500 p-2 rounded-lg font-semibold hover:bg-white hover:text-red-500 transition-all">
                Logout
            </button>
        </div>
    </div>
}

export default Navbar;