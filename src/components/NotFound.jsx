export default function NotFound({ title, description }) {
  return (
    <div className="flex flex-col items-center  px-6 md:px-16 py-20">
      <img src="/empty-list.svg" alt="empty list" width={200} height={300} />
      <div>
        <h2 className="text-xl text-center font-bold text-[#111827] mt-6">
          {title}
        </h2>
        <p className="text-sm text-center text-[#6B7280] mt-2">{description}</p>
      </div>
    </div>
  );
}
