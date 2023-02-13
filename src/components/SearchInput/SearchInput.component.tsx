// import {
//   IconSearch,
//   IconSortAscending2,
//   IconSortDescending2,
// } from "@tabler/icons";
// import React, {
//   Dispatch,
//   SetStateAction,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import { useDisableIOSInputZoom } from "../../hooks/useDisableIOSInputZoom";
// import { usePopup } from "../../hooks/usePopup";
// import { FilterKey, SearchQuery } from "../../pages/temdex/index.page";
// import {
//   SortMenu,
//   sortOrderDescription,
// } from "../../../pages/temdex/SortMenu.component";

// // types:
// import {
//   dropdownBox,
//   searchBar,
//   searchContainer,
//   searchContent,
//   searchInput,
//   searchOptions,
//   selectItem,
//   selectMenuBox,
//   selectValueButton,
//   sortButton,
//   sortingDesc,
// } from "./SearchInput.css";

// const placeholders: Record<FilterKey, string> = {
//   all: "Searching in name, number, types, and traits...",
//   name: "Searching in name only...",
//   number: "Searching in number only...",
//   types: "Searching in types only...",
//   traits: "Searching in traits only...",
// };

// interface SearchInputProps {
//   query: SearchQuery;
//   // setValue: Dispatch<SetStateAction<string>>;

//   filter: FilterKey;
//   // setFilter: Dispatch<SetStateAction<FilterKey>>;

//   setQuery: Dispatch<SetStateAction<SearchQuery>>;
// }

// export const SearchInput = ({
//   query,
//   // setValue,
//   filter,
//   // setFilter,
//   setQuery,
// }: SearchInputProps) => {
//   const {
//     opened: showFilterMenu,
//     setOpened: setShowFilterMenu,
//     togglePopup: toggleMenu,
//     safeMark,
//   } = usePopup();

//   const {
//     opened: sortOpened,
//     safeMark: sortSafeMark,
//     togglePopup: toggleSortOpened,
//   } = usePopup();

//   const searchRef = useRef<HTMLInputElement>(null);

//   const sortDesc = sortOrderDescription[query.sortOrder];

//   const toggleItem = (item: FilterKey) => {
//     // setFilter(item);
//     // setShowFilterMenu(false);

//     setQuery((v) => ({ ...v, filterKey: item }));
//     setShowFilterMenu(false);
//   };

//   useDisableIOSInputZoom(searchRef);

//   useEffect(() => {
//     const focusOnCtrlF = (e: KeyboardEvent) => {
//       if (e.ctrlKey && e.key === "f") {
//         e.preventDefault();
//         searchRef.current?.focus();
//       }
//     };

//     window.addEventListener("keydown", focusOnCtrlF);

//     return () => {
//       window.removeEventListener("keydown", focusOnCtrlF);
//     };
//   }, []);

//   return (
//     <div className={searchContainer}>
//       <div className={searchContent}>
//         <div className={searchBar}>
//           <IconSearch />
//           <input
//             type="search"
//             ref={searchRef}
//             className={searchInput}
//             placeholder={placeholders[filter]}
//             value={query.value}
//             onChange={(e) => {
//               setQuery((v) => ({ ...v, value: e.target.value }));
//             }}
//           />
//         </div>
//         <div className={searchOptions}>
//           <ul className={dropdownBox}>
//             {/* <SelectItem
//               className={safeMark}
//               value="all"
//               selectedItem={filter}
//               toggleItem={toggleItem}
//             /> */}
//             <SelectItem
//               className={safeMark}
//               value="name"
//               selectedItem={filter}
//               toggleItem={toggleItem}
//             />
//             {/* <SelectItem
//               className={safeMark}
//               value="number"
//               selectedItem={filter}
//               toggleItem={toggleItem}
//             /> */}
//             <SelectItem
//               className={safeMark}
//               value="types"
//               selectedItem={filter}
//               toggleItem={toggleItem}
//             />

//             <SelectItem
//               className={safeMark}
//               value="traits"
//               selectedItem={filter}
//               toggleItem={toggleItem}
//             />
//           </ul>

//           <button
//             type="button"
//             className={sortButton + sortSafeMark}
//             // className={sortSafeMark}
//             onClick={toggleSortOpened}
//           >
//             {query.sortOrder === "asc" ? (
//               <IconSortAscending2 size={18} />
//             ) : (
//               <IconSortDescending2 size={18} />
//             )}
//             <span className={sortingDesc}>{query.sortKey.value}</span>
//           </button>

//           {sortOpened && (
//             <SortMenu
//               sortKey={query.sortKey}
//               sortOrder={query.sortOrder}
//               setQuery={setQuery}
//               className={sortSafeMark}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// interface SelectItemProps {
//   className?: string;
//   value: FilterKey;
//   selectedItem: FilterKey;
//   toggleItem: (item: FilterKey) => void;
// }

// const SelectItem = ({
//   className,
//   value,
//   selectedItem,
//   toggleItem,
// }: SelectItemProps) => {
//   return (
//     <li
//       className={selectItem + className}
//       data-selected={selectedItem === value}
//       onClick={() => toggleItem(value)}
//     >
//       {value}
//     </li>
//   );
// };

export default {};
