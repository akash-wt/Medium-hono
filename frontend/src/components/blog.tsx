interface BlogType {
  title: string;
  description: string;
  author: string;
  date: string;
}

const Blog = ({ title, description, author, date }: BlogType) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg p-4 sm:p-6 ">
        <h2 className="text-xl sm:text-2xl  font-semibold text-gray-900 hover:text-blue-600 transition-colors">
          {title}
        </h2>

        <p className="text-gray-600 mt-1 text-sm sm:text-base">{description}</p>

        <div className="flex items-center mt-1 space-x-3">
          <div>
            <span className="text-sm sm:text-base font-medium text-gray-800">
              {author}
            </span>{" "}
            &nbsp;|&nbsp;
            <span className="text-xs sm:text-sm  text-gray-500">{date}</span>
          </div>
        </div>
      </div>
      <div className="w-full border border-b-1 text-slate-50"></div>
    </div>
  );
};

export default Blog;
