const NoteDetail = () => {
    return (
        <div className="bg-gray-900 p-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <time className="text-gray-400 text-sm">2024</time>
                    <input
                        type="text"
                        className="bg-transparent text-2xl font-bold focus-within:outline-blue-100"
                    />
                </div>
                <div>
                    <button className="bg-red-600 hover:bg-red-500 py-2 px-4 rounded">
                        삭제
                    </button>
                </div>
            </div>
            <section className="flex">
                <div className="flex-1 p-4 rounded mr-4 bg-gray-800">
                    <h2 className="text-lg font-semibold mb-2">메모</h2>
                    <textarea
                        className="bg-gray-700 w-full h-64 p-2 rounded outline-none resize-none focus:(ring-2 ring-blue-500)"
                        name=""
                        id=""
                    ></textarea>
                    <button className="bg-blue-600 hover:bg-blue-500 py-2 px-4 mt-4 rounded">
                        요약
                    </button>
                </div>
                <div className="flex-1 p-4 rounded bg-gray-800">
                    <h3 className="text-lg font-semibold mb-2">요약 결과</h3>
                    <div className="text-gray-300 h-64 bg-gray-700 p-2 rounded">
                        요약 내용
                    </div>
                </div>
            </section>
        </div>
    )
}

export default NoteDetail
