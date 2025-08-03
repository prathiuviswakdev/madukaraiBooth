import { useContext, useState } from "react";
import { AppContext } from "./_app";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DisplayCARD } from "../components/DisplayCARD";

export default function FetchNAME() {
  const { INPUT, setINPUT } = useContext(AppContext);
  const [selectedBooth, setSelectedBooth] = useState("all");
  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ["NAME"],
    queryFn: async () => {
      try {
        const response = await axios.post(
          `/api/booths/NAME?name=${INPUT}&booth=${selectedBooth}`
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    enabled: false,
    retry: 1,
  });

  return (
    <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-booth-dark">Search by Voter Name</h1>
      <select
          value={selectedBooth}
          onChange={(e) => setSelectedBooth(e.target.value)}
          className="bg-black hover:bg-grey text-white font-bold py-2 px-6 rounded-xl"
        >
          <option value="all">All Booths</option>
          <option value="62">Booth 62</option>
          <option value="63">Booth 63</option>
          <option value="164">Booth 164</option>
          <option value="165">Booth 165</option>
          <option value="167">Booth 167</option>
        </select>
        <div className="flex flex-col sm:flex-row gap-4 py-2 px-6"></div>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Enter Voter Name"
          className="border border-gray-300 rounded-xl px-4 py-2 flex-grow focus:ring-2 focus:ring-booth-DEFAULT focus:border-transparent outline-none"
          onChange={(event) => {
            setINPUT(event.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') refetch();
          }}
        />
        <button
          className="bg-booth-DEFAULT hover:bg-booth-dark text-white font-bold py-2 px-6 rounded-xl transition-colors"
          onClick={refetch}
        >
          SEARCH
        </button>
      </div>
      
      {isError && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
          Error: {error.message || "Failed to retrieve voter information"}
        </div>
      )}

      <div className="mt-8">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.map((name, index) => (
              <DisplayCARD name={name} key={index} />
            ))}
            {data?.length === 0 && (
              <div className="text-center py-10 text-gray-500 col-span-full">
                No voters found with this name
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Set the page title
FetchNAME.pageTitle = "Search by Voter Name"; 