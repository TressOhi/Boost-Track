export default function DeleteRosterModal({
  title,
  desciption,
  active,
  toggle,
  action,
}) {
  return (
    active && (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#000000B2] flex justify-center items-center">
        <div className="bg-white w-2/6 p-6 rounded-lg flex items-start gap-4">
          <div className="bg-[#FEE2E2] rounded-full flex justify-center items-center w-10 h-10 px-3">
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 7V9M10 13H10.01M3.07183 17H16.9282C18.4678 17 19.4301 15.3333 18.6603 14L11.7321 2C10.9623 0.666667 9.03778 0.666667 8.26798 2L1.33978 14C0.56998 15.3333 1.53223 17 3.07183 17Z"
                stroke="#DC2626"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-[#111827]">{title}</h2>
              <button onClick={() => toggle()}>
                <svg
                  width="15"
                  height="14"
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5 13L13.5 1M1.5 1L13.5 13"
                    stroke="#9CA3AF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-2 mr-3">
              <p className="text-sm text-[#6B7280]">{desciption}</p>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                className="px-4 py-2 border border-[#D1D5DB] rounded-md text-sm font-medium text-[#374151]"
                onClick={() => toggle()}
              >
                Cancel
              </button>
              <button
                onClick={() => action && action()}
                className="px-4 py-2 border border-[#DC2626] bg-[#DC2626] rounded-md text-sm font-medium text-white"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
