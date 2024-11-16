
const BlogsSkelton = () => {
    return (
  
      <div className="max-w-3xl mx-auto">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-[#212121] rounded-lg p-4 sm:p-6 animate-pulse mb-4">
            {/* Blog Title Skeleton */}
            <div className="h-6 bg-gray-600 rounded mb-3 w-2/3"></div>
  
            {/* Blog Content Skeleton */}
            <div className="h-4 bg-gray-500 rounded mb-3 w-full"></div>
  
            {/* Author and Date Skeleton */}
            <div className="flex items-center mt-1 space-x-3">
              <div className="h-4 bg-gray-400 rounded w-1/4"></div>
              <div className="h-4 bg-gray-400 rounded w-1/6"></div>
            </div>
          </div>
        ))}
  
        {/* Border line */}
        <div className="w-full mt-4 border-gray-600"></div>
      </div>
  
  
    )
  }
  
  export default BlogsSkelton;
  