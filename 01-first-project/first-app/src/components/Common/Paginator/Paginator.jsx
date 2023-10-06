import React, { useState } from "react";
import stylesUsers from './Paginator.module.css';

const Paginator = ({totalUsersCount, pageSize, currentPage, onPageCHanged, portionSize = 10}) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize);
  let pages = [];
  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;
  
  for(let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
   
  return <div className={stylesUsers.pages}>
      {portionNumber > 1 && 
      <span className={stylesUsers.left} onClick={() => setPortionNumber(portionNumber - 1)}>🡨</span>
      }
        { pages.filter((page) => page >= leftPortionPageNumber && page <= rightPortionPageNumber).map((page) => {
          return <span className={currentPage === page ? stylesUsers.selected : ""} onClick={() => onPageCHanged(page)}>{page}</span>
        })}
      {portionCount > portionNumber &&
      <span className={stylesUsers.right} onClick={() => setPortionNumber(portionNumber + 1)}>🡪</span>
      }
    </div>
}

export default Paginator;