const SideBar = () => {
    return (
        <div className="w-[230px] p-4">
            <h1 className="text-2xl font-bold mb-4">FastCampus Note</h1>
            <button className="bg-gray-400 hover:bg-gray-500 w-full py-2 px-4 rounded">
                노트 추가
            </button>
            <div className="mt-4">
                <a href="/">홈</a>
            </div>
        </div>
    )
}

export default SideBar
