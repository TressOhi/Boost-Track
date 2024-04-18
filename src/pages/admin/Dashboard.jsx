import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Menu } from "@headlessui/react";
import { getInitials } from "../../utilities";
import { hideLoader, showLoader } from "../../components/Loader";
import { getRosters } from "../../services/roster";
import DeleteModal from "../../components/DeleteModal";
import PageHead from "../../components/PageHead";
import NotFound from "../../components/NotFound";

const colors = ["#DB2777", "#7C3AED", "#F59E0B"];

export default function AdminDashboard() {
  const [rosters, setRosters] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalResults, setTotalResults] = useState(1);
  const [deleteModalIsActive, setDeleteModalIsActive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      showLoader();

      await fetchRosters();

      hideLoader();
    };

    fetchData();
  }, []);

  const fetchRosters = async (offset) => {
    try {
      const response = await getRosters({ offset: offset ?? 0 });
      const data = response.data;

      setRosters(data.rosters);
      setTotalResults(data.size);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const nextPage = async () => {
    const newOffset = offset + 10;
    if (newOffset <= totalResults) {
      showLoader();
      await fetchRosters(newOffset);
      hideLoader();

      setOffset(newOffset);
    }
  };

  const previousPage = async () => {
    const newOffset = offset - 10;
    if (newOffset >= 0) {
      showLoader();
      await fetchRosters(newOffset);
      hideLoader();

      setOffset(newOffset);
    }
  };

  const toggleDeleteModal = (scenarioId) => {
    if (scenarioId) {
      //set id to delete
    }
    setDeleteModalIsActive(!deleteModalIsActive);
  };

  return (
    <>
      <div className="min-h-full">
        <PageHead title={"Rosters"} />

        <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white px-16 py-10 shadow min-h-96">
              {rosters.length < 1 ? (
                <NotFound
                  title="No Rosters Found"
                  description="Create a new roster to get started"
                />
              ) : (
                <>
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {rosters.map((roster, i) => (
                      <div
                        key={`roster${i}`}
                        className="flex w-[31.5%] gap-x-6 gap-y-3"
                      >
                        <div className="flex flex-1 border border-[#D1D5DB] rounded-md ">
                          <div
                            style={{ backgroundColor: colors[i % 3] }}
                            className={`text-white rounded-l-md flex justify-center items-center py-4 px-6`}
                          >
                            <h2 className="text-sm font-medium">
                              {getInitials(roster.scenario.title)}
                            </h2>
                          </div>
                          <div className="py-3 px-4 relative flex justify-between items-center flex-1">
                            <div>
                              <h2 className="text-sm font-medium text-[#111827]">
                                {roster.scenario.title}
                              </h2>
                              <p className="text-sm text-[#6B7280]">
                                {roster.teams_size}
                              </p>
                              <p className="text-sm text-[#6B7280] top-[-10px] right-0 absolute">
                                {roster.status === "running" && (
                                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 me-3 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                                    RUNNING
                                  </span>
                                )}

                                {roster.status === "failed" && (
                                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 me-3 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">
                                    FAILED
                                  </span>
                                )}

                                {roster.status === "completed" && (
                                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 me-3 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                                    Green
                                  </span>
                                )}

                                {roster.status === "idled" && (
                                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 me-3 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300">
                                    IDLED
                                  </span>
                                )}
                              </p>
                            </div>

                            <Menu as="div" className="relative ml-3">
                              <div>
                                <Menu.Button className="relative flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                  <span>
                                    <svg
                                      width="4"
                                      height="16"
                                      viewBox="0 0 4 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M2 4C0.89543 4 -4.82823e-08 3.10457 0 2C4.82823e-08 0.89543 0.895431 -4.82823e-08 2 0C3.10457 4.82823e-08 4 0.895431 4 2C4 3.10457 3.10457 4 2 4Z"
                                        fill="#9CA3AF"
                                      />
                                      <path
                                        d="M2 10C0.89543 10 -4.82823e-08 9.10457 0 8C4.82823e-08 6.89543 0.895431 6 2 6C3.10457 6 4 6.89543 4 8C4 9.10457 3.10457 10 2 10Z"
                                        fill="#9CA3AF"
                                      />
                                      <path
                                        d="M2 16C0.89543 16 -4.82823e-08 15.1046 0 14C4.82823e-08 12.8954 0.895431 12 2 12C3.10457 12 4 12.8954 4 14C4 15.1046 3.10457 16 2 16Z"
                                        fill="#9CA3AF"
                                      />
                                    </svg>
                                  </span>
                                </Menu.Button>
                              </div>

                              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <>
                                  <Menu.Item>
                                    <button className="text-left text-sm w-full py-2 px-3 border-[#F3F4F6]">
                                      View
                                    </button>
                                  </Menu.Item>

                                  <Menu.Item>
                                    <button
                                      onClick={() =>
                                        toggleDeleteModal(roster.scenario.id)
                                      }
                                      className="text-left text-sm w-full text-[#DC2626] py-2 px-3 border-t border-[#F3F4F6]"
                                    >
                                      Delete
                                    </button>
                                  </Menu.Item>
                                </>
                              </Menu.Items>
                            </Menu>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-[#E5E7EB] mt-16 py-4 px-6">
                    <div>
                      <p className="text-sm text-[#374151]">
                        Showing {offset + 1} to {offset + rosters.length} of{" "}
                        {totalResults} results
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => previousPage()}
                        className="border border-[#D1D5DB] rounded-md px-4 py-2.5 text-sm text-[#374151] font-medium"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => nextPage()}
                        className="border border-[#D1D5DB] rounded-md px-4 py-2.5 text-sm text-[#374151] font-medium"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>

        <DeleteModal
          title="Delete Roster"
          active={deleteModalIsActive}
          toggle={toggleDeleteModal}
          description="Are you sure you want to delete this Roster? Deleting this means, it'll no longer be available on this platform"
        />
      </div>
    </>
  );
}
