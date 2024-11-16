interface BlogType {
  title: string;
  description: string;
  author: string;
  date: string;
}

const Blog = ({ title, description, author, date }: BlogType) => {
  return (
    <div className="max-w-3xl mx-auto ">
      <div className="bg-[#212121] rounded-lg p-4 sm:p-6  ">
        <h2 className="text-xl sm:text-2xl font-semibold text-white  transition- colors">
          {title}
        </h2>

        <p className="text-gray-300 mt-1 text-sm sm:text-base">{description}</p>

        <div className="flex items-center mt-1 space-x-3">
          <div>
            <span className="text-sm sm:text-base font-medium text-gray-200">
              {author}
            </span>{" "}
            &nbsp;|&nbsp;
            <span className="text-xs sm:text-sm text-gray-400">{date}</span>
          </div>
        </div>
      </div>
      <div className="w-full  mt-4  border-gray-600"></div>
    </div>

  );
};

export default Blog;
