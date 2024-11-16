export default function SingleBlogSkelton() {
    return (
        <div className="min-h-screen bg-[rgb(17,17,17)] py-10 px-6 sm:px-10">
            <div className="max-w-3xl mx-auto bg-[#212121] shadow-lg rounded-lg overflow-hidden">
                <div className="p-8 space-y-6">
                    {/* Skeleton for the Title */}
                    <div className="h-8 bg-gray-700 rounded w-3/4"></div>

                    {/* Skeleton for the Content */}
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                    

                    {/* Skeleton for the Author Info */}
                    <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                </div>

                {/* Skeleton for Edit/Read-only Info */}
                <div className="bg-[#212121] border-t border-[#333333] px-6 py-4 flex justify-between items-center">
                    <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                
                </div>
            </div>
        </div>

    )
}