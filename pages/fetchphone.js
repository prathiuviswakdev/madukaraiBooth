import { useContext, useState } from "react";
import { AppContext } from "./_app";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DisplayCARD } from "../components/DisplayCARD";

export default function Fetchphone() {
  const { INPUT, setINPUT } = useContext(AppContext);
  const [selectedBooth, setSelectedBooth] = useState("all");
  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ["PHONE", INPUT, selectedBooth], // Updated query key to be more specific
    queryFn: async () => {
      try {
        const response = await axios.post(
          `/api/booths/phone?phone=${INPUT}&booth=${selectedBooth}` // Fixed API endpoint
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
      <h1 className="text-2xl font-bold mb-6 text-booth-dark">Search by Phone Number</h1>
      <select
          value={selectedBooth}
          onChange={(e) => setSelectedBooth(e.target.value)}
          className="bg-black hover:bg-grey text-white font-bold py-2 px-6 rounded-xl"
        >
          <option value="all">All Booths</option>
          <option value="202">Booth 202</option>
          <option value="203">Booth 203</option>
          <option value="204">Booth 204</option>
          <option value="205">Booth 205</option>
          <option value="206">Booth 206</option>
          <option value="207">Booth 207</option>
          <option value="208">Booth 208</option>
          <option value="209">Booth 209</option>
          <option value="210">Booth 210</option>
          <option value="211">Booth 211</option>
          <option value="212">Booth 212</option>
          <option value="213">Booth 213</option>
          <option value="214">Booth 214</option>
          <option value="215">Booth 215</option>
          <option value="216">Booth 216</option>
          <option value="217">Booth 217</option>
          <option value="218">Booth 218</option>
          <option value="219">Booth 219</option>
          <option value="220">Booth 220</option>
          <option value="221">Booth 221</option>
          <option value="222">Booth 222</option>
          <option value="223">Booth 223</option>
          <option value="224">Booth 224</option>
          <option value="225">Booth 225</option>
          <option value="226">Booth 226</option>
          <option value="227">Booth 227</option>
          <option value="228">Booth 228</option>
          <option value="229">Booth 229</option>
          <option value="230">Booth 230</option>
          <option value="231">Booth 231</option>
          <option value="232">Booth 232</option>
        </select>
        <div className="flex flex-col sm:flex-row gap-4 py-2 px-6"></div>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Enter Phone Number (e.g., 9994463132)"
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
            {data?.map((person, index) => (
              <DisplayCARD name={person} key={index} />
            ))}
            {data?.length === 0 && (
              <div className="text-center py-10 text-gray-500 col-span-full">
                No voters found with this phone number
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Set the page title
Fetchphone.pageTitle = "Search by Phone Number";