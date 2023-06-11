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
  },[page]);

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
    <div>
      <h1>Challengers</h1>
      <p>page: {page}</p>
      <p>pageCount: {pageCount}</p>
      <ul>
        {challengers.map((challenger: Challenger, index) => (
          <li key={index}>
            <b>Twitter Handler: </b>
            {challenger.twitterHandle}
            <br />
            <b>Solver: </b>
            {challenger.solver}
            <br />
            <b>Challange: </b>
            {challenger.challenge}
            <br />
            <b>Block Number: </b>
            {challenger.blockNumber}
            <br />
            <b>Date Created: </b>
            {challenger.dateCreated.toString()}
            <br />
          </li>
        ))}
      </ul>
      <footer>
        <button disabled={page === 1} onClick={handlePrev}>Prev</button>
        <span>{page}</span>
        <button disabled={page > pageCount} onClick={handleNext}>Next</button>
      </footer>
    </div>
  );
}
