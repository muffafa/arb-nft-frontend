"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [challengers, setChallengers] = useState([]);
  // page state
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  // fix it
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/challengers?page=${page}`);
      const body = await result.json();
      setChallengers(body.challengers);
      setPageCount(body.pagination.totalPageNumber);
    };

    fetchData();
  }, [page]);

  function handlePrev() {
    setPage((page) => {
      return page === 1 ? 1 : page - 1;
    });
  }

  function handleNext() {
    setPage((page) => {
      return page === pageCount ? pageCount : page + 1;
    });
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">Challengers</h1>
      <p className="text-lg mb-2">
        Page: <span className="font-bold">{page}</span>
      </p>
      <p className="text-lg mb-4">
        Page Count: <span className="font-bold">{pageCount}</span>
      </p>
      <ul className="space-y-4">
        {challengers.map((challenger: Challenger, index) => (
          <li key={index}>
            <b className="font-bold">Twitter Handler:</b>{" "}
            {challenger.twitterHandle}
            <br />
            <b className="font-bold">Solver:</b> {challenger.solver}
            <br />
            <b className="font-bold">Challenge:</b> {challenger.challenge}
            <br />
            <b className="font-bold">Block Number:</b> {challenger.blockNumber}
            <br />
            <b className="font-bold">Date Created:</b>{" "}
            {challenger.dateCreated.toString()}
            <br />
          </li>
        ))}
      </ul>
      <footer className="flex justify-between mt-8">
        <button
          className={`px-4 py-2 rounded-md ${
            page === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          disabled={page === 1}
          onClick={handlePrev}
        >
          Prev
        </button>
        <span className="text-lg font-bold">{page}</span>
        <button
          className={`px-4 py-2 rounded-md ${
            page >= pageCount
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          disabled={page >= pageCount}
          onClick={handleNext}
        >
          Next
        </button>
      </footer>
    </div>
  );
}
