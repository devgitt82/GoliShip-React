import React from "react";
import { useEffect, useState } from "react";
import { SpinnerLoading } from '../../utils/SpinnerLoading';
import { Pagination } from '../../utils/Pagination';
import { EraseCrew } from "./EraseCrew";
import CrewModel from "../../../Models/CrewModel";

export const RemoveCrew = () => {

    const [crewMembers, setCrewMembers] = useState<CrewModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [crewPerPage] = useState(5);
    const [totalAmountOfCrew, setTotalAmountOfCrew] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [crewDelete, setCrewDelete] = useState(false);

    useEffect(() => {
        const fetchCrew = async () => {
            const baseUrl: string = `http://localhost:8080/api/crew?page=${currentPage - 1}&size=${crewPerPage}`;

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.crew;

            setTotalAmountOfCrew(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

            const loadedCrewMembers: CrewModel[] = [];

            for (const key in responseData) {
                loadedCrewMembers.push({
                    id: responseData[key].id,
                    rank: responseData[key].title,
                    name: responseData[key].author,
                    description: responseData[key].description,
                    department: responseData[key].department,
                    img: responseData[key].img,
                });
            }

            setCrewMembers(loadedCrewMembers);
            setIsLoading(false);
        };
        fetchCrew().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [currentPage, crewDelete, crewPerPage]);

    const indexOfLastCrew: number = currentPage * crewPerPage;
    const indexOfFirstCrew: number = indexOfLastCrew - crewPerPage;
    let lastItem = crewPerPage * currentPage <= totalAmountOfCrew ?
        crewPerPage * currentPage : totalAmountOfCrew;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const deleteCrew = () => setCrewDelete(!crewDelete);

    if (isLoading) {
        return (
            <SpinnerLoading/>
        );
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div className='container mt-5'>
            {totalAmountOfCrew > 0 ?
                <>
                    <div className='mt-3'>
                        <h3>Number of results: ({totalAmountOfCrew})</h3>
                    </div>
                    <p>
                        {indexOfFirstCrew + 1} to {lastItem} of {totalAmountOfCrew} items: 
                    </p>
                    {crewMembers.map(crew => (
                       <EraseCrew crew={crew} key={crew.id} deleteCrew={deleteCrew}/>
                    ))}
                </>
                :
                <h5>Add a Crew before you delete any</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
        </div>
    );
}