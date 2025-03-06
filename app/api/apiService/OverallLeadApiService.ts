// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store/store";
// import { GET_LEADS } from "../../../graphQl/queries/overallead.queries";

// interface TableRow {
//   id: string;
//   [key: string]: any;
// }

// const overallLeadApiService = (currentPage: number, itemsPerPage: number) => {
//   const [data, setData] = useState<TableRow[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [totalItems, setTotalItems] = useState(0);
//   const user = useSelector((state: RootState) => state.auth);
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const response = await axios.post(
//           apiUrl,
//           {
//             query: GET_LEADS,
//             variables: { page: currentPage, pageSize: itemsPerPage },
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${user.token}`,
//             },
//           }
//         );

//         if (response.data.errors) {
//           throw new Error(response.data.errors[0].message);
//         }

//         setData(response.data.data.getMicroTableData.items);
//         setTotalItems(response.data.data.getMicroTableData.totalCount);
//       } catch (err) {
//         setError(err.message || "Failed to fetch table data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [currentPage, itemsPerPage, user.token]);

//   return { data, loading, error, totalItems };
// };

// export default overallLeadApiService;
